import { content as C } from "./content.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

/* The mark, drawn from the identity's own path data. Stroke weight is 13 on the
   112 grid everywhere it appears — the guidelines forbid varying it, and the
   source zip drifted between 13 and 14 across instances. */
const MARK = (fill, head) => `
  <g stroke="${fill}" stroke-width="13" fill="none" stroke-linecap="butt">
    <path d="M18 22H86"/><path d="M52 22v36q0 26 28 26"/>
  </g>
  <path class="head" d="M74 71 102 84 74 97Z" fill="${head || fill}"/>`;

const markSvg = (fill, head, cls) => {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", "0 0 112 112");
  s.setAttribute("aria-hidden", "true");
  if (cls) s.setAttribute("class", cls);
  s.innerHTML = MARK(fill, head);
  return s;
};

/* ============================================================
   RENDER FROM content.js
   ============================================================ */

// nav
{
  const nav = $("#site-nav");
  const cta = $("#nav-cta");
  (C.nav.links || []).reverse().forEach((l) => {
    const a = el("a", "nav-link", l.label);
    a.href = l.href;
    nav.prepend(a);
  });
  cta.textContent = C.nav.cta;
  cta.href = C.nav.ctaHref;
}

// 00 hook — above the fold, never gated on motion
{
  const h = C.hero;
  $("#hero-exit").textContent = h.exit;

  // Three lines, mask-revealed one at a time. The mark rides line 2, which is
  // why the headline is authored as lines rather than one string.
  const head = $("#hero-headline");
  h.headline.forEach((line, i) => {
    const mask = el("span", "line-mask");
    const inner = el("span", i === 2 ? "thin" : null);
    if (i === 1) {
      inner.className = "arrowline";
      inner.append(document.createTextNode(line + " "));
      const s = markSvg("#D9552B");
      s.id = "hero-arrow";
      inner.append(s);
    } else {
      inner.textContent = line;
    }
    mask.append(inner);
    head.append(mask);
  });

  $("#hero-sub").textContent = h.sub;
  const cta = $("#hero-cta");
  cta.textContent = h.cta;
  cta.href = C.nav.ctaHref;
  cta.append(markSvg("#16150F"));

  const meta = $("#hero-meta");
  h.meta.forEach((m) => {
    const span = el("span");
    span.append(el("b", null, m.strong), document.createTextNode(" \u00b7 " + m.rest));
    meta.append(span);
  });
}

// marquee — the phrases doubled so the -50% translate loops seamlessly
{
  const track = $("#mq");
  const phrases = C.marquee;
  for (let pass = 0; pass < 2; pass++) {
    phrases.forEach((p) => {
      track.append(el("span", null, p));
      track.append(markSvg("#FAF9F5"));
    });
  }
}

// 01 the route
{
  const c = C.map;
  $("#route-sec .exit").textContent = c.exit;
  $("#route-sec .h2").textContent = c.headline;
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

// 02 process
{
  const c = C.process;
  $("#process .exit").textContent = c.exit;
  $("#process .h2").textContent = c.headline;
  $("#process .sec-note").textContent = c.note;
  const list = $("#steps");
  c.steps.forEach((st) => {
    const d = el("div", "step stag");
    d.append(el("span", "n", st.n), el("div", "name", st.name), el("p", "body", st.body));
    if (st.out) d.append(el("div", "step-out", st.out));
    list.append(d);
  });
  $(".honest").textContent = c.honest;
}

// 04 the math
{
  const c = C.calc;
  $("#calc-sec .exit").textContent = c.exit;
  $("#calc-sec .h2").textContent = c.headline;
  $("#calc-sec .sec-note").textContent = c.note;
  $("#calc-label").textContent = c.outLabel;
  $("#calc-split-a").textContent = c.splitA;
  $("#calc-split-b").textContent = c.splitB;
  $("#calc-disc").textContent = c.disclaimer;

  const box = $("#calc-inputs");
  c.fields.forEach((f) => {
    const label = el("label", "calc-field");
    label.append(el("span", null, f.label));
    const input = document.createElement("input");
    Object.assign(input, { type: "range", id: f.id, min: f.min, max: f.max, value: f.value, step: 1 });
    const out = document.createElement("output");
    out.id = f.id + "-out";
    out.setAttribute("for", f.id);
    label.append(input, out);
    box.append(label);
  });
  box.append(el("p", "calc-hint", c.hint));
}

// 03 selected work
{
  const c = C.work;
  $("#work .exit").textContent = c.exit;
  $("#work .h2").textContent = c.headline;
  $("#work .sec-note").textContent = c.note;
  const grid = $("#work-grid");
  c.items.forEach((p) => {
    const a = el("article", "proj stag");
    a.dataset.tag = p.tag;
    a.append(
      el("span", "badge", p.tag),
      el("div", "kind", p.kind),
      el("h3", "h3 title", p.title),
      el("div", "client", p.client),
      el("p", "body", p.body)
    );
    const foot = el("div", "proj-foot");
    foot.append(el("span", null, p.year), el("span", null, p.status));
    a.append(foot);
    grid.append(a);
  });
  $("#work-honest").textContent = c.honest;
}

// 05 guarantees
{
  const c = C.guarantee;
  $("#guarantee .exit").textContent = c.exit;
  $("#guarantee .h2").textContent = c.headline;
  $("#guarantee .sec-note").textContent = c.note;
  const box = $("#guar");
  c.items.forEach((g) => {
    const d = el("div", "g stag");
    d.append(markSvg("#D9552B"), el("div", "name", g.name), el("p", "body", g.body));
    box.append(d);
  });
}

// 06 who
{
  const c = C.who;
  $("#who .exit").textContent = c.exit;
  // An empty portrait plate is a grey box the visitor has to explain to themselves.
  // With no photo the section is simply one column of type, which reads as a choice.
  if (c.photo) {
    const port = el("div", "portrait r-fade");
    const img = new Image();
    img.src = c.photo;
    img.alt = c.name;
    port.append(img);
    const grid = $("#who-grid");
    grid.prepend(port);
    grid.dataset.photo = "true";
  }
  const body = $("#who-body");
  body.append(el("h2", "h2 r-fade", c.name), el("p", "caption r-fade", c.role));
  c.body.forEach((p) => {
    const n = el("p", "prose r-fade", p);
    n.style.marginTop = "var(--s4)";
    body.append(n);
  });
  body.append(el("p", "pledge r-fade", c.pledge));
}

// 07 book
{
  const c = C.book;
  $("#book .exit").textContent = c.exit;
  $("#book .display-sm").textContent = c.headline;
  $("#book-body").textContent = c.body;
  const cta = $("#book-cta");
  cta.textContent = c.cta;
  cta.href = c.ctaHref;
  cta.append(markSvg("#16150F"));

  const alt = $("#book-alt");
  alt.append(document.createTextNode(c.alt + " "));
  const mail = el("a", null, C.footer.email);
  mail.href = `mailto:${C.footer.email}`;
  alt.append(mail);

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

  const targets = $$(".r-fade, .stag");
  const revealAll = () => targets.forEach((n) => n.classList.add("in"));

  // Registered BEFORE the observer is constructed. If IntersectionObserver is
  // missing or throws, the catch reveals everything immediately — the reveal must
  // never be able to leave the page blank.
  if (!("IntersectionObserver" in window)) { revealAll(); } else try {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          // siblings stagger, so a row of cards arrives as a row and not at once
          const sibs = [...e.target.parentNode.children].filter((n) => n.classList.contains("stag"));
          const i = sibs.indexOf(e.target);
          if (i > 0) e.target.style.transitionDelay = `${i * 0.075}s`;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    targets.forEach((n) => io.observe(n));
    setTimeout(() => { if (!document.querySelector(".r-fade.in, .stag.in")) revealAll(); }, 2500);
  } catch { revealAll(); }

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

  /* ---------- the rail ----------
     One waypoint per section, placed proportionally, plus the mark riding
     down the gutter. Everything here is decorative and hidden under 900px. */
  const rail = $(".rail");
  const fill = $("#rail-fill");
  const mark = $("#rail-mark");
  const secs = $$("main > section[id]");
  const dots = [];

  if (rail && secs.length) {
    secs.forEach(() => {
      const d = el("span", "waypoint");
      rail.append(d);
      dots.push(d);
    });
    const place = () => {
      const docH = document.documentElement.scrollHeight;
      secs.forEach((s, i) => { dots[i].style.top = `${(s.offsetTop / docH) * 100}vh`; });
    };
    place();
    addEventListener("resize", place);

    let railTick = false;
    const railDraw = () => {
      railTick = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
      fill.style.height = `${p * 100}vh`;
      mark.style.top = `${p * (innerHeight - 90) + 45}px`;
      const mid = scrollY + innerHeight * 0.45;
      secs.forEach((s, i) => { dots[i].dataset.hit = mid >= s.offsetTop ? "true" : "false"; });
    };
    addEventListener("scroll", () => {
      if (!railTick) { railTick = true; requestAnimationFrame(railDraw); }
    }, { passive: true });
    addEventListener("resize", railDraw);
    railDraw();
  }
}

/* ============================================================
   THE CALCULATOR
   Runs whether or not motion is wanted — it is content, not decoration.
   Every figure here is the visitor's own input. Nothing is claimed.
   ============================================================ */
{
  const F = Object.fromEntries(C.calc.fields.map((f) => [f.id, f]));
  const hrs = $("#hrs"), rate = $("#rate"), ppl = $("#ppl");
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");

  if (hrs && rate && ppl) {
    const cur = { a: 0, h: 0, r: 0 };
    let tgt = { a: 0, h: 0, r: 0 }, raf = null, first = true;

    const paint = () => {
      $("#calc-annual").textContent = money(cur.a);
      $("#calc-hours").textContent = Math.round(cur.h).toLocaleString("en-US");
      $("#calc-reclaim").textContent = money(cur.r);
    };
    const step = () => {
      let done = true;
      for (const k of ["a", "h", "r"]) {
        const d = tgt[k] - cur[k];
        if (Math.abs(d) > 0.5) { cur[k] += d * 0.18; done = false; } else { cur[k] = tgt[k]; }
      }
      paint();
      raf = done ? null : requestAnimationFrame(step);
    };
    const calc = () => {
      const h = +hrs.value, r = +rate.value, p = +ppl.value;
      $("#hrs-out").textContent = `${h} ${F.hrs.unit}`;
      $("#rate-out").textContent = `$${r} / hour`;
      $("#ppl-out").textContent = `${p} ${p === 1 ? F.ppl.singular : F.ppl.unit}`;
      const hoursYr = h * p * 52;
      tgt = { a: hoursYr * r, h: hoursYr, r: hoursYr * r * 0.7 };
      // The first render lands on the real figure with no tween. rAF is paused in a
      // background tab, so tweening from zero on load can leave a visitor looking at
      // $0 — the number has to be true before it is ever animated.
      if (first || reduced) { first = false; Object.assign(cur, tgt); paint(); return; }
      if (!raf) raf = requestAnimationFrame(step);
    };
    [hrs, rate, ppl].forEach((n) => n.addEventListener("input", calc));
    calc();
  }
}

/* ============================================================
   THE ARROW FIELD
   Every glyph in the hero points at the cursor. It only works because the
   mark is a path with direction — a triangle could not do this. Decorative:
   skipped entirely under reduced motion, and paused off-screen and on a
   hidden tab so it costs nothing when nobody is looking at it.
   ============================================================ */
if (!reduced) {
  const c = $("#field");
  if (c) {
    const x = c.getContext("2d");
    const DPR = Math.min(devicePixelRatio || 1, 2);
    const CLAY = "217,85,43", PAPER = "250,249,245";
    let W = 0, H = 0, pts = [], mx = 0, my = 0, has = false, t = 0, raf = null;

    const build = () => {
      pts = [];
      const gap = W < 700 ? 52 : 46;
      const cols = Math.ceil(W / gap) + 1, rows = Math.ceil(H / gap) + 1;
      const ox = (W - (cols - 1) * gap) / 2, oy = (H - (rows - 1) * gap) / 2;
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
          pts.push({ x: ox + i * gap, y: oy + j * gap, a: Math.random() * 6.283 });
    };
    const size = () => {
      const r = c.getBoundingClientRect();
      W = r.width; H = r.height;
      c.width = W * DPR; c.height = H * DPR;
      x.setTransform(DPR, 0, 0, DPR, 0, 0);
      mx = W / 2; my = H / 2;
      build();
    };
    const glyph = (px, py, ang, s, col, al) => {
      x.save();
      x.translate(px, py); x.rotate(ang); x.scale(s, s);
      x.strokeStyle = `rgba(${col},${al})`;
      x.fillStyle = `rgba(${col},${al})`;
      x.lineWidth = 2.5; x.lineCap = "butt";
      x.beginPath(); x.moveTo(-6.5, 0); x.lineTo(2.6, 0); x.stroke();
      x.beginPath(); x.moveTo(1.8, -3.9); x.lineTo(7.4, 0); x.lineTo(1.8, 3.9); x.closePath(); x.fill();
      x.restore();
    };
    const frame = () => {
      t += 0.005;
      x.clearRect(0, 0, W, H);
      let tx = mx, ty = my;
      // no cursor yet (touch, or first load) — the target drifts on its own
      if (!has) { tx = W * 0.5 + Math.cos(t) * W * 0.3; ty = H * 0.5 + Math.sin(t * 1.5) * H * 0.3; }
      const maxd = Math.hypot(W, H) * 0.42;
      for (const p of pts) {
        const dx = tx - p.x, dy = ty - p.y;
        const d = Math.hypot(dx, dy);
        const ta = Math.atan2(dy, dx);
        // shortest-way turn, eased — glyphs swing round rather than snapping
        const df = ((ta - p.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        p.a += df * 0.085;
        const pr = Math.max(0, 1 - d / maxd);
        glyph(p.x, p.y, p.a, 0.8 + pr * 0.45, pr > 0.55 ? CLAY : PAPER, 0.055 + pr * 0.42);
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

    addEventListener("mousemove", (e) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; has = true;
    }, { passive: true });
    addEventListener("resize", size);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    // pause once the hero leaves the viewport — saves battery on a long page
    new IntersectionObserver((es) => (es[0].isIntersecting ? start() : stop()), { threshold: 0 })
      .observe(c.parentNode);

    size();
    start();
  }
}
