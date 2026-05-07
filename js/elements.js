const PALETTE = [
  { r: 35, g: 25, b: 15, alphaMin: 0.04, alphaMax: 0.22 },
  { r: 35, g: 25, b: 15, alphaMin: 0.04, alphaMax: 0.22 },
  { r: 45, g: 35, b: 25, alphaMin: 0.06, alphaMax: 0.18 },
  { r: 140, g: 65, b: 25, alphaMin: 0.05, alphaMax: 0.12 },
  { r: 90, g: 58, b: 32, alphaMin: 0.05, alphaMax: 0.14 },
];

function pickColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

export function drawStroke(ctx, x, y) {
  const color = pickColor();
  const alpha = color.alphaMin + Math.random() * (color.alphaMax - color.alphaMin);
  const lineWidth = 0.5 + Math.random() * 3.5;
  const length = 20 + Math.random() * 100;
  const angle = Math.random() * Math.PI * 2;

  const x1 = x + Math.cos(angle) * length * 0.5;
  const y1 = y + Math.sin(angle) * length * 0.5;
  const x2 = x - Math.cos(angle) * length * 0.5;
  const y2 = y - Math.sin(angle) * length * 0.5;

  const perpAngle = angle + Math.PI / 2;
  const cpOffset = (Math.random() - 0.5) * length * 0.7;
  const cpX = (x1 + x2) / 2 + Math.cos(perpAngle) * cpOffset;
  const cpY = (y1 + y2) / 2 + Math.sin(perpAngle) * cpOffset;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = Math.random() < 0.6 ? 'round' : 'butt';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cpX, cpY, x2, y2);
  ctx.stroke();
  ctx.restore();
}

export function drawText(ctx, x, y, corpus) {
  const word = corpus[Math.floor(Math.random() * corpus.length)];
  const fontSize = 10 + Math.random() * 26;
  const rotation = ((Math.random() - 0.5) * 24 * Math.PI) / 180;
  const alpha = 0.05 + Math.random() * 0.23;
  const color = Math.random() < 0.15 ? 'rgb(90, 58, 32)' : 'rgb(35, 25, 15)';
  const font =
    Math.random() < 0.45
      ? `${fontSize}px Georgia, serif`
      : `${fontSize}px "Courier New", Courier, monospace`;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillText(word, 0, 0);
  ctx.restore();
}

export function drawWash(ctx, width, height) {
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgba(244, 239, 230, 0.09)';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}
