import { content as C } from "./content.js";

const $ = (s) => document.querySelector(s);
const b = C.booking || {};
const opts = b.options || [];
const live = opts.filter((o) => o.url);

// Availability line lives in config so it can never disagree with itself.
const hint = $("#availability-hint");
if (hint) hint.innerHTML = `I'm available <strong>${b.availability}</strong>. Give me two or three options and I'll confirm one.`;

const slot = $("#google-booking");
const form = $("#fallback-form");

if (live.length) {
  // At least one Google schedule exists — show the lengths as direct choices.
  // Each links to its own schedule; the visitor sees one page with three lengths.
  form.hidden = true;
  slot.hidden = false;

  const intro = document.createElement("p");
  intro.className = "lede booking-intro";
  intro.textContent = `Pick a length and grab a time. I'm free ${b.availability}.`;
  slot.append(intro);

  const list = document.createElement("div");
  list.className = "booking-options";

  opts.forEach((o) => {
    if (o.url) {
      const a = document.createElement("a");
      a.className = "booking-option";
      a.href = o.url;
      a.rel = "noopener";
      if (o.recommended) a.dataset.recommended = "true";
      a.innerHTML =
        `<span class="booking-time">${o.label}</span>` +
        `<span class="booking-note">${o.note}</span>` +
        `<span class="booking-go" aria-hidden="true">Pick a time →</span>`;
      list.append(a);
    } else {
      // Not set up yet — say so rather than showing a dead choice.
      const d = document.createElement("div");
      d.className = "booking-option";
      d.dataset.pending = "true";
      d.innerHTML =
        `<span class="booking-time">${o.label}</span>` +
        `<span class="booking-note">${o.note}</span>` +
        `<span class="booking-go">Ask by email →</span>`;
      d.setAttribute("role", "link");
      d.tabIndex = 0;
      const go = () => (location.href = `mailto:therrance@thurrsolutions.com?subject=${encodeURIComponent(o.label + " consult")}`);
      d.addEventListener("click", go);
      d.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
      list.append(d);
    }
  });

  slot.append(list);
} else {
  // Nothing configured — the form collects the same three things.
  slot.hidden = true;
  form.hidden = false;
}
