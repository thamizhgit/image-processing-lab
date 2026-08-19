function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function generateGradientSample() {
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#6366f1');
  gradient.addColorStop(0.5, '#22d3ee');
  gradient.addColorStop(1, '#f472b6');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

export function generateShapesSample() {
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0d1118';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(100, 120, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(180, 60, 100, 120);

  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.moveTo(260, 180);
  ctx.lineTo(300, 220);
  ctx.lineTo(220, 220);
  ctx.closePath();
  ctx.fill();

  return canvas;
}

export function generateEdgesSample() {
  const canvas = createCanvas(320, 240);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#080a0f';
  ctx.fillRect(40, 40, 120, 160);
  ctx.fillRect(200, 80, 80, 80);

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 120);
  ctx.lineTo(320, 120);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(160, 0);
  ctx.lineTo(160, 240);
  ctx.stroke();

  return canvas;
}

export const SAMPLE_IMAGES = [
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Smooth color gradient',
    generate: generateGradientSample,
  },
  {
    id: 'shapes',
    name: 'Shapes',
    description: 'Geometric shapes',
    generate: generateShapesSample,
  },
  {
    id: 'edges',
    name: 'Edges',
    description: 'High-contrast edges',
    generate: generateEdgesSample,
  },
];
