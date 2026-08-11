/* ============================================================
   CONTENT — edit this file, not the markup.
   Adding a proof item, swapping a photo, or changing a headline
   happens here. index.html renders whatever is in this object.
   ============================================================ */

export const content = {
  meta: {
    title: "Thurr Solutions — leads stop leaking between the text and the booking",
    description:
      "Consult-first build partner for local service businesses. I map where leads slip between first contact and booked appointment, then build the smallest system that fixes it.",
    url: "https://thurrsolutions.com",
  },

  // BOOKING
  // Google appointment schedules support ONE duration each — there is no way to
  // offer three lengths inside a single schedule. So: three schedules, three links,
  // one page. Paste each link below as you create it. Any that are still null fall
  // back to the form, so this works half-configured too.
  booking: {
    availability: "9am to 9pm Central, any day",
    options: [
      { label: "15 min", note: "A quick question or a gut check", url: null },
      { label: "30 min", note: "Walk the lead route end to end — most people pick this", url: "https://calendar.app.google/oeuhvW3zAonDHoC49", recommended: true },
      { label: "45 min", note: "Route plus scoping a build", url: null },
    ],
  },

  nav: {
    cta: "Book a consult",
    ctaHref: "/consult.html",
  },

  // 1 — THE HOOK. Says the category first, in the boilerplate's own words, so a
  // stranger knows what this company is before they know anything else.
  hook: {
    // No forced break — `text-wrap: balance` splits this better at every width
    // than a hard \n, which orphaned "Brands, and" on a phone.
    headline: "Brands, and the sites they live on.",
    kicker: "Thurr Solutions",  // the ONE kicker on the page — brand, not scaffolding
    sub: "Built for owners who need it to sell, not just look finished. The work starts by finding where you're losing people — then designing against that.",
    cta: "Book a consult",
  },

  // 2 — THE COST. Why most brand and web work disappoints, and the promise that
  // fixes it. This is where the tagline earns its place — marketing copy, not the
  // lockup, per the brand guidelines.
  cost: {
    headline: "Most of it looks finished and still doesn't sell.",
    body: [
      "A new logo, a new site, and three months later the same number of people are calling. The work wasn't bad. It just wasn't aimed at anything.",
      "Design decides how a thing looks. It can't decide what you're selling, who you're selling it to, or which step is quietly losing them. That gets settled first, or it gets settled by accident.",
    ],
    stat: {
      figure: "Direction, then design.",
      note: "In that order. The second part gets easy once the first one is settled.",
    },
  },

  // 3 — THE MAP. The direction half, made concrete. Revealed one stage at a time
  // on scroll — this is the signature interaction and the differentiator.
  map: {
    headline: "Before anything gets drawn, we find the leak.",
    sub: "Five places a business loses the people it already earned. Most owners can name theirs the moment they see the route drawn out — and that is the whole first conversation.",
    lens: "Three functions cover the route — growth and marketing bring leads in, engineering makes sure none are dropped, sales turns them into booked work. One pipeline, not three departments.",
    stages: [
      {
        n: "01",
        name: "Lead source",
        fn: "Growth & marketing",
        leak: "You don't know which ads, posts, or referrals actually produced the call.",
      },
      {
        n: "02",
        name: "Intake",
        fn: "Engineering",
        leak: "The message arrives somewhere nobody is watching — a DM, a form, a missed call.",
      },
      {
        n: "03",
        name: "Follow-up",
        fn: "Engineering",
        leak: "The first reply takes hours. By then they've moved on.",
      },
      {
        n: "04",
        name: "Booked",
        fn: "Sales",
        leak: "Interested people never get an actual time on an actual calendar.",
      },
      {
        n: "05",
        name: "Report",
        fn: "Sales",
        leak: "You can't see which step lost them, so next month you guess again.",
      },
    ],
  },

  // 4 — WHAT I DO.
  process: {
    headline: "Consult first. Build second. Small on purpose.",
    steps: [
      {
        n: "01",
        name: "We talk",
        body: "Your current lead path, your response habits, your tools — and where automation should stay out of the way.",
      },
      {
        n: "02",
        name: "I map the leaks",
        body: "The route gets drawn: source, intake, follow-up, booked, report. Usually you spot it before I finish.",
      },
      {
        n: "03",
        name: "I build the smallest fix",
        body: "Sometimes that's the identity and the site it lives on. Sometimes it's one narrow system behind them. Never a platform you didn't ask for.",
      },
      {
        n: "04",
        name: "You own it",
        body: "Working system, plain-English notes, and an honest read on whether anything else is worth building.",
      },
    ],
    honest:
      "If the route isn't worth building on yet, I'll tell you that on the call — before you spend anything.",
  },

  // 5 — PROOF. Real artifacts. Add new ones here.
  proof: {
    headline: "No borrowed logos. Here's what I've built.",
    sub: "Real projects, described plainly. Some are live, some are in progress — labelled either way.",
    items: [
      {
        client: "Real estate — listing marketing",
        title: "Listing film engine",
        body: "A system that turns a folder of listing photos into a finished walkthrough film, a vertical social cut, and a print postcard. Built for one agent, reusable for any listing.",
        status: "Live",
      },
      {
        client: "Nonprofit — HeartPathBloom",
        title: "Story platform and brand system",
        body: "A full web app with a consent-gated story page, a complete brand system, and a publication workflow that cannot publish anything without written approval on file.",
        status: "Delivered",
      },
      {
        client: "Real estate — multi-agent firm",
        title: "Response-time audit",
        body: "A tool that measures how fast a team actually answers inbound leads, and shows the owner where the hours go. Tested, with a hard gate so no sample data can ever be sent as real.",
        status: "In progress",
      },
    ],
  },

  // 5b — RANGE. Shown through what exists, not claimed as a services list.
  range: {
    headline: "What I build.",
    sub: "Brand and websites are the spine of it. Everything under them exists because a client needed it. Every line below is something I have already built and can show you — not a menu.",
    items: [
      {
        name: "Brand and identity",
        body: "Mark, wordmark, colour, type, and the rules that keep it consistent when someone else touches it. Built for HeartPathBloom, and for this company.",
      },
      {
        name: "Websites",
        body: "Sites that load fast, read clearly, and can be edited without a developer. This one is an example — the words live in a data file, not the markup.",
      },
      {
        name: "Marketing that produces itself",
        body: "A folder of listing photos becomes a walkthrough film, a vertical social cut, and a print postcard. Built once, reusable on every listing after.",
      },
      {
        name: "Lead generation",
        body: "Local prospect lists pulled, filtered against a real ideal-customer profile, and handed over outreach-ready instead of as a raw scrape.",
      },
      {
        name: "Internal tools",
        body: "Small software that answers a question the owner keeps asking. The response-time audit measures how fast a team actually replies, and where the hours go.",
      },
      {
        name: "Leverage",
        body: "The systems behind all of it — automation, agents, and reporting that keep running when nobody is watching them.",
      },
    ],
    close:
      "Most of it starts the same way: one call about where the business is actually losing people, then the smallest useful build.",
  },

  // 6 — WHO. Swap `photo` to a real path when the shoot happens.
  who: {
    name: "Therrance Carrothers",
    role: "Founder, Thurr Solutions",
    photo: null, // e.g. "assets/therrance.jpg" — placeholder renders until set
    body: [
      "You work with me directly. There's no account manager, no handoff to a junior, and no one on the call who wasn't in the build.",
      "When a project needs a specialist I don't happen to be — a particular kind of media work, a niche integration — I bring in someone I trust and stay accountable for the result. You get the range without paying for an agency's overhead.",
    ],
    pledge: "One person who knows your build, start to finish.",
  },

  // 7 — THE ASK.
  book: {
    headline: "Start with one call.",
    body: "We walk the route and find where it breaks. If there's something worth building — an identity, a site, a system behind them — we scope it. If there isn't, you'll know that before spending a dollar.",
    cta: "Book a consult",
    ctaHref: "/consult.html",
    reassure: "No pitch deck. No retainer talk on the first call.",
  },

  footer: {
    // Boilerplate is fixed brand copy — see BrandKit/identity-series-001/brand-guidelines.md,
    // "Verbal identity". Reword it there first, not here.
    boiler:
      "Thurr Solutions is a brand and web studio. We build identity systems and the sites they live on, for owners who need to be clear about where they're going before they're loud about it.",
    line: "Thurr Solutions LLC",
    email: "therrance@thurrsolutions.com",
    note: "Consult-first. No guaranteed outcomes — just a clear route and an honest read.",
  },
};
