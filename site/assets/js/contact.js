import { faqs } from "./data.js";
import { initShell } from "./site.js";

document.getElementById("faq-list").innerHTML = faqs
  .map(
    (item) => `
    <details class="faq-item reveal">
      <summary>${item.q}<span class="faq-item__icon" aria-hidden="true"></span></summary>
      <p>${item.a}</p>
    </details>`,
  )
  .join("");

const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const successName = document.getElementById("success-name");
const sendAnother = document.getElementById("send-another");
const select = document.getElementById("topic");

// Deep links such as contact.html?topic=Guest%20pitch pre-select a topic.
const requestedTopic = new URLSearchParams(window.location.search).get("topic");
if (requestedTopic && [...select.options].some((option) => option.value === requestedTopic)) {
  select.value = requestedTopic;
}

const rules = {
  name: (value) => value.trim().length >= 2 || "Tell us what to call you.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) || "That email doesn't look right.",
  topic: (value) => value !== "" || "Pick the closest topic.",
  message: (value) =>
    value.trim().length >= 10 || "Give us a sentence or two — at least ten characters.",
};

function setError(field, message) {
  const input = form.elements[field];
  const error = document.getElementById(`${field}-error`);
  const wrapper = input.closest(".field");

  if (message) {
    wrapper.dataset.invalid = "true";
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
  } else {
    delete wrapper.dataset.invalid;
    input.removeAttribute("aria-invalid");
    error.textContent = "";
  }
}

function validate() {
  let firstInvalid = null;

  Object.entries(rules).forEach(([field, check]) => {
    const result = check(form.elements[field].value);
    const message = result === true ? "" : result;
    setError(field, message);
    if (message && !firstInvalid) firstInvalid = form.elements[field];
  });

  return firstInvalid;
}

Object.keys(rules).forEach((field) => {
  const input = form.elements[field];
  const revalidate = () => {
    if (!input.closest(".field").dataset.invalid) return;
    const result = rules[field](input.value);
    setError(field, result === true ? "" : result);
  };
  input.addEventListener("input", revalidate);
  input.addEventListener("change", revalidate);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstInvalid = validate();

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  successName.textContent = form.elements.name.value.trim().split(" ")[0];
  form.hidden = true;
  success.hidden = false;
  success.focus();
});

sendAnother.addEventListener("click", () => {
  form.reset();
  Object.keys(rules).forEach((field) => setError(field, ""));
  success.hidden = true;
  form.hidden = false;
  form.elements.name.focus();
});

initShell();
