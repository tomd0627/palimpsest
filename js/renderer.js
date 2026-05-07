let canvas;
let ctx;
let cssWidth = 0;
let cssHeight = 0;
let onResizeCallback = null;

export function initRenderer() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  const ro = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    if (Math.round(width) !== cssWidth || Math.round(height) !== cssHeight) {
      applyResize(width, height);
      if (onResizeCallback) onResizeCallback();
    }
  });

  ro.observe(canvas);
  applyResize(canvas.clientWidth, canvas.clientHeight);
}

function applyResize(w, h) {
  const dpr = window.devicePixelRatio || 1;
  cssWidth = Math.round(w);
  cssHeight = Math.round(h);
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintGround();
}

function paintGround() {
  ctx.fillStyle = '#f4efe6';
  ctx.fillRect(0, 0, cssWidth, cssHeight);
}

export function getCtx() {
  return ctx;
}

export function getWidth() {
  return cssWidth;
}

export function getHeight() {
  return cssHeight;
}

export function setOnResize(cb) {
  onResizeCallback = cb;
}

export function clearCanvas() {
  paintGround();
}
