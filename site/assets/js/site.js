// Shared behaviour: navigation, reveal-on-scroll, audio players and card markup.

const PLAY_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z"/></svg>';
const PAUSE_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 4h3.2v16H7zM13.8 4H17v16h-3.2z"/></svg>';

export function initShell() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  initNav();
  initReveal();
}

function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (!header || !toggle) return;

  const close = () => {
    header.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = header.dataset.open === "true";
    header.dataset.open = String(!open);
    toggle.setAttribute("aria-expanded", String(!open));
  });

  header.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.dataset.open === "true") {
      close();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (header.dataset.open === "true" && !header.contains(event.target)) close();
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------- players */

const SPEEDS = [1, 1.25, 1.5, 2];
let activePlayer = null;

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

export function formatDate(iso) {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function mountPlayers(scope = document) {
  scope.querySelectorAll(".player").forEach(mountPlayer);
}

function mountPlayer(root) {
  if (root.dataset.ready === "true") return;
  root.dataset.ready = "true";

  const audio = new Audio(root.dataset.audio);
  audio.preload = "metadata";
  const title = root.dataset.title || "episode";
  const playButton = root.querySelector(".player__play");
  const range = root.querySelector(".player__range");
  const now = root.querySelector(".player__now");
  const total = root.querySelector(".player__total");
  const speedButton = root.querySelector(".player__speed");

  const setIcon = (playing) => {
    playButton.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
    playButton.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${title}`);
    root.classList.toggle("is-playing", playing);
  };

  const paint = () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    const ratio = duration ? audio.currentTime / duration : 0;
    range.value = String(ratio * 100);
    range.style.setProperty("--p", `${(ratio * 100).toFixed(2)}%`);
    now.textContent = formatDuration(audio.currentTime);
    total.textContent = formatDuration(duration);
  };

  setIcon(false);
  total.textContent = root.dataset.duration || "0:00";

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      if (activePlayer && activePlayer !== audio) activePlayer.pause();
      activePlayer = audio;
      const started = audio.play();
      if (started && typeof started.catch === "function") started.catch(() => setIcon(false));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => setIcon(true));
  audio.addEventListener("pause", () => setIcon(false));
  audio.addEventListener("ended", () => {
    setIcon(false);
    audio.currentTime = 0;
    paint();
  });
  audio.addEventListener("loadedmetadata", paint);
  audio.addEventListener("timeupdate", paint);

  range.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(range.value) / 100) * audio.duration;
    paint();
  });

  speedButton?.addEventListener("click", () => {
    const index = SPEEDS.indexOf(audio.playbackRate);
    const next = SPEEDS[(index + 1) % SPEEDS.length];
    audio.playbackRate = next;
    speedButton.textContent = `${next}×`;
    speedButton.setAttribute("aria-label", `Playback speed: ${next} times`);
  });
}

/* ------------------------------------------------------------------ cards */

export function playerMarkup(episode) {
  return `
      <div class="player" data-audio="${episode.audio}" data-title="${episode.title}" data-duration="${episode.duration}">
        <button class="player__play" type="button" aria-label="Play ${episode.title}"></button>
        <div class="player__main">
          <input class="player__range" type="range" min="0" max="100" step="0.1" value="0" aria-label="Seek within ${episode.title}">
          <div class="player__times">
            <span class="player__now">0:00</span>
            <span class="player__total">${episode.duration}</span>
          </div>
        </div>
        <button class="player__speed" type="button" aria-label="Playback speed: 1 times">1×</button>
      </div>`;
}

export function episodeCard(episode, index = 0) {
  return `
  <article class="episode reveal" id="${episode.id}" data-id="${episode.id}" style="--delay:${Math.min(index, 6) * 45}ms">
    <div class="cover" data-tone="${episode.tone}" aria-hidden="true">
      <span class="cover__season">Season ${episode.season || 3}</span>
      <span class="cover__number">${String(episode.number).padStart(2, "0")}</span>
      <span class="cover__mark">Between the Bells</span>
    </div>
    <div class="episode__body">
      <p class="episode__meta">
        <span>Ep. ${String(episode.number).padStart(2, "0")}</span>
        <span aria-hidden="true">·</span>
        <span>${formatDate(episode.date)}</span>
        <span aria-hidden="true">·</span>
        <span>${episode.duration}</span>
      </p>
      <h3 class="episode__title">${episode.title}</h3>
      <p class="episode__blurb">${episode.blurb}</p>
      ${playerMarkup(episode)}
      <ul class="tag-row">
        ${episode.tags.map((tag) => `<li class="tag">${tag}</li>`).join("")}
        <li class="tag tag--ghost">${episode.guest}</li>
      </ul>
    </div>
  </article>`;
}

export function upcomingCard(item, index = 0) {
  const date = new Date(`${item.date}T12:00:00`);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  return `
  <article class="upcoming-card reveal" style="--delay:${index * 60}ms">
    <div class="upcoming-card__date">
      <span>${month}</span>
      <strong>${day}</strong>
    </div>
    <div class="upcoming-card__body">
      <p class="upcoming-card__meta">${item.tag} <span aria-hidden="true">·</span> ${item.guest}</p>
      <h3>${item.title}</h3>
      <p>${item.blurb}</p>
    </div>
    <span class="upcoming-card__badge">Coming soon</span>
  </article>`;
}
