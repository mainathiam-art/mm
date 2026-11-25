/* Views — plain templates rendered into #main by the router. */

import {
  EPISODES,
  CATEGORIES,
  FEATURED,
  bySlug,
  categoryName,
  fmtDuration,
  fmtClock,
  episodeIndex,
} from "./data.js";

const pad2 = (n) => String(n).padStart(2, "0");

function waveBars(slug) {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed = (seed * 33 + slug.charCodeAt(i)) % 99991;
  return Array.from({ length: 12 }, (_, i) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const h = 0.35 + (seed / 2147483648) * 0.65;
    return `<i style="--d:${(i * 0.06).toFixed(2)}s;--s:${h.toFixed(2)}"></i>`;
  }).join("");
}

function listenButton(ep, label = "Listen now") {
  return `<button class="listen" type="button" data-play="${ep.slug}">
    <span class="listen__label">${label}</span>
    <span class="listen__wave" aria-hidden="true">${waveBars(ep.slug)}</span>
    <span class="listen__dur">${fmtDuration(ep.duration)}</span>
  </button>`;
}

function card(ep) {
  return `<article class="card" data-cat="${ep.category}">
    <a class="card__link" href="#/episode/${ep.slug}" data-link>
      <figure class="card__figure media media--hover">
        <img src="${ep.image}" alt="${ep.alt}" loading="lazy" width="800" height="1000">
        <span class="media__tag">${fmtDuration(ep.duration)}</span>
      </figure>
      <div class="card__meta">
        <span>Ep. ${pad2(ep.number)}</span>
        <span class="card__cat">${categoryName(ep.category)}</span>
      </div>
      <h3 class="card__title">${ep.title}</h3>
      <p class="card__guest">${ep.guest} · ${ep.role}</p>
    </a>
  </article>`;
}

function ledgerRow(ep) {
  return `<li class="row">
    <span class="row__num">${pad2(ep.number)}</span>
    <a class="row__title" href="#/episode/${ep.slug}" data-link>${ep.title}</a>
    <span class="row__guest">${ep.guest} <em>· ${ep.role}</em></span>
    <span class="row__cat">${categoryName(ep.category)}</span>
    <span class="row__dur">${fmtDuration(ep.duration)}</span>
    <button class="row__play" type="button" data-play="${ep.slug}" aria-label="Play ${ep.title}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
    </button>
    <span class="row__thumb" aria-hidden="true"><img src="${ep.image}" alt=""></span>
  </li>`;
}

function heroTitle(title) {
  const words = title.split(" ");
  if (words.length < 3) {
    return words
      .map((w, i) => `<span class="hero__line"><span>${i === words.length - 1 ? `<em>${w}</em>` : w}</span></span>`)
      .join("");
  }
  const last = words.pop();
  const half = Math.ceil(words.length / 2);
  const first = words.slice(0, half).join(" ");
  const rest = words.slice(half).join(" ");
  return [
    `<span class="hero__line"><span>${first}</span></span>`,
    rest ? `<span class="hero__line"><span>${rest}</span></span>` : "",
    `<span class="hero__line"><span><em>${last}</em></span></span>`,
  ].join("");
}

/* ---------------------------------------------------------------- home ---- */
export function renderHome() {
  const ep = FEATURED;
  const ledger = EPISODES.slice(1, 5);
  const teaser = EPISODES.slice(5, 8);

  return `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__left">
      <p class="eyebrow hero__eyebrow">Episode ${pad2(ep.number)} · Field Notes · ${ep.dateLabel}</p>
      <h1 class="hero__title" id="hero-title" data-parallax="0.05">${heroTitle(ep.title)}</h1>
      <p class="hero__dek">${ep.standfirst}</p>
      <div class="hero__meta">
        <span><strong>${ep.guest}</strong></span>
        <span>${ep.role}</span>
        <span>${ep.place}</span>
        <span>${fmtDuration(ep.duration)}</span>
      </div>
      <div class="hero__actions">
        ${listenButton(ep)}
        <a class="link-arrow" href="#/episode/${ep.slug}" data-link>Read the notes</a>
      </div>
    </div>
    <div class="hero__right">
      <figure class="hero__figure">
        <img src="${ep.image}" alt="${ep.alt}" width="1200" height="1500">
        <span class="media__tag">Portrait · 06:12</span>
        <figcaption class="hero__caption">${ep.guest}, recorded at first light — ${ep.place}.</figcaption>
      </figure>
    </div>
    <p class="hero__scroll" aria-hidden="true"><i></i>Scroll to listen</p>
  </section>

  <div class="frequency" aria-hidden="true"></div>

  <section class="ledger pad" aria-labelledby="ledger-title">
    <div class="section-head grid">
      <p class="eyebrow">02 — The Ledger</p>
      <h2 class="section-head__title" id="ledger-title">Recent <em>transmissions</em></h2>
      <a class="link-arrow" href="#/episodes" data-link>All episodes</a>
    </div>
    <ol class="ledger__list">${ledger.map(ledgerRow).join("")}</ol>
  </section>

  <section class="manifesto pad" aria-labelledby="manifesto-title">
    <div class="manifesto__grid grid">
      <figure class="manifesto__figure media">
        <img src="assets/img/wide.jpg" alt="A portrait photographed in profile, half the face falling into shadow." loading="lazy" width="1000" height="1250">
        <span class="media__tag">Plate 04</span>
      </figure>
      <blockquote class="manifesto__quote" id="manifesto-title">We are not making content. We are keeping a record of how it felt to be alive and listening.</blockquote>
      <div class="manifesto__body">
        <p>Monolith is a quarterly audio journal of long conversations — with the people who keep cities, materials and memories in working order.</p>
        <p>Every episode is recorded on location, edited slowly, and released only when it is true. No panels, no hot takes, no ads read in somebody else's voice.</p>
      </div>
      <div class="manifesto__credits">
        <span>New episodes every other Thursday</span>
        <span>Dakar · Lisbon · Detroit · Kyoto</span>
      </div>
    </div>
  </section>

  <section class="teaser pad" aria-labelledby="teaser-title">
    <div class="section-head grid">
      <p class="eyebrow">03 — From the archive</p>
      <h2 class="section-head__title" id="teaser-title">Earlier <em>rooms</em></h2>
      <a class="link-arrow" href="#/episodes" data-link>Browse the archive</a>
    </div>
    <div class="teaser__grid">${teaser.map(card).join("")}</div>
  </section>`;
}

/* ------------------------------------------------------------- archive ---- */
export function renderArchive(activeFilter = "all") {
  const visible = activeFilter === "all" ? EPISODES : EPISODES.filter((e) => e.category === activeFilter);
  const columns = [[], [], [], []];
  visible.forEach((ep, i) => columns[i % 4].push(ep));
  const speeds = [0.05, 0.12, 0.03, 0.09];

  const filters = [
    `<button type="button" data-filter="all" class="${activeFilter === "all" ? "is-active" : ""}" aria-pressed="${activeFilter === "all"}">All episodes</button>`,
    ...CATEGORIES.map(
      (c) =>
        `<button type="button" data-filter="${c.id}" class="${activeFilter === c.id ? "is-active" : ""}" aria-pressed="${activeFilter === c.id}">${c.name}</button>`
    ),
  ].join("");

  return `
  <header class="page-head pad">
    <p class="eyebrow">The Archive · ${pad2(EPISODES.length)} episodes · 2026</p>
    <h1 class="page-head__title">The <em>Archive</em></h1>
    <p class="page-head__dek">Every conversation we have kept. Recorded on location, transcribed by hand, filed by theme rather than by date.</p>
  </header>

  <div class="filters" role="group" aria-label="Filter episodes by theme">
    ${filters}
    <span class="count">${visible.length} of ${EPISODES.length} shown</span>
  </div>

  <div class="matrix pad" id="matrix">
    ${columns
      .map(
        (col, i) => `<div class="matrix__col" data-speed="${speeds[i]}">
          ${col.map(card).join("")}
        </div>`
      )
      .join("")}
  </div>
  ${visible.length === 0 ? `<p class="empty pad">Nothing filed under that theme yet.</p>` : ""}`;
}

/* ------------------------------------------------------------- episode ---- */
export function renderEpisode(ep) {
  const index = episodeIndex(ep.slug);
  const nextEp = EPISODES[(index + 1) % EPISODES.length];
  const [noteA, noteB] = ep.notes;

  return `
  <article class="episode" data-slug="${ep.slug}">
    <header class="ep-head pad">
      <div class="ep-head__meta">
        <span>Episode <strong>${pad2(ep.number)}</strong></span>
        <span><strong>${categoryName(ep.category)}</strong></span>
        <span>${ep.dateLabel}</span>
        <span>${fmtDuration(ep.duration)}</span>
        <span>${ep.place}</span>
      </div>
      <h1 class="ep-head__title">${ep.title}</h1>
      <p class="ep-head__dek">${ep.standfirst}</p>
      <div class="ep-head__actions">
        ${listenButton(ep, "Listen to the episode")}
        <button class="link-arrow" type="button" data-scroll-to="transcript">Read the transcript</button>
      </div>
      <figure class="ep-head__figure media media--hover">
        <img src="${ep.image}" alt="${ep.alt}" width="1000" height="1250">
        <span class="media__tag">Ep. ${pad2(ep.number)}</span>
      </figure>
    </header>

    <div class="ep-body pad">
      <aside class="ep-aside">
        <div class="ep-aside__sticky">
          <p class="eyebrow">Chapter marks</p>
          <ol class="chapters">
            ${ep.chapters
              .map(
                (c, i) => `<li data-t="${c.t}" class="${i === 0 ? "is-active" : ""}">
                  <button type="button" data-seek="${c.t}">
                    <span class="t">${fmtClock(c.t)}</span>
                    <span>${c.label}</span>
                  </button>
                </li>`
              )
              .join("")}
          </ol>
          <dl class="credits">
            <div><dt>Guest</dt><dd>${ep.guest}</dd></div>
            <div><dt>Host</dt><dd>${ep.credits.host}</dd></div>
            <div><dt>Producer</dt><dd>${ep.credits.producer}</dd></div>
            <div><dt>Editor</dt><dd>${ep.credits.editor}</dd></div>
            <div><dt>Recorded</dt><dd>${ep.credits.recorded}</dd></div>
          </dl>
        </div>
      </aside>

      <div class="ep-notes">
        <section data-mood="linen">
          <p class="lede">${ep.standfirst}</p>
        </section>

        <section data-mood="sand">
          <h2>${noteA.heading}</h2>
          ${noteA.paras.map((p) => `<p>${p}</p>`).join("")}
          <blockquote>${ep.quote.text}<cite>— ${ep.quote.cite}</cite></blockquote>
        </section>

        <section data-mood="bone">
          <figure>
            <div class="media media--hover">
              <img src="assets/img/macro.jpg" alt="A hand gripping a rough, textured surface in near darkness." loading="lazy" width="1200" height="800">
            </div>
            <figcaption>Field notes — ${ep.place}. Photographed for Monolith.</figcaption>
          </figure>
          <h2>${noteB.heading}</h2>
          ${noteB.paras.map((p) => `<p>${p}</p>`).join("")}
        </section>

        <section data-mood="ochre" id="transcript">
          <h2>From the transcript</h2>
          <div class="transcript">
            ${ep.transcript
              .map((line) => `<p><strong>${line.speaker}:</strong> ${line.text}</p>`)
              .join("")}
          </div>
        </section>
      </div>
    </div>

    <section class="ep-next pad" aria-labelledby="next-title">
      <div class="ep-next__inner">
        <p class="eyebrow" id="next-title">Next in the archive</p>
        <a class="ep-next__link" href="#/episode/${nextEp.slug}" data-link>
          <span class="ep-next__title">${nextEp.title}</span>
          <span class="ep-next__guest">${nextEp.guest} · ${fmtDuration(nextEp.duration)}</span>
        </a>
      </div>
    </section>
  </article>`;
}

export function renderNotFound() {
  return `
  <header class="page-head pad">
    <p class="eyebrow">404 — Not filed</p>
    <h1 class="page-head__title">This room is <em>empty</em></h1>
    <p class="page-head__dek">The episode you asked for is not in the archive. It may have been moved, or it may never have existed.</p>
  </header>
  <section class="teaser pad">
    <a class="link-arrow" href="#/episodes" data-link>Back to the archive</a>
  </section>`;
}

export { bySlug };
