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

  return canvas.toDataURL();
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
