export function getImageDataFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve(imageData);
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
}

export function uniqueColorCount(imageData) {
  const colorSet = new Set();
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    colorSet.add(`${r},${g},${b},${a}`);
  }
  return colorSet.size;
}

export function extractColorChannels(
  ogImageData,
  threshold = 128,
  amplify = 5
) {
  const yImageData = new ImageData(ogImageData.width, ogImageData.height);
  const cbImageData = new ImageData(ogImageData.width, ogImageData.height);
  const crImageData = new ImageData(ogImageData.width, ogImageData.height);

  for (let i = 0; i < ogImageData.data.length; i += 4) {
    const r = ogImageData.data[i];
    const g = ogImageData.data[i + 1];
    const b = ogImageData.data[i + 2];

    // RGB to YCbCr conversion
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.460525 * g - 0.081975 * b;

    // Luminance
    yImageData.data[i] = y;
    yImageData.data[i + 1] = y;
    yImageData.data[i + 2] = y;
    yImageData.data[i + 3] = 255;

    // Blue Chrominance
    if (cb > threshold) {
      cbImageData.data[i] = 0;
      cbImageData.data[i + 1] = 0;
      cbImageData.data[i + 2] = Math.min(255, (cb - threshold) * amplify);
    } else {
      // Show white elsewhere
      cbImageData.data[i] = 255;
      cbImageData.data[i + 1] = 255;
      cbImageData.data[i + 2] = 255;
    }
    cbImageData.data[i + 3] = 255;

    // Red Chrominance
    if (cr > threshold) {
      crImageData.data[i] = Math.min(255, (cr - threshold) * amplify);
      crImageData.data[i + 1] = 0;
      crImageData.data[i + 2] = 0;
    } else {
      // Show white elsewhere
      crImageData.data[i] = 255;
      crImageData.data[i + 1] = 255;
      crImageData.data[i + 2] = 255;
    }
    crImageData.data[i + 3] = 255;
  }

  return { yImageData, cbImageData, crImageData };
}

export function drawImageDataToCanvas(imageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export function drawSubsampledImageDataToCanvas(imageData, subsampleAmount) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width / subsampleAmount;
  canvas.height = imageData.height / subsampleAmount;
  const ctx = canvas.getContext('2d');

  // Create a temporary canvas to hold the subsampled data
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = Math.ceil(imageData.width / subsampleAmount);
  tempCanvas.height = Math.ceil(imageData.height / subsampleAmount);
  const tempCtx = tempCanvas.getContext('2d');
  const tempImageData = tempCtx.createImageData(
    tempCanvas.width,
    tempCanvas.height
  );

  // Subsample the image data
  for (let y = 0; y < imageData.height; y += subsampleAmount) {
    for (let x = 0; x < imageData.width; x += subsampleAmount) {
      const srcIndex = (y * imageData.width + x) * 4;
      const destIndex =
        (Math.floor(y / subsampleAmount) * tempCanvas.width +
          Math.floor(x / subsampleAmount)) *
        4;

      tempImageData.data[destIndex] = imageData.data[srcIndex];
      tempImageData.data[destIndex + 1] = imageData.data[srcIndex + 1];
      tempImageData.data[destIndex + 2] = imageData.data[srcIndex + 2];
      tempImageData.data[destIndex + 3] = imageData.data[srcIndex + 3];
    }
  }

  // Draw the subsampled data back to the original canvas, scaling it up
  ctx.imageSmoothingEnabled = false; // Disable smoothing for pixelated effect
  ctx.putImageData(tempImageData, 0, 0);
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    tempCanvas.width,
    tempCanvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvas.toDataURL();
}

export function drawGridOverlayToCanvas(imageData, blockSize = 8) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;

  for (let x = 0; x <= imageData.width; x += blockSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, imageData.height);
    ctx.stroke();
  }

  for (let y = 0; y <= imageData.height; y += blockSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(imageData.width, y);
    ctx.stroke();
  }

  return canvas.toDataURL();
}

export function drawZoomedBlockToCanvas(event, blockSize = 8) {
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const scaleX = event.target.naturalWidth / event.target.width;
  const scaleY = event.target.naturalHeight / event.target.height;

  const imgX = Math.floor(x * scaleX);
  const imgY = Math.floor(y * scaleY);

  const canvas = document.createElement('canvas');
  canvas.width = blockSize;
  canvas.height = blockSize;
  const ctx = canvas.getContext('2d');

  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.width = event.target.naturalWidth;
  sourceCanvas.height = event.target.naturalHeight;
  const sourceCtx = sourceCanvas.getContext('2d');
  sourceCtx.drawImage(event.target, 0, 0);

  const imageData = sourceCtx.getImageData(
    Math.max(0, imgX - blockSize / 2),
    Math.max(0, imgY - blockSize / 2),
    blockSize,
    blockSize
  );
  ctx.putImageData(imageData, 0, 0);

  // extract the 8x8 block data for further processing if needed
  const blockData = [];
  for (let j = 0; j < blockSize; j++) {
    const row = [];
    for (let i = 0; i < blockSize; i++) {
      const index = (j * blockSize + i) * 4;
      const r = imageData.data[index];
      row.push(r);
    }
    blockData.push(row);
  }

  return {
    url: canvas.toDataURL(),
    data: blockData,
  };
}

export function drawFrequencyPatternTable() {
  const blockSize = 32;
  const canvas = document.createElement('canvas');
  canvas.width = blockSize * 8;
  canvas.height = blockSize * 8;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      const startX = u * blockSize;
      const startY = v * blockSize;

      // Draw the square
      ctx.strokeRect(startX, startY, blockSize, blockSize);

      // Draw the frequency pattern
      for (let i = 0; i <= u; i++) {
        for (let j = 0; j <= v; j++) {
          const x = startX + (i + 0.5) * (blockSize / (u + 1));
          const y = startY + (j + 0.5) * (blockSize / (v + 1));

          ctx.fillRect(x, y, 1, 1);

          // Connect to previous points
          if (i > 0) {
            const prevX = startX + (i - 0.5) * (blockSize / (u + 1));
            ctx.beginPath();
            ctx.moveTo(prevX, y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          if (j > 0) {
            const prevY = startY + (j - 0.5) * (blockSize / (v + 1));
            ctx.beginPath();
            ctx.moveTo(x, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
      }
    }
  }

  return canvas.toDataURL();
}

// Naive 8x8 Discrete Cosine Transform (DCT-II)
function dct2D(block) {
  if (block.length !== 8 || block[0].length !== 8) {
    return [];
  }

  const N = 8;
  const result = Array.from({ length: N }, () => Array(N).fill(0));

  for (let u = 0; u < N; u++) {
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          sum +=
            block[x][y] *
            Math.cos(((2 * x + 1) * u * Math.PI) / (2 * N)) *
            Math.cos(((2 * y + 1) * v * Math.PI) / (2 * N));
        }
      }
      const cu = u === 0 ? 1 / Math.sqrt(2) : 1;
      const cv = v === 0 ? 1 / Math.sqrt(2) : 1;
      result[u][v] = 0.25 * cu * cv * sum;
    }
  }

  return result;
}

export function getPresenceCoefficients(selectedData) {
  const coefficients = dct2D(selectedData);
  if (coefficients.length < 8 || coefficients[0].length < 8) {
    return [];
  }
  return coefficients.map((row) => row.map(Math.round));
}

export function drawPresenceTable(selectedData) {
  // selectedData is a 2D array of numbers indicating luminance
  const coefficients = dct2D(selectedData);

  if (coefficients.length < 8 || coefficients[0].length < 8) {
    return null;
  }

  const blockSize = 32;
  const canvas = document.createElement('canvas');
  canvas.width = blockSize * 8;
  canvas.height = blockSize * 8;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      const startX = u * blockSize;
      const startY = v * blockSize;

      // Draw the square
      ctx.strokeRect(startX, startY, blockSize, blockSize);

      // Draw the coefficient value
      const coeff = Math.round(coefficients[u][v]);
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(coeff, startX + blockSize / 2, startY + blockSize / 2);
    }
  }

  return canvas.toDataURL();
}

export const quantTable = [
  [16, 11, 10, 16, 24, 40, 51, 61],
  [12, 12, 14, 19, 26, 58, 60, 55],
  [14, 13, 16, 24, 40, 57, 69, 56],
  [14, 17, 22, 29, 51, 87, 80, 62],
  [18, 22, 37, 56, 68, 109, 103, 77],
  [24, 35, 55, 64, 81, 104, 113, 92],
  [49, 64, 78, 87, 103, 121, 120, 101],
  [72, 92, 95, 98, 112, 100, 103, 99],
];

export const zigZagOrder = [
  [0, 0],
  [0, 1],
  [1, 0],
  [2, 0],
  [1, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [2, 1],
  [3, 0],
  [4, 0],
  [3, 1],
  [2, 2],
  [1, 3],
  [0, 4],
  [0, 5],
  [1, 4],
  [2, 3],
  [3, 2],
  [4, 1],
  [5, 0],
  [6, 0],
  [5, 1],
  [4, 2],
  [3, 3],
  [2, 4],
  [1, 5],
  [0, 6],
  [0, 7],
  [1, 6],
  [2, 5],
  [3, 4],
  [4, 3],
  [5, 2],
  [6, 1],
  [7, 0],
  [7, 1],
  [6, 2],
  [5, 3],
  [4, 4],
  [3, 5],
  [2, 6],
  [1, 7],
  [2, 7],
  [3, 6],
  [4, 5],
  [5, 4],
  [6, 3],
  [7, 2],
  [7, 3],
  [6, 4],
  [5, 5],
  [4, 6],
  [3, 7],
  [4, 7],
  [5, 6],
  [6, 5],
  [7, 4],
  [7, 5],
  [6, 6],
  [5, 7],
  [6, 7],
  [7, 6],
  [7, 7],
];

export function drawStaticQuantizationTable() {
  const blockSize = 32;
  const canvas = document.createElement('canvas');
  canvas.width = blockSize * 8;
  canvas.height = blockSize * 8;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      const startX = u * blockSize;
      const startY = v * blockSize;

      // Draw the square
      ctx.strokeRect(startX, startY, blockSize, blockSize);

      // Draw the quantization value
      const value = quantTable[u][v];
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value, startX + blockSize / 2, startY + blockSize / 2);
    }
  }

  return canvas.toDataURL();
}

export function getQuantizedCoefficients(selectedData, quality = 50) {
  const coefficients = dct2D(selectedData);

  // Scale quantization table based on quality (simple linear scaling for demo)
  const scale = quality < 50 ? 5000 / quality : 200 - quality * 2;
  const scaledQuantTable = quantTable.map((row) =>
    row.map((value) =>
      Math.max(1, Math.min(255, Math.floor((value * scale + 50) / 100)))
    )
  );

  // Quantize the coefficients
  return coefficients.map((row, u) =>
    row.map((value, v) => Math.round(value / scaledQuantTable[u][v]))
  );
}

export function drawQuantizedTable(selectedData, quality = 50) {
  const coefficients = getQuantizedCoefficients(selectedData, quality);

  if (coefficients.length < 8 || coefficients[0].length < 8) {
    return null;
  }

  const blockSize = 32;
  const canvas = document.createElement('canvas');
  canvas.width = blockSize * 8;
  canvas.height = blockSize * 8;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      const startX = u * blockSize;
      const startY = v * blockSize;

      // Draw the square
      ctx.strokeRect(startX, startY, blockSize, blockSize);

      // Draw the quantized coefficient value
      const coeff = coefficients[u][v];
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(coeff, startX + blockSize / 2, startY + blockSize / 2);
    }
  }

  // render zig-zag order with transparent red line overlay
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let k = 0; k < zigZagOrder.length; k++) {
    const [u, v] = zigZagOrder[k];
    const x = u * blockSize + blockSize / 2;
    const y = v * blockSize + blockSize / 2;
    if (k === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  return canvas.toDataURL();
}

export function getOrderedData(selectedData) {
  const coefficients = getQuantizedCoefficients(selectedData);

  if (coefficients.length < 8 || coefficients[0].length < 8) {
    return [];
  }

  const ordered = [];
  for (let k = 0; k < zigZagOrder.length; k++) {
    const [u, v] = zigZagOrder[k];
    ordered.push(coefficients[u][v]);
  }
  return ordered;
}

export function huffmanEncode(arr) {
  // Frequency map
  const freq = {};
  for (const n of arr) freq[n] = (freq[n] || 0) + 1;

  // Priority queue: [node, freq]
  let pq = Object.entries(freq).map(([n, f]) => [{ sym: +n }, f]);

  while (pq.length > 1) {
    pq.sort((a, b) => a[1] - b[1]);
    const [a, b] = pq.splice(0, 2);
    pq.push([{ left: a[0], right: b[0] }, a[1] + b[1]]);
  }

  if (pq.length === 0) {
    return {
      codes: {},
      encoded: '',
      encodedHex: '',
      tree: null,
      compressionRatio: 0,
      originalBits: 0,
      compressedBits: 0,
    };
  }

  const tree = pq[0][0];
  const codes = {};

  // Recursively assign codes
  (function walk(node, prefix = '') {
    if (node.sym !== undefined) {
      codes[node.sym] = prefix || '0'; // leaf
    } else {
      walk(node.left, prefix + '0');
      walk(node.right, prefix + '1');
    }
  })(tree);

  // Encode
  let encoded = '';
  for (const n of arr) encoded += codes[n];

  // Convert binary string to hex
  let encodedHex = '';
  // Pad to nearest byte boundary
  const paddedBinary = encoded.padEnd(Math.ceil(encoded.length / 8) * 8, '0');
  for (let i = 0; i < paddedBinary.length; i += 8) {
    const byte = paddedBinary.substr(i, 8);
    const hexByte = parseInt(byte, 2).toString(16).padStart(2, '0');
    encodedHex += hexByte;
  }

  // Calculate compression statistics
  const originalBits = arr.length * 8; // Assuming 8 bits per original value
  const compressedBits = encoded.length;
  const compressionRatio =
    originalBits > 0 ? (1 - compressedBits / originalBits) * 100 : 0;

  return {
    codes,
    encoded,
    encodedHex: encodedHex.toUpperCase(),
    tree,
    compressionRatio: Math.round(compressionRatio * 100) / 100, // Round to 2 decimal places
    originalBits,
    compressedBits,
  };
}
