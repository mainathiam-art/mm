import { team } from "./data.js";
import { initShell } from "./site.js";

document.getElementById("team-grid").innerHTML = team
  .map(
    (member, index) => `
    <li class="member reveal" style="--delay:${index * 60}ms">
      <figure class="member__photo">
        <img src="${member.photo}" alt="${member.name}" width="700" height="800" loading="lazy">
      </figure>
      <div class="member__body">
        <p class="member__role">${member.role} · ${member.grade}</p>
        <h3>${member.name}</h3>
        <p class="member__quote">“${member.quote}”</p>
        <p class="member__fact"><span>Off air:</span> ${member.fact}</p>
      </div>
    </li>`,
  )
  .join("");

initShell();
