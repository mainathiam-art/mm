import { EPISODES, UPCOMING, TEAM } from "./data.js";

/* --------------------------------------------------------------------------
   Icons
   -------------------------------------------------------------------------- */

const ICON_PLAY =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.3c0-.6.7-1 1.2-.7l9.4 6c.5.3.5 1 0 1.3l-9.4 6c-.5.3-1.2 0-1.2-.7V5.3Z"/></svg>';
const ICON_PAUSE =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>';

/* --------------------------------------------------------------------------
   Audio players
   -------------------------------------------------------------------------- */

const playingAudios = new Set();

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function createPlayer(episode, variant = "row") {
  const root = document.createElement("div");
  root.className = `player player--${variant}`;

  const isHero = variant === "hero";
  root.innerHTML = `
    ${
      isHero
        ? `<div class="player__art">
             <img src="${episode.art}" alt="" loading="lazy">
             <span class="player__badge">Latest · S${episode.season} E${episode.number}</span>
           </div>`
        : ""
    }
    <div class="player__body">
      ${
        isHero
          ? `<p class="player__kicker">Season ${episode.season} · ${episode.date}</p>
             <h2 class="player__title">${episode.title}</h2>`
          : ""
      }
      <div class="player__controls">
        <button class="player__play" type="button" data-play
                aria-label="Play ${episode.title}" aria-pressed="false">
          <span class="player__icon player__icon--play">${ICON_PLAY}</span>
          <span class="player__icon player__icon--pause">${ICON_PAUSE}</span>
        </button>
        <div class="player__timeline">
          <input class="seek" type="range" min="0" max="1000" value="0" step="1"
                 aria-label="Seek through ${episode.title}">
          <div class="player__times">
            <span data-current>0:00</span>
            <span data-duration>${episode.duration}</span>
          </div>
        </div>
      </div>
      ${isHero ? '<div class="wave" aria-hidden="true"></div>' : ""}
    </div>`;

  if (isHero) {
    const wave = root.querySelector(".wave");
    const bars = 44;
    for (let i = 0; i < bars; i += 1) {
      const span = document.createElement("span");
      const height = 18 + Math.round(70 * Math.abs(Math.sin(i * 0.63 + 1)));
      span.style.setProperty("--h", height);
      span.style.setProperty("--i", i % 12);
      wave.append(span);
    }
  }

  const audio = new Audio(episode.audio);
  audio.preload = "metadata";

  const playBtn = root.querySelector("[data-play]");
  const seek = root.querySelector(".seek");
  const currentEl = root.querySelector("[data-current]");
  const durationEl = root.querySelector("[data-duration]");

  function paintProgress(percent) {
    seek.style.setProperty("--progress", `${percent}%`);
    seek.value = String(Math.round(percent * 10));
  }

  function sync() {
    const duration = audio.duration;
    const percent = duration ? (audio.currentTime / duration) * 100 : 0;
    paintProgress(percent);
    currentEl.textContent = formatTime(audio.currentTime);
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    playingAudios.forEach((other) => {
      if (other !== audio && !other.paused) other.pause();
    });
    playingAudios.add(audio);
    root.classList.add("is-playing");
    playBtn.setAttribute("aria-pressed", "true");
    playBtn.setAttribute("aria-label", `Pause ${episode.title}`);
  });

  audio.addEventListener("pause", () => {
    root.classList.remove("is-playing");
    playBtn.setAttribute("aria-pressed", "false");
    playBtn.setAttribute("aria-label", `Play ${episode.title}`);
  });

  audio.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(audio.duration)) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener("timeupdate", sync);

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    sync();
  });

  seek.addEventListener("input", () => {
    const percent = Number(seek.value) / 10;
    paintProgress(percent);
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = (percent / 100) * audio.duration;
      currentEl.textContent = formatTime(audio.currentTime);
    }
  });

  return { root, audio };
}

/* --------------------------------------------------------------------------
   Episode cards
   -------------------------------------------------------------------------- */

function createEpisodeCard(episode) {
  const card = document.createElement("article");
  card.className = "ep-card";
  card.dataset.tags = episode.tags.join("|");
  card.innerHTML = `
    <img class="ep-card__art" src="${episode.art}" alt="" loading="lazy">
    <div class="ep-card__info">
      <p class="ep-card__kicker">Season ${episode.season} · Episode ${episode.number} · ${episode.date}</p>
      <h3 class="ep-card__title">${episode.title}</h3>
      <p class="ep-card__desc">${episode.description}</p>
    </div>
    <div class="ep-card__aside">
      <span class="tag">${episode.tags[0]}</span>
      <span class="ep-card__dur">${episode.duration}</span>
    </div>`;
  card.append(createPlayer(episode, "row").root);
  return card;
}

/* --------------------------------------------------------------------------
   Upcoming cards
   -------------------------------------------------------------------------- */

function createUpcomingCard(item, index) {
  const card = document.createElement("article");
  card.className = index === 0 ? "up-card up-card--next" : "up-card";
  card.innerHTML = `
    <div class="up-card__top">
      <div class="up-card__date">
        <span class="up-card__day">${item.day}</span>
        <span class="up-card__month">${item.month}</span>
      </div>
      <span class="up-card__tag">${index === 0 ? "Next up" : item.tag}</span>
    </div>
    <h3 class="up-card__title">${item.title}</h3>
    <p class="up-card__desc">${item.description}</p>
    <p class="up-card__guest">With ${item.guest} · ${item.weekday}</p>`;
  return card;
}

/* --------------------------------------------------------------------------
   Team
   -------------------------------------------------------------------------- */

function createTeamMini(member) {
  const link = document.createElement("a");
  link.className = "team-mini";
  link.href = "/about.html#team";
  link.innerHTML = `
    <span class="team-mini__photo"><img src="${member.photo}" alt="${member.name}" loading="lazy"></span>
    <span class="team-mini__name">${member.name}</span>
    <span class="team-mini__role">${member.role}</span>`;
  return link;
}

function createTeamCard(member) {
  const card = document.createElement("article");
  card.className = "team-card";
  card.innerHTML = `
    <div class="team-card__photo"><img src="${member.photo}" alt="Portrait of ${member.name}" loading="lazy"></div>
    <div class="team-card__body">
      <h3 class="team-card__name">${member.name}</h3>
      <p class="team-card__role">${member.role}</p>
      <p class="team-card__grade">${member.grade} · Riverside High</p>
      <p class="team-card__bio">${member.bio}</p>
    </div>`;
  return card;
}

/* --------------------------------------------------------------------------
   Page wiring
   -------------------------------------------------------------------------- */

function initFeaturedPlayer() {
  const host = document.querySelector("[data-featured-player]");
  if (!host || !EPISODES.length) return null;

  const featured = createPlayer(EPISODES[0], "hero");
  host.append(featured.root);

  const trigger = document.querySelector("[data-play-featured]");
  if (trigger) {
    const label = trigger.querySelector("[data-play-label]") || trigger;
    trigger.addEventListener("click", () => {
      if (featured.audio.paused) {
        featured.audio.play().catch(() => {});
      } else {
        featured.audio.pause();
      }
    });
    featured.audio.addEventListener("play", () => {
      label.textContent = "Pause episode";
      trigger.setAttribute("aria-pressed", "true");
    });
    featured.audio.addEventListener("pause", () => {
      label.textContent = "Play latest episode";
      trigger.setAttribute("aria-pressed", "false");
    });
  }

  return featured;
}

function initLatestEpisodes() {
  const host = document.querySelector("[data-latest-episodes]");
  if (!host) return;
  EPISODES.slice(0, 3).forEach((episode) => {
    host.append(createEpisodeCard(episode));
  });
}

function initEpisodeList() {
  const host = document.querySelector("[data-episodes-list]");
  if (!host) return;

  EPISODES.forEach((episode) => host.append(createEpisodeCard(episode)));

  const chips = [...document.querySelectorAll("[data-filter]")];
  const countEl = document.querySelector("[data-ep-count]");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      const filter = chip.dataset.filter;
      let visible = 0;

      [...host.children].forEach((card) => {
        const show =
          filter === "all" || card.dataset.tags.split("|").includes(filter);
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (countEl) {
        countEl.textContent = `${visible} episode${visible === 1 ? "" : "s"}`;
      }
    });
  });
}

function initUpcoming() {
  document.querySelectorAll("[data-upcoming]").forEach((host) => {
    UPCOMING.forEach((item, index) => {
      host.append(createUpcomingCard(item, index));
    });
  });
}

function initTeam() {
  const strip = document.querySelector("[data-team-strip]");
  if (strip) {
    TEAM.forEach((member) => strip.append(createTeamMini(member)));
  }

  const grid = document.querySelector("[data-team-grid]");
  if (grid) {
    TEAM.forEach((member) => grid.append(createTeamCard(member)));
  }
}

/* Mobile navigation */
function initNav() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!header || !toggle) return;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });

  header.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
}

/* Contact form (client-side validation only) */
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const card = form.closest(".form-card");
  const success = card.querySelector("[data-form-success]");
  const successHeading = success.querySelector("h3");
  const resetBtn = success.querySelector("[data-form-reset]");

  const rules = {
    name: (value) =>
      value.trim().length >= 2 ? "" : "Please tell us your name.",
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? ""
        : "That email doesn’t look right.",
    topic: (value) => (value ? "" : "Pick a topic so this reaches the right person."),
    message: (value) =>
      value.trim().length >= 10
        ? ""
        : "A little more detail helps — at least 10 characters.",
  };

  const fields = [...form.querySelectorAll("[data-field]")];

  const setError = (field, message) => {
    const wrapper = field.closest(".field");
    const errorEl = wrapper.querySelector(".field__error");
    wrapper.classList.toggle("is-invalid", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (errorEl) errorEl.textContent = message;
  };

  fields.forEach((field) => {
    const eventName = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventName, () => setError(field, ""));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;
    fields.forEach((field) => {
      const message = rules[field.name](field.value);
      setError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const name = form.elements.name.value.trim().split(" ")[0];
    successHeading.textContent = `Thanks, ${name} — message noted.`;
    card.classList.add("is-sent");
    success.focus();
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    fields.forEach((field) => setError(field, ""));
    card.classList.remove("is-sent");
    form.elements.name.focus();
  });
}

/* Reveal on scroll */
function initReveal() {
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (!elements.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduced) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  elements.forEach((el) => observer.observe(el));
}

initNav();
const featured = initFeaturedPlayer();
initLatestEpisodes();
initEpisodeList();
initUpcoming();
initTeam();
initContactForm();
initReveal();

// Exposed for small page-level scripts (e.g. the hero CTA).
if (featured) window.betweenTheBells = { featured };
