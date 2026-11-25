/* ==========================================================================
   The Student Voice — comportements du site
   Aucune dépendance externe. Les contenus viennent de data.js.
   ========================================================================== */

import { site, categories, episodes, team } from "./data.js";

/* ---------- petits utilitaires ------------------------------------------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const esc = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
  );

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const formatDate = (iso) => dateFmt.format(new Date(`${iso}T12:00:00`));

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
};

const getCategory = (id) =>
  categories.find((category) => category.id === id) || categories[0];

/* ---------- icônes -------------------------------------------------------- */

const ICONS = {
  school:
    '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 10v6"/>',
  palette:
    '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.4 1-2 2.5-2H18a3 3 0 0 0 3-3 9 9 0 0 0-9-8Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7" r="1"/>',
  flask:
    '<path d="M9 3h6"/><path d="M10 3v6l-5.6 9.4A2 2 0 0 0 6.1 21h11.8a2 2 0 0 0 1.7-2.6L14 9V3"/><path d="M7.5 15h9"/>',
  mic:
    '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v4"/><path d="M8 21h8"/>',
  chat:
    '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.5-.8L3 21l1.9-5.5A8.4 8.4 0 0 1 4 11.5a8.4 8.4 0 0 1 8.5-8.4A8.4 8.4 0 0 1 21 11.5Z"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  "arrow-up-right": '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" stroke="none"/>',
  mail:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  pin:
    '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
};

const icon = (name, className = "") =>
  `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

/* ---------- pochettes d'épisode (SVG générées) --------------------------- */

const COVER_THEMES = {
  "vie-scolaire": { from: "#FF7A5C", to: "#F2A07B", bars: "#FFF4EE" },
  culture: { from: "#6C4DFF", to: "#B7A4FF", bars: "#F4F0FF" },
  sciences: { from: "#0E8F6B", to: "#7FD9B7", bars: "#EBFFF6" },
  interviews: { from: "#E08A00", to: "#FFC85C", bars: "#FFF8E6" },
  opinions: { from: "#2F3AA8", to: "#7D8BFF", bars: "#EEF0FF" },
};

const BAR_HEIGHTS = [18, 32, 12, 46, 24, 54, 20, 38, 14, 48];

function coverArt(episode) {
  const category = getCategory(episode.category);
  const theme = COVER_THEMES[category.id] || COVER_THEMES["vie-scolaire"];
  const gradientId = `cover-${episode.id}`;
  const bars = BAR_HEIGHTS.map(
    (height, index) =>
      `<rect x="${250 + index * 13}" y="${352 - height}" width="6" height="${height}" rx="3" fill="${theme.bars}" fill-opacity=".82"/>`
  ).join("");

  return `<svg class="cover-art" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Pochette de l'épisode ${episode.number} : ${esc(episode.title)}">
    <defs>
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${theme.from}"/>
        <stop offset="1" stop-color="${theme.to}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#${gradientId})"/>
    <path d="M400 0v150L210 400H0Z" fill="#000" opacity=".06"/>
    <g fill="none" stroke="#fff" stroke-opacity=".24">
      <circle cx="322" cy="78" r="128" stroke-width="1.5"/>
      <circle cx="322" cy="78" r="92" stroke-width="1.5"/>
      <circle cx="322" cy="78" r="56" stroke-width="1.5"/>
    </g>
    <text x="28" y="50" class="cover-art__brand">THE STUDENT VOICE</text>
    <text x="22" y="318" class="cover-art__num">${String(episode.number).padStart(2, "0")}</text>
    <text x="28" y="356" class="cover-art__cat">${esc(category.label)}</text>
    ${bars}
  </svg>`;
}

/* ---------- lecteur audio ------------------------------------------------- */

function createPlayer(src, label = "Écouter l'épisode") {
  const root = document.createElement("div");
  root.className = "player";
  root.innerHTML = `
    <audio preload="metadata" src="${esc(src)}"></audio>
    <button class="player__toggle" type="button" aria-label="Lire l'épisode">
      ${icon("play", "icon--play")}
      ${icon("pause", "icon--pause")}
    </button>
    <div class="player__body">
      <div class="player__top">
        <span class="player__label">${esc(label)}</span>
        <span class="player__time"><span data-current>0:00</span> / <span data-duration>0:00</span></span>
      </div>
      <input class="player__seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Position de lecture" />
    </div>`;

  const audio = $("audio", root);
  const toggle = $(".player__toggle", root);
  const seek = $(".player__seek", root);
  const current = $("[data-current]", root);
  const duration = $("[data-duration]", root);

  const setPlaying = (playing) => {
    root.classList.toggle("is-playing", playing);
    toggle.setAttribute("aria-label", playing ? "Mettre en pause" : "Lire l'épisode");
  };

  toggle.addEventListener("click", () => {
    if (audio.paused) {
      $$(".player.is-playing").forEach((other) => {
        const otherAudio = $("audio", other);
        if (otherAudio && otherAudio !== audio) otherAudio.pause();
      });
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener("timeupdate", () => {
    current.textContent = formatTime(audio.currentTime);
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    root.style.setProperty("--progress", `${percent}%`);
    if (document.activeElement !== seek) seek.value = String(Math.round(percent * 10));
  });
  audio.addEventListener("ended", () => {
    setPlaying(false);
    audio.currentTime = 0;
    seek.value = "0";
    current.textContent = "0:00";
    root.style.setProperty("--progress", "0%");
  });
  seek.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
    root.style.setProperty("--progress", `${Number(seek.value) / 10}%`);
  });

  return root;
}

function hydratePlayers(scope = document) {
  $$("[data-player]", scope).forEach((slot) => {
    const player = createPlayer(
      slot.dataset.player,
      slot.dataset.playerLabel || "Écouter l'épisode"
    );
    slot.replaceWith(player);
  });
}

/* ---------- cartes et listes --------------------------------------------- */

function featuredMarkup(episode) {
  const category = getCategory(episode.category);
  return `
    <div class="featured__cover">${coverArt(episode)}</div>
    <div class="featured__body">
      <div class="featured__meta">
        <span class="tag tag--${category.id}">${esc(category.label)}</span>
        <span class="episode-num">Épisode ${String(episode.number).padStart(2, "0")}</span>
        <span class="meta-dot" aria-hidden="true"></span>
        <time datetime="${episode.date}">${formatDate(episode.date)}</time>
      </div>
      <h3 class="featured__title">${esc(episode.title)}</h3>
      <p class="featured__excerpt">${esc(episode.description)}</p>
      <p class="featured__guest">Avec <strong>${esc(episode.guest)}</strong></p>
      <div data-player="${episode.audio}" data-player-label="Écouter l'épisode"></div>
      <a class="link-arrow featured__link" href="episodes.html#${episode.id}">
        Voir la fiche de l'épisode ${icon("arrow-right")}
      </a>
    </div>`;
}

function episodeCardMarkup(episode) {
  const category = getCategory(episode.category);
  return `
    <article class="episode-card" data-reveal>
      <a class="episode-card__cover" href="episodes.html#${episode.id}" aria-label="Épisode ${episode.number} : ${esc(episode.title)}">
        ${coverArt(episode)}
      </a>
      <div class="episode-card__body">
        <div class="episode-card__meta">
          <span class="tag tag--${category.id}">${esc(category.label)}</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <time datetime="${episode.date}">${formatDate(episode.date)}</time>
        </div>
        <h3 class="episode-card__title">
          <a href="episodes.html#${episode.id}">${esc(episode.title)}</a>
        </h3>
        <p class="episode-card__excerpt">${esc(episode.excerpt)}</p>
        <div data-player="${episode.audio}" data-player-label="Écouter l'épisode"></div>
      </div>
    </article>`;
}

function categoryCardMarkup(category) {
  const count = episodes.filter((episode) => episode.category === category.id).length;
  return `
    <a class="category-card category-card--${category.id}" href="episodes.html?categorie=${category.id}" data-reveal>
      <span class="category-card__top">
        <span class="category-card__icon">${icon(category.icon)}</span>
        <span class="category-card__arrow">${icon("arrow-up-right")}</span>
      </span>
      <span class="category-card__bottom">
        <span class="category-card__label">${esc(category.label)}</span>
        <span class="category-card__blurb">${esc(category.blurb)}</span>
        <span class="category-card__count">${count} épisode${count > 1 ? "s" : ""}</span>
      </span>
    </a>`;
}

function episodeRowMarkup(episode) {
  const category = getCategory(episode.category);
  const haystack = normalize(
    [episode.title, episode.excerpt, episode.description, episode.guest, category.label].join(" ")
  );
  return `
    <article class="episode-row" id="${episode.id}" data-category="${category.id}" data-search="${esc(haystack)}" data-reveal>
      <div class="episode-row__cover">${coverArt(episode)}</div>
      <div class="episode-row__body">
        <div class="episode-row__meta">
          <span class="tag tag--${category.id}">${esc(category.label)}</span>
          <span class="episode-num">Ép. ${String(episode.number).padStart(2, "0")}</span>
          <span class="meta-dot" aria-hidden="true"></span>
          <time datetime="${episode.date}">${formatDate(episode.date)}</time>
        </div>
        <h2 class="episode-row__title">${esc(episode.title)}</h2>
        <p class="episode-row__desc">${esc(episode.description)}</p>
        <p class="episode-row__guest">Avec <strong>${esc(episode.guest)}</strong></p>
        <div data-player="${episode.audio}" data-player-label="Écouter l'épisode"></div>
      </div>
    </article>`;
}

/* ---------- page d'accueil ------------------------------------------------ */

function renderHome() {
  const latest = episodes.find((episode) => episode.featured) || episodes[0];
  const latestSlot = $("[data-latest]");
  if (latestSlot) {
    latestSlot.innerHTML = featuredMarkup(latest);
    hydratePlayers(latestSlot);
  }

  const grid = $("[data-home-episodes]");
  if (grid) {
    grid.innerHTML = episodes
      .filter((episode) => episode.id !== latest.id)
      .slice(0, 3)
      .map(episodeCardMarkup)
      .join("");
    hydratePlayers(grid);
  }

  const categoryGrid = $("[data-category-grid]");
  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map(categoryCardMarkup).join("");
  }
}

/* ---------- page "Nos épisodes" ------------------------------------------ */

function initEpisodesPage() {
  const list = $("[data-episode-list]");
  if (!list) return;

  const filters = $("[data-filters]");
  const search = $("[data-search]");
  const countEl = $("[data-results-count]");
  const empty = $("[data-empty]");
  const reset = $("[data-reset]");

  const counts = Object.fromEntries(
    categories.map((category) => [
      category.id,
      episodes.filter((episode) => episode.category === category.id).length,
    ])
  );

  filters.innerHTML = [
    `<button class="chip is-active" type="button" data-filter="all" aria-pressed="true">Tous <span>${episodes.length}</span></button>`,
    ...categories.map(
      (category) =>
        `<button class="chip" type="button" data-filter="${category.id}" aria-pressed="false">${esc(category.label)} <span>${counts[category.id]}</span></button>`
    ),
  ].join("");

  list.innerHTML = episodes.map(episodeRowMarkup).join("");
  hydratePlayers(list);

  let activeCategory = "all";
  const requested = new URLSearchParams(location.search).get("categorie");
  if (requested && categories.some((category) => category.id === requested)) {
    activeCategory = requested;
  }

  const apply = () => {
    const term = normalize((search?.value || "").trim());
    let visible = 0;

    $$(".episode-row", list).forEach((row) => {
      const matchesCategory =
        activeCategory === "all" || row.dataset.category === activeCategory;
      const matchesTerm = !term || row.dataset.search.includes(term);
      const show = matchesCategory && matchesTerm;
      row.hidden = !show;
      if (show) visible += 1;
    });

    $$(".chip", filters).forEach((chip) => {
      const on = chip.dataset.filter === activeCategory;
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-pressed", String(on));
    });

    if (countEl) {
      countEl.textContent = `${visible} épisode${visible > 1 ? "s" : ""} affiché${visible > 1 ? "s" : ""}`;
    }
    if (empty) empty.hidden = visible > 0;
  };

  filters.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    activeCategory = chip.dataset.filter;
    apply();
  });

  search?.addEventListener("input", apply);

  reset?.addEventListener("click", () => {
    activeCategory = "all";
    if (search) search.value = "";
    apply();
  });

  apply();

  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }
}

/* ---------- équipe -------------------------------------------------------- */

function renderTeam() {
  const grid = $("[data-team-grid]");
  if (!grid) return;
  grid.innerHTML = team
    .map(
      (member) => `
      <article class="team-card" data-reveal>
        <div class="team-card__photo">
          <img src="${member.photo}" alt="Portrait de ${esc(member.name)}" loading="lazy" width="480" height="600" />
        </div>
        <div class="team-card__body">
          <h3 class="team-card__name">${esc(member.name)}</h3>
          <p class="team-card__role">${esc(member.role)}</p>
          <p class="team-card__bio">${esc(member.bio)}</p>
        </div>
      </article>`
    )
    .join("");
}

/* ---------- formulaires --------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fieldError(field) {
  if (field.type === "checkbox") {
    return field.checked ? "" : "Merci de cocher cette case pour continuer.";
  }
  const value = field.value.trim();
  if (!value) return "Ce champ est obligatoire.";
  if (field.type === "email" && !EMAIL_RE.test(value)) {
    return "Vérifiez votre adresse e-mail.";
  }
  if (field.dataset.minlength && value.length < Number(field.dataset.minlength)) {
    return "Ajoutez quelques détails : 20 caractères minimum.";
  }
  return "";
}

function setFieldState(field, message) {
  const wrap = field.closest(".field");
  if (!wrap) return;
  wrap.classList.toggle("has-error", Boolean(message));
  field.setAttribute("aria-invalid", message ? "true" : "false");
  const error = wrap.querySelector(".field__error");
  if (error) error.textContent = message;
}

function buildMailto(form) {
  const lines = $$("[name]", form)
    .filter((field) => field.type !== "checkbox" || field.checked)
    .map((field) => {
      const label = field.dataset.label || field.name;
      const value = field.type === "checkbox" ? "Oui" : field.value.trim();
      return `${label} : ${value}`;
    });
  const subject =
    form.dataset.mailSubject || "Message depuis le site The Student Voice";
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n\n")
  )}`;
}

function initForms() {
  $$("[data-form]").forEach((form) => {
    const fields = $$("[data-validate]", form);
    const success = document.querySelector(
      `[data-form-success="${form.dataset.form}"]`
    );
    const mailto = success?.querySelector("[data-mailto]");
    const back = success?.querySelector("[data-form-reset]");

    fields.forEach((field) => {
      const revalidate = () => {
        if (field.closest(".field")?.classList.contains("has-error")) {
          setFieldState(field, fieldError(field));
        }
      };
      field.addEventListener("input", revalidate);
      field.addEventListener("change", revalidate);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid = null;

      fields.forEach((field) => {
        const message = fieldError(field);
        setFieldState(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus({ preventScroll: true });
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      if (mailto) mailto.href = buildMailto(form);
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
        $("h3", success)?.focus?.();
      }
    });

    back?.addEventListener("click", () => {
      form.reset();
      fields.forEach((field) => setFieldState(field, ""));
      if (success) success.hidden = true;
      form.hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---------- navigation ---------------------------------------------------- */

function initNav() {
  const toggle = $(".nav-toggle");
  const nav = $("#nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };

  toggle.addEventListener("click", () =>
    setOpen(!document.body.classList.contains("nav-open"))
  );

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

/* ---------- animations d'apparition -------------------------------------- */

function initReveal() {
  const items = $$("[data-reveal]");
  if (!items.length) return;

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    items.forEach((item) => item.classList.add("is-in"));
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
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- démarrage ----------------------------------------------------- */

initNav();
renderHome();
initEpisodesPage();
renderTeam();
initForms();
initReveal();

$$("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
