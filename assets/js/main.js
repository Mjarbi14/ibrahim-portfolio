/* ==========================================================================
   EDIT HERE. Everything Ibrahim needs to change lives in this one block.

   youtubeId : the ID only, not the whole URL.
               https://youtu.be/dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
               Leave it as null and the card says the piece is not published
               yet rather than pretending a video exists.
   thumb     : path to an image in assets/. null falls back to a plain panel,
               never to a fake image.
   title     : [FILM TITLE] placeholders are shown to the visitor as
               placeholders on purpose. Replace them with the real titles.

   The script lines for the "Written first" section are NOT here. They live in
   index.html, inside #script-pairs, as a plain list. That is deliberate: the
   section has to read completely with no JavaScript, so the content belongs in
   the markup and this file only adds the stepping. The format is:

     <ol class="space-y-10">
       <li data-pair>
         <p class="font-display text-head">the line I wrote</p>
         <p class="mt-3 text-ink">what that line became in the cut</p>
       </li>
       ... two or more of these ...
     </ol>
   ========================================================================== */

const PROJECTS = [
  {
    id: "kolega76",
    type: "promotional",
    title: "Kolega 76 event teaser",
    role: "Scriptwriter and editor",
    tools: "Premiere Pro, After Effects",
    ratio: "16:9",
    featured: true,
    youtubeId: "NrlkYeNsPj0",
    thumb: null,
    summary:
      "I wrote the script for the Kolega 76 teaser, then cut the footage to the rhythm I had already written down.",
    problem:
      "The event needed a teaser that carried its theme in under a minute, against a fixed delivery date and a brief I did not write myself.",
    did:
      "I wrote the script first so the edit had a shape to follow, then cut the footage to that rhythm. Motion graphics and sound came last. I reviewed the cut frame by frame before it was published."
  },
  {
    id: "shortform",
    type: "shortform",
    title: "Vertical short form edits",
    role: "Editor and motion designer",
    tools: "Premiere Pro, After Effects",
    ratio: "9:16",
    youtubeId: "1H56ph_LsLQ",
    thumb: null,
    summary:
      "A set of vertical videos cut for social platforms, built around fast pacing and on screen text.",
    problem:
      "Vertical video competes with a scrolling thumb, so the opening has to carry the whole piece before the viewer decides.",
    did:
      "I cut to the beat of the audio, animated the captions by keyframe rather than dropping in an auto caption preset, and kept the typography consistent across the set so they read as one body of work."
  },
  {
    id: "competition-film",
    type: "narrative",
    title: "Geosac 2023-2024, competition short film",
    role: "Editor",
    tools: "Premiere Pro",
    ratio: "16:9",
    youtubeId: "eGKnKQxI5wI",
    thumb: null,
    summary:
      "A narrative short entered into a competition, cut for emotional pacing and scene continuity.",
    problem:
      "Turning a dramatic script into a continuous visual story while staying inside the competition's rules on duration and submission date.",
    did:
      "I ran the post production from assembly cut through dialogue timing, colour mood and the sound mix, watching continuity across every scene transition."
  },
  {
    id: "school-film",
    type: "narrative",
    title: "A Token Of Appreciation, school narrative short",
    role: "Post production editor",
    tools: "Premiere Pro",
    ratio: "16:9",
    youtubeId: "5ZrIEXEqPS0",
    thumb: null,
    summary:
      "A collaborative narrative short showing the full post production chain from raw takes to final cut.",
    problem:
      "Pulling footage from several takes and camera angles into one storyline, on a schedule set by the school term.",
    did:
      "I reviewed the raw takes, chose the strongest performances, synchronised the audio and structured the final cut so the story arc stayed readable."
  },
  {
    id: "qishatun-mumtiah",
    type: "narrative",
    wide: true,
    title: "Qishatun Mumti'ah, competition short film",
    role: "Editor and colorist",
    tools: "Premiere Pro, After Effects",
    ratio: "16:9",
    youtubeId: "R2mp2tVTp6M",
    thumb: null,
    summary:
      "A competition short film entered into Festival Kampus STAI Persis Garut 2022 by MA Persis Tarogong, weaving dialogue rhythm with narrative drama.",
    problem:
      "Maintaining clean pacing, scene continuity, and dialogue clarity across varied indoor and outdoor acoustics on a tight competition schedule.",
    did:
      "I crafted the assembly cut, refined actor dialogue timing, shaped the scene color grades, and polished audio transitions for the final festival master."
  },
  {
    id: "bedulpeek",
    type: "shortform",
    title: "Introducing BedulPeek, velocity edit",
    role: "Editor and sound designer",
    tools: "Premiere Pro, After Effects",
    ratio: "16:9",
    youtubeId: "ZH3ioLO_-AY",
    thumb: null,
    summary:
      "A high-velocity gaming montage cut to the transient beats of the soundtrack, featuring precise time remapping and multi-track audio design.",
    problem:
      "Synchronising fast gameplay cuts with music transients and sound effects without losing visual clarity or disorienting the viewer.",
    did:
      "I keyframed speed ramps for fluid velocity, designed custom sound effects to amplify in-game impacts, and color-matched clips for visual punch."
  }
];

/* ==========================================================================
   Below this line is behaviour. No content lives here.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const root = document.documentElement;

  /* ---------- theme ---------- */

  const themeBtn = $("#theme-toggle");
  const themeLabel = $("#theme-label");

  function paintThemeButton() {
    const isLight = root.classList.contains("light");
    themeLabel.textContent = isLight ? "Dark" : "Light";
    // No aria-pressed here, deliberately. The label is an action that changes
    // with the theme, and announcing "pressed" on top of a changing label
    // gives "Switch to the dark theme, pressed", which contradicts itself.
    themeBtn.setAttribute(
      "aria-label",
      isLight ? "Switch to the dark theme" : "Switch to the light theme"
    );
  }

  // Guarded the same way as the probe in <head>. Everything in this file sits
  // inside one IIFE, so an unguarded call here would take the menu, the filter
  // and the copy button down with it over one optional nicety.
  const reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  function applyTheme() {
    root.classList.toggle("light");
    try {
      localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
    } catch (e) {
      /* storage blocked: the choice still applies for this visit */
    }
    paintThemeButton();
  }

  function clearSwitchOrigin() {
    root.style.removeProperty("--switch-x");
    root.style.removeProperty("--switch-y");
    root.style.removeProperty("--switch-r");
  }

  themeBtn.addEventListener("click", function () {
    // The switch is revealed by a circle growing out of this button rather than
    // cross faded, because the two themes are inversions and any blend between
    // them makes text briefly invisible. See the comment in src/input.css.
    if (reduceMotion.matches || typeof document.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    const box = themeBtn.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    root.style.setProperty("--switch-x", x + "px");
    root.style.setProperty("--switch-y", y + "px");
    root.style.setProperty("--switch-r", radius + "px");

    const view = document.startViewTransition(applyTheme);
    // A second press while one reveal is running makes the browser skip the
    // first, which rejects `ready`. Swallowing it keeps the console clean.
    view.ready.catch(function () {});
    view.finished.then(clearSwitchOrigin, clearSwitchOrigin);
  });

  paintThemeButton();

  /* ---------- mobile menu ---------- */

  const menuBtn = $("#menu-toggle");
  const menu = $("#mobile-menu");

  function closeMenu() {
    menu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    const open = menu.classList.toggle("hidden") === false;
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  $$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.classList.contains("hidden")) closeMenu();
  });

  /* ---------- work grid ---------- */

  const grid = $("#work-grid");
  const emptyNote = $("#work-empty");

  // Placement worked out so no cell is left empty mid grid. At two columns the
  // featured piece takes the whole first row and the vertical piece takes two
  // rows in column one; at three columns the featured piece takes columns one
  // and two and the vertical piece takes column three across both rows. The
  // vertical piece spans rows because a 9:16 frame really is twice as tall.
  function cardMarkup(p) {
    const hasMedia = Boolean(p.youtubeId || p.thumb);

    let span = "";
    if (p.wide) span = "sm:col-span-1 lg:col-span-2";
    else if (p.featured) span = "sm:col-span-2 lg:col-span-2";
    else if (p.ratio === "9:16" && hasMedia) span = "sm:row-span-2 lg:row-span-2";

    const pad = p.ratio === "16:9" ? "56.25%" : "177.78%";

    let box = "";
    if (hasMedia) {
      const thumbUrl = p.thumb || (p.youtubeId ? `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg` : "");
      const previewImg = thumbUrl
        ? `<img src="${thumbUrl}" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover">
           <div class="absolute inset-0 bg-black/40"></div>`
        : "";

      const playBtn = p.youtubeId
        ? `<button type="button" class="play-video absolute inset-0 flex items-center justify-center tap" data-yt="${p.youtubeId}" aria-label="Play the video for ${p.title}">
             <span class="bg-accent px-6 py-4 font-display text-lead font-medium text-accent-ink transition-transform duration-200 hover:scale-105">Play</span>
           </button>`
        : "";

      box = `
        <div class="relative w-full overflow-hidden bg-bg" style="padding-bottom:${pad}">
          ${previewImg}
          ${playBtn}
          <span class="nums pointer-events-none absolute left-4 top-4 bg-bg px-3 py-1 text-small text-muted">${p.ratio}</span>
        </div>`;
    }

    const titleSize = p.featured ? "text-head" : "text-lead";
    // With no box to carry it, the shape goes on the credit line, where it is
    // information rather than a label floating in an empty frame.
    const meta = hasMedia
      ? `${p.role}. ${p.tools}.`
      : `${p.role}. ${p.tools}. ${p.ratio}. Not published yet.`;

    return `
      <article class="work-card ${span} flex flex-col bg-surface" data-type="${p.type}" data-reveal>
        ${box}
        <div class="flex flex-1 flex-col p-6 md:p-8">
          <h3 class="font-display ${titleSize} font-medium">${p.title}</h3>
          <p class="nums mt-2 text-small text-muted">${meta}</p>
          <p class="mt-5 text-ink">${p.summary}</p>
          <h4 class="mt-6 font-medium text-ink">The problem</h4>
          <p class="mt-2 text-ink">${p.problem}</p>
          <h4 class="mt-5 font-medium text-ink">What I did</h4>
          <p class="mt-2 text-ink">${p.did}</p>
        </div>
      </article>`;
  }

  grid.innerHTML = PROJECTS.map(cardMarkup).join("");

  /* ---------- filter ---------- */

  $$(".work-filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      // The filter already on would change nothing, so nothing should move.
      if (btn.getAttribute("aria-pressed") === "true") return;

      const want = btn.dataset.filter;

      $$(".work-filter").forEach(function (b) {
        // The look follows aria-pressed in the stylesheet, so the state a
        // screen reader announces and the state the eye sees are one value.
        b.setAttribute("aria-pressed", String(b === btn));
      });

      const arriving = [];
      $$(".work-card").forEach(function (card) {
        const match = want === "all" || card.dataset.type === want;
        card.classList.toggle("hidden", !match);
        if (match) arriving.push(card);
      });

      emptyNote.classList.toggle("hidden", arriving.length > 0);
      if (!arriving.length) arriving.push(emptyNote);

      // What the filter brings in replays the cards' scroll entrance, 80ms apart.
      // Without html.reveal nothing is ever hidden, so there is nothing to replay.
      if (!root.classList.contains("reveal")) return;
      arriving.forEach((el) => el.classList.remove("is-in"));
      // Commit the hidden state first: a card back from display:none has no
      // style to move from, so adding is-in in the same frame skips the rise.
      void document.body.offsetWidth;
      arriving.forEach(function (el, i) {
        el.style.setProperty("--d", Math.min(i, 5) * 80 + "ms");
        el.classList.add("is-in");
      });
    });
  });

  /* ---------- video facade ---------- */

  document.addEventListener("click", function (e) {
    const play = e.target.closest(".play-video");
    if (!play) return;

    const holder = play.parentElement;
    holder.innerHTML =
      '<p class="absolute inset-0 flex items-center justify-center text-small text-muted">Loading the player</p>';

    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + play.dataset.yt + "?autoplay=1&rel=0";
    frame.title = play.getAttribute("aria-label");
    frame.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
    frame.allowFullscreen = true;
    frame.className = "absolute inset-0 h-full w-full";
    frame.addEventListener("load", function () {
      const note = holder.querySelector("p");
      if (note) note.remove();
    });
    frame.addEventListener("error", function () {
      holder.innerHTML =
        '<p class="absolute inset-0 flex items-center justify-center p-5 text-center text-small text-muted">The player could not load. Check the connection, or open the video on YouTube.</p>';
    });
    holder.appendChild(frame);
  });

  /* ---------- the live thing: one script line at a time ----------
     Progressive enhancement. The pairs are already complete in the markup, so
     with no JavaScript the visitor reads the whole list. This turns that list
     into a stepper, and does nothing at all when there are fewer than two
     pairs, which is the case until Ibrahim adds the real lines. */

  const pairWrap = $("#script-pairs");
  const pairs = $$("[data-pair]", pairWrap);

  if (pairs.length > 1) {
    let at = 0;

    const pairData = pairs.map(function (li) {
      const quoteEl = li.querySelector(".font-display");
      const cutEl = li.querySelector(".mt-3");
      return {
        li: li,
        quoteEl: quoteEl,
        cutEl: cutEl,
        rawQuote: quoteEl ? quoteEl.textContent.trim() : ""
      };
    });

    let typeTimer = null;
    let finishTimer = null;

    function cancelTyping() {
      if (typeTimer) {
        clearTimeout(typeTimer);
        typeTimer = null;
      }
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
    }

    function renderFull(item) {
      if (!item) return;
      if (item.quoteEl) {
        item.quoteEl.textContent = item.rawQuote;
      }
      if (item.cutEl) {
        item.cutEl.style.opacity = "";
        item.cutEl.style.transition = "";
      }
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function typeQuote(item) {
      cancelTyping();

      if (reduceMotion.matches || !item || !item.quoteEl || !item.rawQuote) {
        renderFull(item);
        return;
      }

      const text = item.rawQuote;

      if (item.cutEl) {
        item.cutEl.style.opacity = "0";
        item.cutEl.style.transition = "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)";
      }

      let charIndex = 0;
      const speed = 16;

      function step() {
        charIndex++;
        const typed = text.slice(0, charIndex);
        const remaining = text.slice(charIndex);

        item.quoteEl.innerHTML =
          `<span>${escapeHtml(typed)}</span>` +
          `<span class="relative inline-block w-0" aria-hidden="true"><span class="absolute left-0 bottom-[0.1em] top-[0.15em] w-[2px] bg-accent"></span></span>` +
          `<span class="opacity-0 select-none pointer-events-none" aria-hidden="true">${escapeHtml(remaining)}</span>`;

        if (charIndex < text.length) {
          typeTimer = setTimeout(step, speed);
        } else {
          if (item.cutEl) {
            item.cutEl.style.opacity = "1";
          }
          finishTimer = setTimeout(function () {
            item.quoteEl.textContent = text;
          }, 500);
        }
      }

      step();
    }

    const controls = document.createElement("div");
    controls.className = "mt-8 flex items-center gap-4";
    controls.innerHTML = `
      <button type="button" id="pair-prev" class="btn tap px-5 py-3 font-medium">Previous line</button>
      <button type="button" id="pair-next" class="btn-primary tap px-5 py-3 font-medium">Next line</button>
      <p class="nums text-small text-muted" role="status" aria-live="polite" id="pair-count"></p>`;
    pairWrap.appendChild(controls);

    const prev = $("#pair-prev");
    const next = $("#pair-next");
    const count = $("#pair-count");

    function show(animate) {
      cancelTyping();
      pairs.forEach(function (el, i) {
        el.classList.toggle("hidden", i !== at);
        if (i !== at) {
          renderFull(pairData[i]);
        }
      });
      count.textContent = "Line " + (at + 1) + " of " + pairs.length;
      prev.disabled = at === 0;
      next.disabled = at === pairs.length - 1;
      // Dimmed when there is nowhere to go. The cursor rule in the stylesheet
      // also drops the hand on a disabled button, so it stops inviting a click.
      [prev, next].forEach((b) => b.classList.toggle("opacity-50", b.disabled));

      if (animate) {
        typeQuote(pairData[at]);
      } else {
        renderFull(pairData[at]);
      }
    }

    prev.addEventListener("click", function () {
      if (at > 0) { at--; show(true); }
    });
    next.addEventListener("click", function () {
      if (at < pairs.length - 1) { at++; show(true); }
    });

    show(false);
  }

  /* ---------- where am I: the nav marks the chapter on screen ----------
     Every section is a chapter, and the chapter is the last one whose top
     edge has passed a reading line a third of the way down the viewport.
     Sections without a nav entry of their own (the film negative band,
     capabilities, experience) belong to the nearest entry above them, so the
     marker stays put instead of blinking out while you read them. The hero
     belongs to nothing, so the top of the page marks nothing.

     The bottom of the page is forced to the last chapter, because a short
     final section can never reach the reading line on a tall screen and the
     marker would otherwise stay on the previous one.

     One scroll listener throttled to a frame, rather than an
     IntersectionObserver: the rule needs "the last section above a line",
     which is a comparison across all sections at once, and with nine sections
     reading their positions once a frame costs nothing. */

  const navLinks = $$(".nav-link");
  const chapters = $$("main > section").map(function (sec) {
    return { el: sec, href: sec.id && $('.nav-link[href="#' + sec.id + '"]') ? "#" + sec.id : null };
  });

  // Carry each nav entry forward over the sections that have none.
  let carried = null;
  chapters.forEach(function (c) {
    if (c.href) carried = c.href;
    else c.href = carried;
  });

  function currentChapter() {
    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      return chapters[chapters.length - 1].href;
    }
    const line = window.innerHeight / 3;
    let href = null;
    chapters.forEach(function (c) {
      if (c.el.getBoundingClientRect().top <= line) href = c.href;
    });
    return href;
  }

  let marked;
  function markChapter() {
    const href = currentChapter();
    if (href === marked) return;
    marked = href;
    navLinks.forEach(function (a) {
      if (a.getAttribute("href") === href) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  let frame = 0;
  window.addEventListener("scroll", function () {
    if (frame) return;
    frame = requestAnimationFrame(function () { frame = 0; markChapter(); });
  }, { passive: true });
  window.addEventListener("resize", markChapter);
  markChapter();

  /* ---------- copy email ---------- */

  const copyBtn = $("#copy-email");
  const copyStatus = $("#copy-status");
  const EMAIL = "ibrahimalhanif24@gmail.com";

  copyBtn.addEventListener("click", async function () {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const tmp = document.createElement("textarea");
        tmp.value = EMAIL;
        tmp.setAttribute("readonly", "");
        tmp.style.position = "absolute";
        tmp.style.left = "-9999px";
        document.body.appendChild(tmp);
        tmp.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(tmp);
        if (!ok) throw new Error("execCommand returned false");
      }
      copyStatus.textContent = "Copied. The address is on your clipboard.";
    } catch (err) {
      copyStatus.textContent =
        "Copying was blocked by the browser. The address is written above, select it by hand.";
    }
  });

  /* ---------- section entrances ----------
     Each part arrives once, as it reaches the reading area. Parts of the same
     section that arrive together are staggered by their order in it, 80ms
     apart, so a section reads heading, then text, then picture; a part that
     arrives alone moves at once instead of waiting its turn.

     Nothing is hidden until this has run: the stylesheet only hides parts
     under html.reveal, which is set below, after the observer exists. No
     script, no IntersectionObserver or a reduced-motion preference all leave
     the page complete and still. Parts already on screen at this moment are
     marked as arrived first, so they are never hidden and shown again.

     This sits after the work grid is built, so the injected cards are
     included, and nothing ever hijacks the scroll itself. */

  const parts = $$("[data-reveal]");

  if (parts.length && "IntersectionObserver" in window && !reduceMotion.matches) {
    const onScreen = function (el) {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.top < window.innerHeight && r.bottom > 0;
    };

    const io = new IntersectionObserver(function (entries) {
      // The stagger counts within each section, not across the batch. A long
      // jump (PageDown, a nav link) brings the tail of one section and the
      // head of the next in together; counted across the batch, the next
      // section's heading queued behind the previous section's last rows and
      // was still half inside its mask when the inspector measured it.
      const order = new Map();
      entries
        .filter((e) => e.isIntersecting)
        .map((e) => e.target)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach(function (el) {
          const chapter = el.closest("section, footer");
          const i = order.get(chapter) || 0;
          order.set(chapter, i + 1);
          el.style.setProperty("--d", Math.min(i, 5) * 80 + "ms");
          el.classList.add("is-in");
          io.unobserve(el);
        });
    }, { rootMargin: "0px", threshold: 0 });
    // Anything on screen is revealed, from its first pixel. The motion
    // reference's recipe waits until a part is 12% above the bottom edge, and
    // that left a band at the foot of every screen where content sat hidden:
    // a reader who stopped with a heading there saw an empty gap, and the
    // inspector caught "Selected work" in that band with its text pushed out
    // of its mask and over the paragraph below.

    parts.forEach(function (el) {
      if (onScreen(el)) el.classList.add("is-in");
      else io.observe(el);
    });
    root.classList.add("reveal");
  }

  /* ---------- footer year ---------- */

  $("#year").textContent = String(new Date().getFullYear());
})();
