import init from './no_mans_mine.js';

const canvas = document.querySelector('#game');
const loading = document.querySelector('#loading');
const status = document.querySelector('#status');
const launch = document.querySelector('#launch');
const fullscreen = document.querySelector('#fullscreen');
const notice = document.querySelector('#notice');
let running = false;
let failed = false;
let inventoryOpen = false;
let noticeTimer;

function showNotice(message) {
  notice.textContent = message;
  notice.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { notice.hidden = true; }, 5000);
}

window.nmmSetStatus = message => { status.textContent = message; };
window.nmmYield = () => new Promise(resolve => setTimeout(resolve, 16));
window.nmmVisible = () => !document.hidden;
window.nmmPointerLocked = () => document.pointerLockElement === canvas;
window.nmmInputMode = open => { inventoryOpen = open; };
window.nmmFail = message => {
  failed = true;
  running = false;
  document.exitPointerLock?.();
  loading.hidden = false;
  status.textContent = message;
  launch.disabled = false;
  launch.textContent = 'Reload game';
  launch.onclick = () => location.reload();
};
window.nmmState = (ready, flight, inventory, captured, mined, edits, fineChunks, pending, bodies, fps, renderWidth, renderHeight, renderScale, meshMs, chunks) => {
  window.noMansMine = { ready, flight, inventory, captured, mined, edits, fineChunks, pending, bodies, fps, renderWidth, renderHeight, renderScale, meshMs, chunks };
  if (ready && !running && !failed) {
    running = true;
    loading.hidden = true;
    fullscreen.hidden = false;
    canvas.focus();
  }
};

window.addEventListener('error', event => {
  window.nmmFail(`The game stopped: ${event.message || 'unknown error'}. Reload to try again.`);
});
window.addEventListener('unhandledrejection', event => {
  window.nmmFail(`The game stopped: ${event.reason?.message || String(event.reason)}.`);
});

// Request lock inside the actual user gesture, before the next Bevy update.
canvas.addEventListener('mousedown', () => {
  if (!running || inventoryOpen || document.pointerLockElement === canvas) return;
  canvas.focus();
  try {
    canvas.requestPointerLock()?.catch(() => showNotice('Click the game again to capture the mouse.'));
  } catch {
    showNotice('Click the game again to capture the mouse.');
  }
});
canvas.addEventListener('contextmenu', event => event.preventDefault());
canvas.addEventListener('keydown', event => {
  if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'F5', 'F9'].includes(event.code)) {
    event.preventDefault();
  }
});

fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.querySelector('#viewport').requestFullscreen();
    canvas.focus();
  } catch {
    showNotice('Use itch.io’s fullscreen control to expand the game.');
  }
});

launch.onclick = async () => {
  launch.disabled = true;
  launch.textContent = 'Loading…';
  status.textContent = 'Downloading the game…';
  try {
    const response = await fetch('./no_mans_mine_bg.wasm');
    if (!response.ok) throw new Error(`Download failed (${response.status})`);
    const bytes = await response.arrayBuffer();
    status.textContent = 'Compiling WebAssembly…';
    await init({ module_or_path: bytes });
  } catch (error) {
    window.nmmFail(`${error.message}. Reload to try again.`);
  }
};

try {
  if (!isSecureContext || !navigator.gpu || !await navigator.gpu.requestAdapter()) {
    status.textContent = 'WebGPU is unavailable. Open this game in a current desktop browser with WebGPU and hardware acceleration enabled. Local previews must use localhost.';
  } else {
    status.textContent = 'Explore the default planets, generated here in your browser.';
    launch.disabled = false;
  }
} catch {
  status.textContent = 'Could not initialize WebGPU. Try a current desktop browser with hardware acceleration enabled.';
}
