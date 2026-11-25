import { episodes, filters, upcoming } from "./data.js";
import { episodeCard, initShell, mountPlayers, upcomingCard } from "./site.js";

const list = document.getElementById("episode-list");
const chips = document.getElementById("filter-chips");
const search = document.getElementById("episode-search");
const count = document.getElementById("episode-count");
const empty = document.getElementById("episode-empty");

list.innerHTML = episodes.map(episodeCard).join("");
document.getElementById("upcoming-list").innerHTML = upcoming.map(upcomingCard).join("");

chips.innerHTML = filters
  .map(
    (filter) => `
    <button class="chip" type="button" data-filter="${filter}" aria-pressed="${filter === "All"}">${filter}</button>`,
  )
  .join("");

let activeFilter = "All";
let query = "";

function applyFilters() {
  let shown = 0;

  episodes.forEach((episode) => {
    const card = list.querySelector(`[data-id="${episode.id}"]`);
    if (!card) return;

    const matchesTheme = activeFilter === "All" || episode.tags.includes(activeFilter);
    const haystack = `${episode.title} ${episode.blurb} ${episode.guest} ${episode.tags.join(" ")}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const visible = matchesTheme && matchesQuery;

    card.hidden = !visible;
    if (visible) shown += 1;
  });

  count.textContent = `Showing ${shown} of ${episodes.length} episodes`;
  empty.hidden = shown > 0;
}

chips.addEventListener("click", (event) => {
  const chip = event.target.closest(".chip");
  if (!chip) return;

  activeFilter = chip.dataset.filter;
  chips.querySelectorAll(".chip").forEach((button) => {
    button.setAttribute("aria-pressed", String(button === chip));
  });
  applyFilters();
});

search.addEventListener("input", () => {
  query = search.value.trim().toLowerCase();
  applyFilters();
});

applyFilters();
initShell();
mountPlayers(list);
