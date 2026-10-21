import { content as C } from "./content.js?v=6adf74713b31";

const $ = (s) => document.querySelector(s);
const b = C.booking || {};
const opts = b.options || [];
const availabilityNote = b.availability || "Choose a 30-minute time on the calendar, or email me to arrange a 15- or 45-minute call.";

// Configuration enhances the current static booking fallback.
const hint = $("#availability-hint");
if (hint) hint.textContent = availabilityNote;

const slot = $("#google-booking");
const form = $("#fallback-form");

// The parked form has no handler. Configuration must never expose it.
if (form) form.hidden = true;

if (slot && opts.length) {
  // Build the configured choices before replacing the usable static links.
  const fragment = document.createDocumentFragment();

  const intro = document.createElement("p");
  intro.className = "lede booking-intro";
  intro.textContent = availabilityNote;
  fragment.append(intro);

  const list = document.createElement("div");
  list.className = "booking-options";

  opts.forEach((o) => {
    const a = document.createElement("a");
    a.className = "booking-option";
    if (o.recommended) a.dataset.recommended = "true";
    if (o.url) {
      a.href = o.url;
      a.rel = "noopener";
      a.innerHTML =
        `<span class="booking-time">${o.label}</span>` +
        `<span class="booking-note">${o.note}</span>` +
        `<span class="booking-go" aria-hidden="true">Pick a time →</span>`;
    } else {
      a.href = `mailto:therrance@thurrsolutions.com?subject=${encodeURIComponent(o.label + " consult")}`;
      a.dataset.pending = "true";
      a.innerHTML =
        `<span class="booking-time">${o.label}</span>` +
        `<span class="booking-note">${o.note}</span>` +
        `<span class="booking-go">Ask by email →</span>`;
    }
    list.append(a);
  });

  fragment.append(list);
  slot.replaceChildren(fragment);
  slot.hidden = false;
}
