/* ============================================================
   CONTENT — edit this file, not the markup.
   Adding a work item, swapping a photo, or changing a headline
   happens here. index.html renders whatever is in this object.

   Section order on the page is the Exit order. The rail numbers
   itself from `sections` below, so adding or reordering a section
   never leaves a stale number behind.
   ============================================================ */

export const content = {
  meta: {
    title: "Thurr Solutions, brand and web studio",
    description:
      "We build identity systems and the sites they live on, for owners who need it to sell rather than just look finished. Consult first: we find where the business is losing people, then design against that.",
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
      { label: "30 min", note: "Walk the lead route end to end. Most people pick this", url: "https://calendar.app.google/oeuhvW3zAonDHoC49", recommended: true },
      { label: "45 min", note: "Route plus scoping a build", url: null },
    ],
  },

  nav: {
    cta: "Book a consult",
    ctaHref: "/consult.html",
    links: [
      { label: "The route", href: "#route-sec" },
      { label: "Process", href: "#process" },
      { label: "Work", href: "#work" },
      { label: "Value", href: "#calc-sec" },
      { label: "Who", href: "#who" },
    ],
  },

  // 00 — THE HOOK. Says the category first, in the boilerplate's own words, so a
  // stranger knows what this company is before they know anything else.
  // `headline` is three lines because the mark sits inside line 2. Keep it to three.
  hero: {
    exit: "Thurr Solutions · brand, web and automation",
    headline: ["Direction,", "then", "design."],
    sub: "I build the brand, the site, and the systems behind it. You work with one operator start to finish, so there is no account manager and nothing gets handed to a junior.",
    meta: [
      { strong: "St. Louis", rest: "working nationwide" },
      { strong: "Consult first", rest: "no cost, no deck" },
      { strong: "You own it", rest: "source files, full rights" },
    ],
    cta: "Book a consult",
  },

  marquee: ["Thurr Solutions", "Direction, then design"],

  // 01 — THE ROUTE. The direction half, made concrete. A lead travels the stages
  // on scroll and stalls at follow-up — the page performing the diagnosis it sells.
  map: {
    exit: "The problem",
    headline: "Most of it looks finished and still doesn't sell.",
    sub: "A new logo, a new site, and three months later the same number of people are calling. The work wasn't bad, it just wasn't aimed at anything. So before anything gets drawn we find the leak: five places a business loses the people it already earned. Most owners can name theirs the moment they see the route drawn out, and that is the whole first conversation.",
    lens: "Three functions cover the route. Growth and marketing bring leads in, engineering makes sure none are dropped, sales turns them into booked work. One pipeline, not three departments.",
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
        leak: "The message arrives somewhere nobody is watching: a DM, a form, a missed call.",
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

  // 02 — HOW IT WORKS.
  process: {
    exit: "How it works",
    headline: "Consult first. Build second. Small on purpose.",
    note: "Four steps. Fixed scope.",
    steps: [
      {
        n: "01",
        name: "We talk",
        body: "Your current lead path, your response habits, your tools, and where automation should stay out of the way.",
        out: "Output: a read on the route\nCost: nothing",
      },
      {
        n: "02",
        name: "I map the leaks",
        body: "The route gets drawn: source, intake, follow-up, booked, report. Usually you spot it before I finish.",
        out: "Output: the route, drawn\nQuoted: before anything starts",
      },
      {
        n: "03",
        name: "I build the smallest fix",
        body: "Sometimes that's the identity and the site it lives on. Sometimes it's one narrow system behind them. Never a platform you didn't ask for.",
        out: "Output: the working thing\nPaid: one phase at a time",
      },
      {
        n: "04",
        name: "You own it",
        body: "Working system, plain-English notes, and an honest read on whether anything else is worth building.",
        out: "Output: files, rights, a walkthrough\nAfter: 30 days of fixes included",
      },
    ],
    honest:
      "If the route isn't worth building on yet, I'll tell you that on the call, before you spend anything.",
  },

  // 04 — THE MATH. Deliberately the visitor's own numbers, never a claimed result.
  // A figure I publish makes them evaluate me; a figure they build makes them
  // evaluate their own process, and nobody argues with their own arithmetic.
  calc: {
    exit: "The math",
    headline: "What manual work costs you",
    note: "Your numbers, your math",
    fields: [
      { id: "hrs", label: "Hours per week spent on the manual task", min: 1, max: 60, value: 12, unit: "hrs / week" },
      { id: "rate", label: "Loaded hourly cost of whoever does it", min: 15, max: 150, value: 42, unit: "$/hour", money: true },
      { id: "ppl", label: "People doing this task", min: 1, max: 20, value: 2, unit: "people", singular: "person" },
    ],
    hint: "Loaded cost means salary plus taxes, benefits and overhead. Usually 1.25 to 1.4 times base pay.",
    outLabel: "Annual cost of that task, today",
    splitA: "Hours per year",
    splitB: "If 70% of it is automated",
    disclaimer:
      "This is your arithmetic, not a claim about my results. I don't publish client savings figures. I show you the math and we test it against your real process on the call.",
  },

  // 03 — SELECTED WORK. Real artifacts only, labelled by what they are.
  // Nothing invented, nothing borrowed. Add new ones here.
  work: {
    exit: "Selected work",
    headline: "No borrowed logos. Here's what I've built.",
    note: "Client, in-house and product",
    items: [
      {
        title: "Listing film engine",
        client: "Real estate · listing marketing",
        kind: "Automation · Media",
        body: "A system that turns a folder of listing photos into a finished walkthrough film, a vertical social cut, and a print postcard. Built for one agent, reusable on every listing after.",
        year: "2026",
        status: "Live",
        tag: "Client work",
      },
      {
        title: "HeartPathBloom",
        client: "Nonprofit · story platform",
        kind: "Identity · Web app",
        body: "A full web app with a consent-gated story page, a complete brand system, and a publication workflow that cannot publish anything without written approval on file.",
        year: "2026",
        status: "Delivered",
        tag: "Client work",
      },
      {
        title: "Response-time audit",
        client: "Real estate · multi-agent firm",
        kind: "Internal tool",
        body: "A tool that measures how fast a team actually answers inbound leads, and shows the owner where the hours go. Hard-gated so sample data can never be sent as real.",
        year: "2026",
        status: "In progress",
        tag: "Client work",
      },
      {
        title: "Cinematic microsites",
        client: "In-house · niche concepts",
        kind: "Motion · Web",
        body: "Six scroll-driven sites in a day. Each wraps an eight-second film cut for that trade, and scroll position drives the video frame by frame, so the page plays as you read it. Concept footage, labelled as such on every page. A demo pretending to be somebody's real premises is worth less than one that admits what it is.",
        year: "2026",
        status: "Live",
        tag: "In-house",
      },
      {
        title: "Thurr Tag",
        client: "In-house product · Series 001",
        kind: "Product · Identity · Packaging",
        body: "Full-grain leather NFC tag. Concept through spec sheet, supplier RFQ, colorways and tooling. Product design, not just graphics.",
        year: "2026",
        status: "In production",
        tag: "In-house",
      },
      {
        title: "Thurr Solutions",
        client: "In-house · identity series 001",
        kind: "Brand identity",
        body: "The mark you've been following down the left edge of this page. A T that becomes an arrow: one continuous stroke, one direction. Shipped with the lockups, colour rules and guidelines written up as a system.",
        year: "2026",
        status: "Live",
        tag: "In-house",
      },
      {
        title: "Right Thurr",
        client: "In-house · personal brand",
        kind: "Brand identity",
        body: "Lifestyle brand built from the ground up. Hand-drawn banner mark, monogram, and a voice that carries across travel and event content. Deliberately the opposite register to this one.",
        year: "2025–26",
        status: "Live",
        tag: "In-house",
      },
    ],
    honest:
      "Work is labelled by what it is, client or in-house. In-house projects are my own and unpaid, built to the same standard. I'd rather show you real range than a wall of logos I didn't earn.",
  },

  // 05 — WHAT PROTECTS THE BUYER. Stands in for a wall of reviews I haven't earned yet.
  guarantee: {
    exit: "Your side of it",
    headline: "What you're protected by",
    note: "In place of a wall of reviews",
    items: [
      {
        name: "Paid in phases",
        body: "You pay one phase at a time. If the first one doesn't land, you keep what it produced and we stop there. No half up front on work you haven't seen.",
      },
      {
        name: "Fixed price, quoted first",
        body: "You get the number before anything starts and it doesn't move. Scope changes get quoted separately and you approve them before I touch anything.",
      },
      {
        name: "You own the files",
        body: "Source files, fonts licensed in your name, full rights. If you ever hire someone else, everything hands off clean. No hostage situations.",
      },
    ],
  },

  // 06 — WHO. Swap `photo` to a real path when the shoot happens.
  who: {
    exit: "Who you're hiring",
    name: "Therrance Carrothers",
    role: "Founder, Thurr Solutions",
    photo: null, // e.g. "assets/therrance.jpg" — placeholder renders until set
    body: [
      "You work with me directly. There's no account manager, no handoff to a junior, and no one on the call who wasn't in the build.",
      "When a project needs a specialist I don't happen to be, whether that's a particular kind of media work or a niche integration, I bring in someone I trust and stay accountable for the result. You get the range without paying for an agency's overhead.",
    ],
    pledge: "One person who knows your build, start to finish.",
  },

  // 07 — THE ASK.
  book: {
    exit: "Start here",
    headline: "Tell me where you're trying to go.",
    body: "We walk the route and find where it breaks. If there's something worth building, whether that's an identity, a site, or a system behind them, we scope it. If there isn't, you'll know that before spending a dollar.",
    cta: "Book a consult",
    ctaHref: "/consult.html",
    alt: "Or just write:",
    reassure: "No pitch deck. No retainer talk on the first call.",
  },

  footer: {
    // Boilerplate is fixed brand copy — see BrandKit/identity-series-001/brand-guidelines.md,
    // "Verbal identity". Reword it there first, not here.
    boiler:
      "Thurr Solutions is a brand and web studio. We build identity systems and the sites they live on, for owners who need to be clear about where they're going before they're loud about it.",
    line: "Thurr Solutions LLC",
    email: "therrance@thurrsolutions.com",
    note: "Consult-first. No guaranteed outcomes, just a clear route and an honest read.",
  },

  /* ============================================================
     PARKED 2026-08-18 — present in this file, NOT rendered.
     Cut in a design pass, with the reason recorded so the decision
     is reversible rather than lost. To restore one: re-add its
     <section> to index.html and its render block to main.js.

     · cost  — argued the same point the route section DEMONSTRATES,
               and its pull quote repeated the hero headline verbatim.
               Its best sentence was folded into `map.sub`.
     · range — the same six things `work` already lists, in category
               form. "Marketing that produces itself" and the Listing
               film engine card were near-identical sentences on one
               page. The section's own copy said "Not a menu" while
               being a menu. Specific beat categorical.
     · log   — four entries, three about this rebrand. A log that stops
               updating is worse than no log; park it until there is a
               publishing cadence to fill it.
     ============================================================ */
  parked: {
    cost: {
      exit: "The problem",
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

    range: {
      exit: "What I build",
      headline: "What I build.",
      sub: "Brand and websites are the spine of it. Everything under them exists because a client needed it. Every line below is something I have already built and can show you. Not a menu.",
      items: [
        {
          name: "Brand and identity",
          body: "Mark, wordmark, colour, type, and the rules that keep it consistent when someone else touches it. Built for HeartPathBloom, and for this company.",
        },
        {
          name: "Websites",
          body: "Sites that load fast, read clearly, and can be edited without a developer. This one is an example: the words live in a data file, not the markup.",
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
          body: "The systems behind all of it: automation, agents, and reporting that keep running when nobody is watching them.",
        },
      ],
      close:
        "Every one of these is quoted per project after the call, never by the hour. Most of it starts the same way: one conversation about where the business is actually losing people, then the smallest useful build.",
    },

    log: {
      exit: "Studio log",
      headline: "Studio log",
      note: "Updated as things ship",
      items: [
        { date: "Aug 2026", body: "Thurr Solutions moved to the dark plate. Archivo, Instrument Sans and JetBrains Mono, with the mark running the left edge as a progress rail. Site and digital card rebuilt as one system." },
        { date: "Aug 2026", body: "Thurr Tag Series 001: full-grain leather, gunmetal hardware, blind deboss. Spec sheet finished and out to suppliers." },
        { date: "Aug 2026", body: "Identity series 001 written up properly: construction grid, clearspace, contrast-checked colour tokens, and the reasoning behind rejecting a TS monogram." },
        { date: "Jul 2026", body: "HeartPathBloom story platform delivered. Consent-gated publishing, so nothing reaches the public page without written approval on file." },
      ],
    }
  },
};
