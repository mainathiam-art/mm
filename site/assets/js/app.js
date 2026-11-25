/* Router, motion system and the shared gestures of the journal. */

import { EPISODES, CATEGORIES, bySlug, fmtDuration } from "./data.js";
import { player } from "./player.js";
import { renderHome, renderArchive, renderEpisode, renderNotFound } from "./views.js";

const main = document.getElementById("main");
const topbar = document.getElementById("topbar");
const spine = document.querySelector(".spine");
const menu = document.getElementById("menu");
const menuButton = document.getElementById("menu-open");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let menuOpen = false;
let moodObserver = null;
let currentFilter = "all";

/* ------------------------------------------------------------ inertia ---- */
const inertia = (() => {
  let target = 0;
  let raf = null;
  let active = false;

  const maxScroll = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  function step() {
    const current = window.scrollY;
    const delta = target - current;
    if (Math.abs(delta) < 0.7) {
      window.scrollTo(0, target);
      raf = null;
      active = false;
      return;
    }
    window.scrollTo(0, current + delta * 0.16);
    raf = requestAnimationFrame(step);
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (reduceMotion.matches) return;
      if (event.ctrlKey) return;
      if (document.body.classList.contains("no-scroll")) return;
      if (event.target instanceof Element && event.target.closest("[data-native-scroll]")) return;
      const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      if (!event.deltaY) return;
      event.preventDefault();
      const from = active ? target : window.scrollY;
      target = Math.max(0, Math.min(maxScroll(), from + event.deltaY * unit * 1.06));
      if (!active) {
        active = true;
        raf = requestAnimationFrame(step);
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "scroll",
    () => {
      if (!active) target = window.scrollY;
    },
    { passive: true }
  );

  return {
    stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      active = false;
      target = window.scrollY;
    },
    sync() {
      target = window.scrollY;
    },
  };
})();

function jumpTo(y) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  root.style.scrollBehavior = previous;
  inertia.sync();
}

function scrollToElement(element) {
  if (!element) return;
  inertia.stop();
  element.scrollIntoView({
    behavior: reduceMotion.matches ? "auto" : "smooth",
    block: "start",
  });
}

/* ------------------------------------------------------------- router ---- */
function parseRoute() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const [path, query] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(query || "");

  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "episodes") return { name: "archive", filter: params.get("theme") || "all" };
  if (parts[0] === "episode" && parts[1]) return { name: "episode", slug: parts[1] };
  return { name: "notfound" };
}

function setNav(name) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === name);
  });
}

function render({ scrollY = 0 } = {}) {
  const route = parseRoute();
  inertia.stop();

  let html;
  let title;
  let nav = "latest";

  if (route.name === "home") {
    html = renderHome();
    title = "Monolith — An Audio Journal";
  } else if (route.name === "archive") {
    currentFilter = route.filter;
    html = renderArchive(route.filter);
    title = "The Archive — Monolith";
    nav = "archive";
  } else if (route.name === "episode") {
    const episode = bySlug(route.slug);
    if (episode) {
      html = renderEpisode(episode);
      title = `${episode.title} — Monolith`;
    } else {
      html = renderNotFound();
      title = "Not found — Monolith";
    }
    nav = "archive";
  } else {
    html = renderNotFound();
    title = "Not found — Monolith";
  }

  main.innerHTML = html;
  document.title = title;
  setNav(nav);

  main.classList.remove("is-entering");
  void main.offsetWidth;
  main.classList.add("is-entering");

  jumpTo(scrollY);
  syncScrollUi();
  observeMoods();
  parallax();
  updateChapterHighlight(player.time);

  main.focus({ preventScroll: true });
}

/* ------------------------------------------------------------- moods ----- */
const MOODS = {
  bone: "var(--bone)",
  linen: "var(--tint-linen)",
  sand: "var(--tint-sand)",
  ochre: "var(--tint-ochre)",
};

function setMood(name) {
  const value = MOODS[name] || MOODS.bone;
  document.documentElement.style.setProperty("--mood", value);
}

function observeMoods() {
  if (moodObserver) moodObserver.disconnect();
  const sections = main.querySelectorAll("[data-mood]");
  if (!sections.length) {
    setMood("bone");
    return;
  }
  setMood(sections[0].dataset.mood);
  moodObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setMood(entry.target.dataset.mood);
      });
    },
    { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
  );
  sections.forEach((section) => moodObserver.observe(section));
}

/* ------------------------------------------------------------- scroll ----- */
let scrollQueued = false;

function onScroll() {
  scrollQueued = false;
  const y = window.scrollY;
  topbar.classList.toggle("is-scrolled", y > 24);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (spine) spine.style.setProperty("--read", `${max > 0 ? (y / max) * 100 : 0}%`);

  parallax();
}

function syncScrollUi() {
  const y = window.scrollY;
  topbar.classList.toggle("is-scrolled", y > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (spine) spine.style.setProperty("--read", `${max > 0 ? (y / max) * 100 : 0}%`);
}

function parallax() {
  if (reduceMotion.matches || window.innerWidth < 980) {
    main.querySelectorAll("[data-parallax]").forEach((el) => {
      el.style.transform = "";
    });
    main.querySelectorAll(".matrix__col[data-speed]").forEach((el) => {
      el.style.transform = "";
    });
    return;
  }

  const y = window.scrollY;

  main.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0;
    el.style.transform = `translate3d(0, ${(y * speed).toFixed(2)}px, 0)`;
  });

  main.querySelectorAll(".matrix__col[data-speed]").forEach((el) => {
    const speed = Number(el.dataset.speed) || 0;
    const center = el.offsetTop + el.offsetHeight / 2 - y - window.innerHeight / 2;
    el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
  });
}

window.addEventListener(
  "scroll",
  () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(onScroll);
  },
  { passive: true }
);

window.addEventListener("resize", () => {
  parallax();
});

/* ------------------------------------------------------ frequency bars ---- */
function buildFrequency() {
  document.querySelectorAll(".frequency").forEach((strip) => {
    if (strip.children.length) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 64; i++) {
      const bar = document.createElement("span");
      bar.className = "frequency__bar";
      bar.appendChild(document.createElement("i"));
      frag.appendChild(bar);
    }
    strip.appendChild(frag);
  });
}

let pointerX = -9999;
let pointerY = -9999;
let freqQueued = false;

function paintFrequency() {
  freqQueued = false;
  const strips = document.querySelectorAll(".frequency");
  strips.forEach((strip) => {
    const rect = strip.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
    const bars = strip.children;
    const step = rect.width / bars.length;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i].firstElementChild;
      if (!bar) continue;
      const cx = rect.left + (i + 0.5) * step;
      const distance = Math.hypot(cx - pointerX, cy - pointerY);
      const influence = Math.max(0, 1 - distance / 300);
      const idle = 0.05 + 0.07 * (0.5 + 0.5 * Math.sin(i * 0.42));
      bar.style.transform = `scaleY(${(idle + influence * 0.93).toFixed(3)})`;
      bar.style.background = influence > 0.5 ? "var(--terra)" : "";
    }
  });
}

window.addEventListener(
  "pointermove",
  (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (freqQueued) return;
    freqQueued = true;
    requestAnimationFrame(paintFrequency);
  },
  { passive: true }
);

/* --------------------------------------------------------------- menu ----- */
function buildMenu() {
  const cats = document.getElementById("menu-cats");
  const recent = document.getElementById("menu-recent");
  if (cats) {
    cats.innerHTML = CATEGORIES.map(
      (cat, i) => `<li><a href="#/episodes?theme=${cat.id}" data-link>
        <span class="num">0${i + 1}</span>
        <span class="name">${cat.name}</span>
        <span class="trend">${cat.trend}</span>
      </a></li>`
    ).join("");
  }
  if (recent) {
    recent.innerHTML = EPISODES.slice(0, 3)
      .map(
        (ep) => `<li><a href="#/episode/${ep.slug}" data-link>
          <span>${ep.title}</span>
          <span class="num">${fmtDuration(ep.duration)}</span>
        </a></li>`
      )
      .join("");
  }
}

function openMenu() {
  if (menuOpen) return;
  menuOpen = true;
  menu.hidden = false;
  document.body.classList.add("no-scroll");
  menuButton.setAttribute("aria-expanded", "true");
  inertia.stop();
  const first = menu.querySelector("a, button");
  if (first) first.focus({ preventScroll: true });
}

function closeMenu({ restoreFocus = true } = {}) {
  if (!menuOpen) return;
  menuOpen = false;
  menu.hidden = true;
  document.body.classList.remove("no-scroll");
  menuButton.setAttribute("aria-expanded", "false");
  if (restoreFocus) menuButton.focus({ preventScroll: true });
}

menuButton.addEventListener("click", openMenu);
document.getElementById("menu-close").addEventListener("click", () => closeMenu());

menu.addEventListener("click", (event) => {
  if (event.target === menu) closeMenu();
  const link = event.target.closest("a[data-link]");
  if (link) closeMenu({ restoreFocus: false });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuOpen) {
    closeMenu();
    return;
  }
  if (event.key !== "Tab" || !menuOpen) return;
  const focusable = menu.querySelectorAll("a[href], button:not([disabled])");
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* ------------------------------------------------------- interactions ----- */
document.addEventListener("click", (event) => {
  const play = event.target.closest("[data-play]");
  if (play) {
    const episode = bySlug(play.dataset.play);
    if (episode) player.playEpisode(episode);
    return;
  }

  const seek = event.target.closest("[data-seek]");
  if (seek) {
    const article = event.target.closest(".episode");
    const episode = article ? bySlug(article.dataset.slug) : null;
    if (episode) {
      if (!player.current || player.current.slug !== episode.slug) {
        player.loadEpisode(episode, { autoplay: false });
      }
      player.seek(Number(seek.dataset.seek));
      player.play();
    }
    return;
  }

  const scrollTo = event.target.closest("[data-scroll-to]");
  if (scrollTo) {
    scrollToElement(document.getElementById(scrollTo.dataset.scrollTo));
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    const theme = filter.dataset.filter;
    currentFilter = theme;
    const hash = theme === "all" ? "#/episodes" : `#/episodes?theme=${theme}`;
    history.replaceState(null, "", hash);
    render({ scrollY: window.scrollY });
    return;
  }

  const subscribe = event.target.closest("[data-subscribe]");
  if (subscribe) {
    closeMenu({ restoreFocus: false });
    scrollToElement(document.getElementById("subscribe"));
    return;
  }

  const link = event.target.closest("a[data-link]");
  if (link) {
    if (menuOpen) closeMenu({ restoreFocus: false });
    const href = link.getAttribute("href");
    if (href && href === (location.hash || "#/")) {
      event.preventDefault();
      render();
    }
  }
});

/* --------------------------------------------------------- newsletter ----- */
const dispatch = document.getElementById("dispatch");
if (dispatch) {
  dispatch.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("email");
    const note = document.getElementById("dispatch-note");
    if (!input || !note) return;
    if (!input.value.trim() || !input.checkValidity()) {
      note.textContent = "That address does not look right. Try again?";
      note.classList.remove("is-success");
      input.focus();
      return;
    }
    note.textContent = "You are on the list. The next dispatch leaves on Thursday.";
    note.classList.add("is-success");
    input.value = "";
  });
}

/* ------------------------------------------------------------- chapters --- */
function updateChapterHighlight(time) {
  const article = main.querySelector(".episode");
  if (!article) return;
  const items = article.querySelectorAll(".chapters li[data-t]");
  if (!items.length) return;
  const isCurrent = player.current && player.current.slug === article.dataset.slug;
  let activeIndex = 0;
  if (isCurrent) {
    items.forEach((item, index) => {
      if (time >= Number(item.dataset.t)) activeIndex = index;
    });
  }
  items.forEach((item, index) => item.classList.toggle("is-active", index === activeIndex));
}

player.on("time", ({ time }) => updateChapterHighlight(time));
player.on("track", (episode) => {
  if (!episode) return;
  const article = main.querySelector(".episode");
  if (article && article.dataset.slug === episode.slug) updateChapterHighlight(player.time);
});

/* ---------------------------------------------------------------- boot ---- */
player.init();
buildMenu();
buildFrequency();
paintFrequency();

if (!location.hash) history.replaceState(null, "", "#/");
render();
window.addEventListener("hashchange", () => render());
