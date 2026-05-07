import { initRenderer, getCtx, getWidth, getHeight, setOnResize, clearCanvas } from './renderer.js';
import { spawnElement, spawnBurst, resetSystem, computeNextDelay } from './system.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let paused = false;
let nextDelay = 0;
let lastSpawnTime = 0;
let mouseX = null;
let mouseY = null;

const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');

function renderStaticComposition() {
  const ctx = getCtx();
  const w = getWidth();
  const h = getHeight();
  for (let i = 0; i < 80; i++) {
    spawnElement(ctx, w, h, null, null);
  }
}

function tick(timestamp) {
  if (!paused && timestamp - lastSpawnTime >= nextDelay) {
    spawnElement(getCtx(), getWidth(), getHeight(), mouseX, mouseY);
    lastSpawnTime = timestamp;
    nextDelay = computeNextDelay();
  }
  requestAnimationFrame(tick);
}

function setPaused(value) {
  paused = value;
  btnPause.setAttribute('aria-pressed', String(paused));
  btnPause.querySelector('.btn-icon').textContent = paused ? '▶' : '‖';
  btnPause.querySelector('.btn-label').textContent = paused ? 'Resume' : 'Pause';
}

function reset() {
  clearCanvas();
  resetSystem();
  if (paused) setPaused(false);
  lastSpawnTime = 0;
  nextDelay = 0;
}

function init() {
  initRenderer();

  setOnResize(() => {
    resetSystem();
    lastSpawnTime = 0;
    nextDelay = 0;
  });

  if (prefersReducedMotion) {
    renderStaticComposition();
    btnPause.hidden = true;
  } else {
    requestAnimationFrame(tick);
  }

  const canvas = document.getElementById('canvas');

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  canvas.addEventListener('click', (e) => {
    if (paused) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const count = 8 + Math.floor(Math.random() * 5);
    spawnBurst(getCtx(), getWidth(), getHeight(), x, y, count);
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      setPaused(!paused);
    } else if (e.code === 'KeyR') {
      reset();
    }
  });

  btnPause.addEventListener('click', () => setPaused(!paused));
  btnReset.addEventListener('click', reset);
}

init();
