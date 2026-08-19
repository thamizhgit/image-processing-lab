export function clamp(value, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function getIntensity(r, g, b) {
  return clamp(0.299 * r + 0.587 * g + 0.114 * b);
}

export function clampCoord(value, max) {
  return Math.max(0, Math.min(max, value));
}

export function getPixelIndex(x, y, width) {
  return (y * width + x) * 4;
}

export function getPixel(data, x, y, width, height) {
  const cx = clampCoord(x, width - 1);
  const cy = clampCoord(y, height - 1);
  const i = getPixelIndex(cx, cy, width);
  return {
    r: data[i],
    g: data[i + 1],
    b: data[i + 2],
    a: data[i + 3],
    intensity: getIntensity(data[i], data[i + 1], data[i + 2]),
  };
}

export function getNeighborhood(imageData, x, y) {
  const { data, width, height } = imageData;
  const neighborhood = [];

  for (let dy = -1; dy <= 1; dy++) {
    const row = [];
    for (let dx = -1; dx <= 1; dx++) {
      const px = getPixel(data, x + dx, y + dy, width, height);
      row.push(px.intensity);
    }
    neighborhood.push(row);
  }

  return neighborhood;
}

export function getNeighborhoodRGB(imageData, x, y) {
  const { data, width, height } = imageData;
  const neighborhood = [];

  for (let dy = -1; dy <= 1; dy++) {
    const row = [];
    for (let dx = -1; dx <= 1; dx++) {
      row.push(getPixel(data, x + dx, y + dy, width, height));
    }
    neighborhood.push(row);
  }

  return neighborhood;
}

export function applyGrayscale(imageData) {
  const output = new ImageData(imageData.width, imageData.height);
  const src = imageData.data;
  const dst = output.data;

  for (let i = 0; i < src.length; i += 4) {
    const gray = getIntensity(src[i], src[i + 1], src[i + 2]);
    dst[i] = gray;
    dst[i + 1] = gray;
    dst[i + 2] = gray;
    dst[i + 3] = src[i + 3];
  }

  return output;
}

export function applyInvert(imageData) {
  const output = new ImageData(imageData.width, imageData.height);
  const src = imageData.data;
  const dst = output.data;

  for (let i = 0; i < src.length; i += 4) {
    dst[i] = 255 - src[i];
    dst[i + 1] = 255 - src[i + 1];
    dst[i + 2] = 255 - src[i + 2];
    dst[i + 3] = src[i + 3];
  }

  return output;
}

export function applyConvolution(imageData, kernel, useGrayscale = false) {
  const { width, height, data } = imageData;
  const output = new ImageData(width, height);
  const dst = output.data;
  const size = kernel.length;
  const half = Math.floor(size / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;

      for (let ky = 0; ky < size; ky++) {
        for (let kx = 0; kx < size; kx++) {
          const px = getPixel(data, x + kx - half, y + ky - half, width, height);
          const weight = kernel[ky][kx];

          if (useGrayscale) {
            const intensity = px.intensity;
            sumR += intensity * weight;
            sumG += intensity * weight;
            sumB += intensity * weight;
          } else {
            sumR += px.r * weight;
            sumG += px.g * weight;
            sumB += px.b * weight;
          }
        }
      }

      const i = getPixelIndex(x, y, width);
      dst[i] = clamp(sumR);
      dst[i + 1] = clamp(sumG);
      dst[i + 2] = clamp(sumB);
      dst[i + 3] = data[i + 3];
    }
  }

  return output;
}

export function applyFilter(imageData, filter) {
  if (!imageData || !filter) return imageData;

  switch (filter.type) {
    case 'none':
      return new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
    case 'point':
      if (filter.id === 'grayscale') return applyGrayscale(imageData);
      if (filter.id === 'invert') return applyInvert(imageData);
      return imageData;
    case 'convolution':
      return applyConvolution(imageData, filter.kernel, filter.grayscale);
    default:
      return imageData;
  }
}

export function computeConvolutionResult(neighborhood, kernel) {
  let sum = 0;
  const terms = [];

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const value = neighborhood[y][x];
      const weight = kernel[y][x];
      const product = value * weight;
      sum += product;
      terms.push({ value, weight, product, x, y });
    }
  }

  return { result: clamp(sum), terms };
}

export function buildCalculationSteps(neighborhood, kernel) {
  const rows = [];

  for (let y = 0; y < 3; y++) {
    const parts = [];
    for (let x = 0; x < 3; x++) {
      parts.push({
        value: neighborhood[y][x],
        weight: kernel[y][x],
      });
    }
    rows.push(parts);
  }

  return rows;
}

export function imageDataToCanvas(imageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve({
          imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
          name: file.name,
          width: canvas.width,
          height: canvas.height,
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function loadImageFromCanvas(canvas, name = 'sample.png') {
  const ctx = canvas.getContext('2d');
  return {
    imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
    name,
    width: canvas.width,
    height: canvas.height,
  };
}

export function getMegapixels(width, height) {
  return ((width * height) / 1_000_000).toFixed(1);
}

export function downloadImageData(imageData, filename = 'processed-image.png') {
  const canvas = imageDataToCanvas(imageData);
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
