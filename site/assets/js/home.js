import { episodes, team, upcoming } from "./data.js";
import { formatDate, initShell, mountPlayers, playerMarkup, upcomingCard } from "./site.js";

const latest = episodes[0];
const number = String(latest.number).padStart(2, "0");

document.getElementById("featured").innerHTML = `
  <article class="feature-card reveal">
    <div class="cover cover--feature" data-tone="${latest.tone}" aria-hidden="true">
      <span class="cover__season">Season 3 · Episode ${number}</span>
      <span class="cover__number">${number}</span>
      <span class="cover__mark">Between the Bells</span>
    </div>
    <div class="feature-card__body">
      <p class="kicker">Latest episode · ${formatDate(latest.date)}</p>
      <h3>${latest.title}</h3>
      <p class="feature-card__blurb">${latest.blurb}</p>
      ${playerMarkup(latest)}
      <div class="feature-card__foot">
        <ul class="tag-row">
          ${latest.tags.map((tag) => `<li class="tag tag--light">${tag}</li>`).join("")}
          <li class="tag tag--light">${latest.guest}</li>
        </ul>
        <a class="link-arrow link-arrow--light" href="episodes.html">All episodes <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </article>`;

document.getElementById("upcoming").innerHTML = upcoming.map(upcomingCard).join("");

document.getElementById("team-strip").innerHTML = team
  .map(
    (member) => `
    <li class="team-strip__item">
      <img src="${member.photo}" alt="${member.name}" width="700" height="800" loading="lazy">
      <span class="team-strip__name">${member.name}</span>
      <span class="team-strip__role">${member.role}</span>
    </li>`,
  )
  .join("");

initShell();
mountPlayers();

const form = document.getElementById("signup-form");
const note = document.getElementById("signup-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = form.elements.email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  note.dataset.state = valid ? "ok" : "error";
  note.textContent = valid
    ? "You're on the list — see you Friday."
    : "That email doesn't look right. Mind checking it?";
  if (valid) form.reset();
});
