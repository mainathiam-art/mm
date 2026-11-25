/* The Universal Player — one audio element that outlives every route. */

import { EPISODES, bySlug, episodeIndex, fmtClock } from "./data.js";

const audio = new Audio();
audio.preload = "metadata";

const listeners = new Map();
const on = (event, fn) => {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(fn);
  return () => listeners.get(event).delete(fn);
};
const emit = (event, payload) => {
  (listeners.get(event) || []).forEach((fn) => {
    try { fn(payload); } catch (err) { console.error(err); }
  });
};

const el = {};
let current = null;
let peaks = [];
let audioCtx = null;
let analyser = null;
let freqData = null;
let rafId = null;
let scrubbing = false;
let pendingSeek = null;
let lastEmittedSecond = -1;

/* Deterministic pseudo-waveform so each episode has its own silhouette. */
function buildPeaks(slug, count = 84) {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed = (seed * 31 + slug.charCodeAt(i)) % 100000;
  const out = [];
  for (let i = 0; i < count; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const r = seed / 2147483648;
    const envelope = 0.55 + 0.45 * Math.sin((i / count) * Math.PI * 1.4);
    out.push(0.14 + Math.abs(r) * 0.86 * envelope);
  }
  return out;
}

function draw() {
  const canvas = el.wave;
  if (!canvas) return;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const n = peaks.length || 1;
  const gap = Math.max(1, Math.round((w / n) * 0.34));
  const barW = Math.max(1, (w - gap * (n - 1)) / n);
  const duration = audio.duration || (current ? current.duration : 0) || 1;
  const progress = Math.min(1, (audio.currentTime || 0) / duration);

  let level = 0;
  if (analyser && !audio.paused) {
    analyser.getByteFrequencyData(freqData);
    let sum = 0;
    for (let i = 0; i < freqData.length; i++) sum += freqData[i];
    level = sum / freqData.length / 255;
  }

  const playhead = progress * n;

  for (let i = 0; i < n; i++) {
    const x = i * (barW + gap);
    let amp = peaks[i] || 0.2;
    if (level && Math.abs(i - playhead) < 4) amp = Math.min(1, amp + level * 0.5);
    const bh = Math.max(2, amp * (h - 6));
    const y = (h - bh) / 2;
    ctx.fillStyle = i / n <= progress ? "#BC412B" : "rgba(18,18,18,0.17)";
    ctx.fillRect(x, y, barW, bh);
  }

  if (progress > 0 && progress < 1) {
    ctx.fillStyle = "rgba(18,18,18,0.35)";
    ctx.fillRect(progress * w, 2, 1, h - 4);
  }
}

function loop() {
  if (!analyserReady) ensureAnalyser();
  draw();
  if (!audio.paused && !audio.ended) {
    rafId = requestAnimationFrame(loop);
  } else {
    rafId = null;
  }
}

function startLoop() {
  if (!rafId) rafId = requestAnimationFrame(loop);
}

/* The visualiser is attached only once the audio graph can actually run:
   routing a paused/blocked element into a suspended context stalls loading. */
let analyserReady = false;

function ensureAnalyser() {
  if (analyserReady) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  if (!audioCtx) {
    try {
      audioCtx = new Ctx();
    } catch (err) {
      return;
    }
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  if (audioCtx.state !== "running") return;
  try {
    const source = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    freqData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyserReady = true;
  } catch (err) {
    analyser = null;
  }
}

function syncTimes() {
  const duration = audio.duration || (current ? current.duration : 0);
  if (el.time) el.time.textContent = fmtClock(audio.currentTime);
  if (el.dur) el.dur.textContent = fmtClock(duration);
  if (el.wave) {
    const pct = duration ? Math.round((audio.currentTime / duration) * 100) : 0;
    el.wave.setAttribute("aria-valuenow", String(pct));
    el.wave.setAttribute("aria-valuetext", fmtClock(audio.currentTime));
  }
  const second = Math.floor(audio.currentTime);
  if (second !== lastEmittedSecond) {
    lastEmittedSecond = second;
    emit("time", { episode: current, time: audio.currentTime, duration });
  }
}

function setPlayingClass() {
  if (!el.root) return;
  el.root.classList.toggle("is-playing", !audio.paused);
  if (el.play) {
    el.play.setAttribute("aria-label", audio.paused ? "Play" : "Pause");
  }
  emit("state", { playing: !audio.paused, episode: current });
}

function buildChapterPanel() {
  if (!el.panel || !current) return;
  el.panel.innerHTML = `
    <p class="eyebrow">Chapter marks</p>
    <ol>
      ${current.chapters
        .map(
          (c) => `<li data-chapter="${c.t}"><button type="button" data-seek="${c.t}">
            <span class="t">${fmtClock(c.t)}</span><span>${c.label}</span>
          </button></li>`
        )
        .join("")}
    </ol>`;
}

function updateChapterPanel(time) {
  if (!el.panel || el.panel.hidden || !current) return;
  const items = el.panel.querySelectorAll("[data-chapter]");
  let active = -1;
  current.chapters.forEach((c, i) => {
    if (time >= c.t) active = i;
  });
  items.forEach((li, i) => li.classList.toggle("is-active", i === active));
}

function loadEpisode(episode, { autoplay = true } = {}) {
  if (!episode) return;
  const isSame = current && current.slug === episode.slug;

  if (!isSame) {
    current = episode;
    lastEmittedSecond = -1;
    pendingSeek = null;
    peaks = buildPeaks(episode.slug);
    audio.src = episode.audio;
    audio.load();

    if (el.title) {
      el.title.textContent = `${episode.number}. ${episode.title}`;
      el.title.href = `#/episode/${episode.slug}`;
    }
    if (el.guest) el.guest.textContent = `${episode.guest} · ${episode.role}`;
    if (el.art) {
      el.art.src = episode.image;
      el.art.alt = "";
    }
    if (el.dur) el.dur.textContent = fmtClock(episode.duration);
    buildChapterPanel();
    draw();

    emit("track", episode);

    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: episode.title,
          artist: episode.guest,
          album: "Monolith — Audio Journal",
          artwork: [{ src: new URL(episode.image, location.href).href, sizes: "1200x1200", type: "image/jpeg" }],
        });
      } catch (err) { /* metadata is a nicety */ }
    }
  }

  show();
  if (autoplay) play();
  else { syncTimes(); draw(); }
}

function show() {
  if (!el.root) return;
  el.root.hidden = false;
  document.body.classList.add("has-player");
}

function play() {
  if (!current) return;
  const p = audio.play();
  if (p && typeof p.catch === "function") {
    p.catch(() => { setPlayingClass(); });
  }
}

function pause() {
  audio.pause();
}

function toggle() {
  if (!current) return;
  if (audio.paused) play();
  else pause();
}

function seek(seconds) {
  const duration = audio.duration || 0;
  if (!duration) {
    /* Metadata is still loading — apply the jump as soon as it arrives. */
    pendingSeek = seconds;
    return;
  }
  audio.currentTime = Math.max(0, Math.min(duration, seconds));
  lastEmittedSecond = -1;
  syncTimes();
  draw();
}

function applyPendingSeek() {
  if (pendingSeek === null) return;
  const duration = audio.duration || 0;
  if (!duration) return;
  audio.currentTime = Math.max(0, Math.min(duration, pendingSeek));
  pendingSeek = null;
  lastEmittedSecond = -1;
  syncTimes();
  draw();
}

function seekRatio(ratio) {
  const duration = audio.duration || (current ? current.duration : 0);
  if (!duration) return;
  seek(ratio * duration);
}

function step(delta) {
  seek((audio.currentTime || 0) + delta);
}

function next() {
  if (!current) return;
  const i = episodeIndex(current.slug);
  const ep = EPISODES[(i + 1) % EPISODES.length];
  loadEpisode(ep, { autoplay: true });
}

function prev() {
  if (!current) return;
  if (audio.currentTime > 3) { seek(0); return; }
  const i = episodeIndex(current.slug);
  const ep = EPISODES[(i - 1 + EPISODES.length) % EPISODES.length];
  loadEpisode(ep, { autoplay: true });
}

function close() {
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  current = null;
  peaks = [];
  if (el.root) el.root.hidden = true;
  if (el.panel) el.panel.hidden = true;
  document.body.classList.remove("has-player");
  if ("mediaSession" in navigator) navigator.mediaSession.metadata = null;
  emit("track", null);
}

function togglePanel(force) {
  if (!el.panel || !el.chaptersBtn) return;
  const open = typeof force === "boolean" ? force : el.panel.hidden;
  el.panel.hidden = !open;
  el.chaptersBtn.setAttribute("aria-expanded", String(open));
  if (open) updateChapterPanel(audio.currentTime || 0);
}

function init() {
  el.root = document.getElementById("player");
  if (!el.root) return;

  el.art = document.getElementById("player-art");
  el.title = document.getElementById("player-title");
  el.guest = document.getElementById("player-guest");
  el.wave = document.getElementById("player-wave");
  el.time = document.getElementById("player-time");
  el.dur = document.getElementById("player-dur");
  el.play = document.getElementById("player-play");
  el.panel = document.getElementById("player-chapters-panel");
  el.chaptersBtn = document.getElementById("player-chapters");

  el.play.addEventListener("click", toggle);
  document.getElementById("player-prev").addEventListener("click", prev);
  document.getElementById("player-next").addEventListener("click", next);
  document.getElementById("player-close").addEventListener("click", close);

  const muteBtn = document.getElementById("player-mute");
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    el.root.classList.toggle("is-muted", audio.muted);
    muteBtn.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
  });

  el.chaptersBtn.addEventListener("click", () => togglePanel());

  el.panel.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-seek]");
    if (!btn) return;
    seek(Number(btn.dataset.seek));
    if (audio.paused) play();
    togglePanel(false);
  });

  document.addEventListener("click", (event) => {
    if (el.panel.hidden) return;
    if (!el.root.contains(event.target)) togglePanel(false);
  });

  /* Scrubbing on the waveform */
  const canvas = el.wave;
  const ratioFromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  };
  canvas.addEventListener("pointerdown", (event) => {
    if (!current) return;
    scrubbing = true;
    canvas.setPointerCapture(event.pointerId);
    seekRatio(ratioFromEvent(event));
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!scrubbing) return;
    seekRatio(ratioFromEvent(event));
  });
  const endScrub = () => { scrubbing = false; };
  canvas.addEventListener("pointerup", endScrub);
  canvas.addEventListener("pointercancel", endScrub);

  canvas.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); step(5); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); step(-5); }
    else if (event.key === "Home") { event.preventDefault(); seek(0); }
    else if (event.key === "End") {
      event.preventDefault();
      seek((audio.duration || 0) - 1);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  });

  audio.addEventListener("play", () => {
    setPlayingClass();
    ensureAnalyser();
    startLoop();
  });
  audio.addEventListener("pause", () => { setPlayingClass(); draw(); });
  audio.addEventListener("timeupdate", () => { syncTimes(); updateChapterPanel(audio.currentTime); });
  audio.addEventListener("loadedmetadata", () => {
    applyPendingSeek();
    syncTimes();
    draw();
  });
  audio.addEventListener("durationchange", applyPendingSeek);
  audio.addEventListener("canplay", applyPendingSeek);
  audio.addEventListener("ended", next);

  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setActionHandler("play", play);
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("nexttrack", next);
      navigator.mediaSession.setActionHandler("previoustrack", prev);
      navigator.mediaSession.setActionHandler("seekbackward", () => step(-10));
      navigator.mediaSession.setActionHandler("seekforward", () => step(10));
    } catch (err) { /* optional */ }
  }

  if (window.ResizeObserver) {
    new ResizeObserver(() => draw()).observe(canvas);
  } else {
    window.addEventListener("resize", draw);
  }
  draw();
}

export const player = {
  init,
  playEpisode: (episode) => {
    if (current && current.slug === episode.slug) toggle();
    else loadEpisode(episode, { autoplay: true });
  },
  loadEpisode,
  toggle,
  play,
  pause,
  seek,
  next,
  prev,
  close,
  on,
  get current() { return current; },
  get audio() { return audio; },
  get isPlaying() { return !audio.paused; },
  get time() { return audio.currentTime || 0; },
  get duration() { return audio.duration || (current ? current.duration : 0); },
};

export { bySlug };
