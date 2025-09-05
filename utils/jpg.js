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
