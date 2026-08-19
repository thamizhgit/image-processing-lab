export const FILTER_GROUPS = {
  basic: { label: 'BASIC', filters: ['original', 'grayscale', 'invert'] },
  spatial: { label: 'SPATIAL', filters: ['blur', 'sharpen'] },
  edge: { label: 'EDGE DETECTION', filters: ['sobelX', 'sobelY', 'laplacian'] },
};

export const FILTERS = {
  original: {
    id: 'original',
    name: 'Original',
    group: 'basic',
    kernel: null,
    type: 'none',
  },
  grayscale: {
    id: 'grayscale',
    name: 'Grayscale',
    group: 'basic',
    kernel: null,
    type: 'point',
  },
  invert: {
    id: 'invert',
    name: 'Invert',
    group: 'basic',
    kernel: null,
    type: 'point',
  },
  blur: {
    id: 'blur',
    name: 'Blur',
    group: 'spatial',
    kernel: [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ],
    type: 'convolution',
    grayscale: false,
  },
  sharpen: {
    id: 'sharpen',
    name: 'Sharpen',
    group: 'spatial',
    kernel: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    type: 'convolution',
    grayscale: false,
  },
  sobelX: {
    id: 'sobelX',
    name: 'Sobel X',
    group: 'edge',
    kernel: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    type: 'convolution',
    grayscale: true,
  },
  sobelY: {
    id: 'sobelY',
    name: 'Sobel Y',
    group: 'edge',
    kernel: [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
    type: 'convolution',
    grayscale: true,
  },
  laplacian: {
    id: 'laplacian',
    name: 'Laplacian',
    group: 'edge',
    kernel: [
      [0, -1, 0],
      [-1, 4, -1],
      [0, -1, 0],
    ],
    type: 'convolution',
    grayscale: true,
  },
};

export function formatKernelValue(value) {
  if (Number.isInteger(value)) return String(value);
  if (Math.abs(value - 1 / 9) < 0.001) return '1/9';
  return value.toFixed(1).replace(/\.0$/, '');
}
