import { content as C } from "./content.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

/* ---------- render from content.js ---------- */

// 1 hook — above the fold, never gated on motion
$("#hook-kicker").textContent = C.hook.kicker;
$("#hook-headline").textContent = C.hook.headline;
$("#hook-sub").textContent = C.hook.sub;
$("#hook-cta").textContent = C.hook.cta;
$("#nav-cta").textContent = C.nav.cta;

// 2 cost
{
  const c = C.cost;
  $("#cost .h2").textContent = c.headline;
  const body = $("#cost-body");
  c.body.forEach((p) => body.append(el("p", null, p)));
  $("#cost .pull").textContent = c.stat.figure;
  $("#cost .pull-note").textContent = c.stat.note;
}

// 3 the route
{
  const c = C.map;
  $("#map .h2").textContent = c.headline;
  $("#map-sub").textContent = c.sub;
  if (c.lens) $("#map-lens").textContent = c.lens;
  const list = $("#stages");
  c.stages.forEach((st) => {
    const li = el("li", "stage");
    const head = el("div", "stage-head");
    head.append(el("span", "n", st.n), el("span", "name", st.name));
    if (st.fn) head.append(el("span", "fn", st.fn));
    li.append(head, el("p", "leak", st.leak));
    if (/follow/i.test(st.name)) li.dataset.leak = "true"; // where the story stalls
    list.append(li);
  });
}

// 4 process
{
  const c = C.process;
  $("#process .h2").textContent = c.headline;
  const list = $("#steps");
  c.steps.forEach((st, i) => {
    const li = el("li", "step");
    li.style.setProperty("--i", i);
    li.append(el("div", "n", st.n));
    const right = el("div");
    right.append(el("div", "name", st.name), el("p", "body", st.body));
    li.append(right);
    list.append(li);
  });
  $(".honest").textContent = c.honest;
}

// 5 proof
{
  const c = C.proof;
  $("#proof .h2").textContent = c.headline;
  $("#proof-sub").textContent = c.sub;
  const wrap = $("#proofs");
  c.items.forEach((p) => {
    const row = el("div", "proof");
    if (/^live$/i.test(p.status)) row.dataset.live = "true";
    const left = el("div");
    left.append(el("div", "title", p.title), el("div", "client", p.client));
    const right = el("div");
    right.append(el("p", "body", p.body), el("div", "status", p.status));
    row.append(left, right);
    wrap.append(row);
  });
}

// 5b range
{
  const c = C.range;
  $("#range .h2").textContent = c.headline;
  $("#range-sub").textContent = c.sub;
  const dl = $("#range-list");
  c.items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "range-row r-fade";
    const dt = el("dt", "range-name", it.name);
    const dd = el("dd", "range-body", it.body);
    row.append(dt, dd);
    dl.append(row);
  });
  $("#range .range-close").textContent = c.close;
}

// 6 who
{
  const c = C.who;
  const port = $("#portrait");
  if (c.photo) {
    const img = new Image();
    img.src = c.photo;
    img.alt = c.name;
    port.append(img);
  } else {
    port.append(el("div", "ph caption", "Portrait — set who.photo in content.js"));
  }
  const body = $("#who-body");
  const name = el("h2", "h2 r-fade", c.name);
  const role = el("p", "caption r-fade", c.role);
  role.style.marginTop = "var(--s1)";
  body.append(name, role);
  c.body.forEach((p) => {
    const n = el("p", "prose r-fade", p);
    n.style.marginTop = "var(--s4)";
    body.append(n);
  });
  body.append(el("p", "pledge r-fade", c.pledge));
}

// 7 book
{
  const c = C.book;
  $("#book .display-sm").textContent = c.headline;
  $("#book-body").textContent = c.body;
  const cta = $("#book-cta");
  cta.textContent = c.cta;
  cta.href = c.ctaHref;
  $("#book .reassure").textContent = c.reassure;
}

// footer
{
  const f = C.footer;
  $("#f-boiler").textContent = f.boiler;
  $("#f-line").textContent = f.line;
  const mail = $("#f-email");
  mail.textContent = f.email;
  mail.href = `mailto:${f.email}`;
  $("#f-note").textContent = f.note;
}

/* ============================================================
   MOTION
   `.motion` lands only when the script is alive AND motion is wanted.
   If this file fails, the class never appears and every section
   renders at full opacity. A scroll effect must never be able to
   ship a blank page.
   ============================================================ */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  document.documentElement.classList.add("motion");

  const targets = $$(".r-fade, .step, .proof");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );
  targets.forEach((n) => io.observe(n));

  setTimeout(() => {
    if (!document.querySelector(".r-fade.in")) targets.forEach((n) => n.classList.add("in"));
  }, 2500);

  /* ---------- signature interaction ----------
     A lead travels the route as you scroll and STALLS at follow-up:
     the page demonstrating the diagnosis it sells. Only `top` on one
     11px dot changes, so there is nothing expensive to paint. */
  const route = $("#route");
  const dot = $("#dot");
  const label = $("#dot-label");
  const stages = $$(".stage");

  if (route && dot && stages.length) {
    const STALL_AT = Math.max(0, stages.findIndex((s) => s.dataset.leak === "true"));
    const perStage = 1 / stages.length;
    const stallStart = (STALL_AT + 0.45) * perStage;
    const stallLen = perStage * 0.75;
    const stallEnd = stallStart + stallLen;

    let ticking = false;
    const draw = () => {
      ticking = false;
      const r = route.getBoundingClientRect();
      // 0 when the route's top reaches 80% viewport height, 1 once its
      // bottom has passed the same line — so the lead completes the route.
      let p = (innerHeight * 0.8 - r.top) / Math.max(1, r.height);
      p = Math.min(1, Math.max(0, p));

      // hold position through the stall window, then resume
      let eased = p < stallStart ? p : p < stallEnd ? stallStart : p - stallLen;
      eased = Math.min(1, Math.max(0, eased / (1 - stallLen)));
      dot.style.top = `${eased * 100}%`;

      const stalled = p >= stallStart && p < stallEnd;
      dot.dataset.stalled = stalled ? "true" : "false";
      if (stalled && label.textContent !== "still waiting") label.textContent = "still waiting";

      const reached = Math.max(1, Math.round(eased * stages.length));
      stages.forEach((s, i) => (s.dataset.seen = i < reached ? "true" : "false"));
    };

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(draw); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    draw();

    // frozen frames (background tab) must not leave stages dimmed forever
    setTimeout(() => {
      if (!document.querySelector('.stage[data-seen="true"]')) {
        stages.forEach((s) => (s.dataset.seen = "true"));
      }
    }, 2500);
  }

  // progress rail — transform only
  const rail = $("#rail");
  let railTick = false;
  const railDraw = () => {
    railTick = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    rail.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", () => {
    if (!railTick) { railTick = true; requestAnimationFrame(railDraw); }
  }, { passive: true });
  railDraw();
}
