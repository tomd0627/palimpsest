import { corpus } from './corpus.js';
import { drawStroke, drawText, drawWash } from './elements.js';

let elementCount = 0;
let washThreshold = randomWashThreshold();

function randomWashThreshold() {
  return 45 + Math.floor(Math.random() * 31);
}

function gaussian() {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function spawnPosition(width, height, mouseX, mouseY) {
  if (Math.random() < 0.3 && mouseX !== null) {
    return {
      x: mouseX + gaussian() * 90,
      y: mouseY + gaussian() * 90,
    };
  }
  return {
    x: width / 2 + gaussian() * width * 0.28,
    y: height / 2 + gaussian() * height * 0.28,
  };
}

export function computeNextDelay() {
  const u = 1 - Math.random();
  return Math.min(Math.max(-Math.log(u) * 700, 400), 1800);
}

export function spawnElement(ctx, width, height, mouseX, mouseY) {
  if (elementCount >= washThreshold) {
    drawWash(ctx, width, height);
    elementCount = 0;
    washThreshold = randomWashThreshold();
    return;
  }

  const { x, y } = spawnPosition(width, height, mouseX, mouseY);

  if (Math.random() < 0.67) {
    drawStroke(ctx, x, y);
  } else {
    drawText(ctx, x, y, corpus);
  }

  elementCount++;
}

export function spawnBurst(ctx, width, height, x, y, count) {
  for (let i = 0; i < count; i++) {
    const bx = x + gaussian() * 80;
    const by = y + gaussian() * 80;
    if (Math.random() < 0.6) {
      drawStroke(ctx, bx, by);
    } else {
      drawText(ctx, bx, by, corpus);
    }
    elementCount++;
  }
}

export function resetSystem() {
  elementCount = 0;
  washThreshold = randomWashThreshold();
}
