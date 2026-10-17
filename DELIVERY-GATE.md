# Delivery Gate report

Rebuilt 2026-10-15 under taste-skill v2 (`design-taste-frontend`), installed alongside antislop
3.2.20. Revised 2026-10-16 for controls, navigation, the first screen and motion. Mode: antislop
DURING.

**Verdict: clean on every gate that can run, for the first time.** `taste-skill/inspect.mjs`, in a
real browser at 1440, 768 and 390 pixels, reports **0 FAIL and 1 WARN**; the warning is the absent
video, which needs Ibrahim's upload. `taste-skill/lint.mjs` reports **0 FAIL, 0 WARN**. `npx
impeccable detect` reports the same 6 `cramped-padding` findings, all verified as detector false
positives (below). 90 assertions pass across four harnesses (62 and 13 in jsdom, 15 in Chrome), with
0 console messages and 0 unhandled rejections, plus a first-screen check at seven screen sizes and a
pixel comparison of every masked line.

## Round of 2026-10-16: four reports from Ibrahim, each measured before it was fixed

1. **"The dark mode button gives no sign it is a button on hover."** Measured in Chrome with a real
   pointer: the theme toggle's resting fill sat 1.09:1 from the dark ground and 1.07:1 from the light
   one, nothing changed on hover, and the cursor was the arrow. The cursor was the widest finding:
   Tailwind v4's preflight no longer gives buttons a pointer as v3 did, so every `<button>` on the
   page showed the arrow while every link showed a hand. Fixed with a control fill measured at 3.50:1
   and 3.30:1 against the grounds, a hover state that changes fill and inverts the text, a pointer on
   every enabled button, and a 0.97 press. The selected filter moved from the accent to ink, because
   against the grey an accent state differed from its neighbours by 2.57:1 and 1.53:1, mostly by hue;
   ink differs by 5.05:1 and 5.01:1. The primary buttons' hover went from `opacity: 0.9`, a step of
   1.21:1, to a real colour step of 1.43:1 and 1.77:1.
2. **"Nothing shows which section I am in."** The nav now marks the chapter on screen with ink and an
   underline, drawn from `aria-current`. Checked by scrolling a real browser to each chapter:
   written, work, about and contact were each marked in turn, the sections without a link of their own
   kept their parent marked, and the top of the page marked nothing.
3. **"The first photo and its caption are cut off when the page opens."** The cause was his screen,
   not the page's look: a 1920x1080 display at 125% scaling leaves about 1523x743 CSS pixels, worked
   out from his screenshot (a 1088px column measured 1360 screen pixels, a ratio of exactly 1.25), and
   every check had run at 1440x900. Measured at that size the caption ended **158px below the first
   screen**, and only two of six common sizes fitted. The photo's height is now solved from the
   screen's height. Measured after: **all seven sizes fit**, the caption ending 20px above the edge on
   the short ones as the arithmetic predicted (723 of 743 on his screen), and tall screens keep the
   uncropped 5:4 frame.
4. **"Add transitions when scrolling between sections."** This reverses his earlier choice to keep
   the page still, and is recorded as his decision in `DESIGN.md`. Built from taste-skill's motion
   reference: the headline's lines rise from behind their baselines on load, pictures open like a
   shutter, text and list rows rise in reading order. The inspector now counts **59 moving elements
   at 1440px, 61 at 768 and 53 at 390**, against a floor of 8, so the `still-page` FAIL that this
   report used to carry as a deliberate override is gone.

**Four defects of my own, found by measuring rather than looking:**

- **The masks widened the headline's leading.** Each line's mask has 0.15em of padding cancelled by
  an equal negative margin, but between two lines the two negative margins collapse into one rather
  than adding, which opened the leading by 0.15em. Found because the hero sat 17px lower than the
  arithmetic said. Fixed; the distance between the lines now measures 112.3px against 0.95 times
  118.2px.
- **The masks trimmed a letter.** A decoded pixel comparison of every masked line, with and without
  its mask, found 4 to 5 pixels missing from the left of the "b" that opens "before", at three widths.
  `overflow` clips both axes and the bowl overhangs its box. Fixed with room at the sides; all eight
  masked lines now lose **0 pixels**. My first version of this check compared PNG bytes, which is the
  wrong tool because identical pixels can encode differently, and it also read the wrong file. It was
  replaced, not trusted.
- **Content sat hidden at the foot of every screen.** The skill's recipe reveals a part 12% above the
  bottom edge. The inspector caught "Selected work" in that band at 390px, its text pushed out of its
  mask and over the paragraph below, and the same band would show any reader an empty gap. My first
  explanation, that the heading was queueing behind the previous section's stagger, was wrong; a
  replay of the inspector's exact steps showed the heading had not been revealed at all. Parts now
  arrive from their first visible pixel, and the stagger counts within each section as a separate
  improvement.
- **One of my own tests could not fail.** "Every button is wired" ended in `|| b.id === ''`, which is
  true for any button without an id, so it passed whatever the buttons did, the same kind of false
  pass as the `<br>` count before it. Rewritten to name each button, and proven by injecting a dead
  button into a copy of the page: the test now fails on it.

**The motion's fallbacks, each loaded in Chrome and checked part by part.** A normal visit: after
reading to the bottom, all 51 parts arrived and none was left hidden. Reduced motion: no observer, the
finished page within 60ms. The script failing to arrive: nothing below the hero was ever hidden.
Scripts off entirely: every part visible at once. Printing before scrolling: every part prints.

## The inspector, and what it caught that I had missed

Chrome was not available in this environment at first, so `inspect.mjs` could not run and the first
version of this report listed it as an open check. It runs now:
`npx @puppeteer/browsers install chrome@stable` fetches Chrome for Testing, one missing system
library (`libXdamage.so.1`) is extracted from a downloaded `.deb` with no root needed, and
`CHROME_PATH` plus `LD_LIBRARY_PATH` point the script at it. The script has to be run from a copy of
the project outside the connected folder, because it deletes its previous screenshots on each run and
`unlink` is not permitted there.

It immediately failed the page on three counts, two of which I had not seen:

1. **`headline-lines`.** The headline rendered on **four lines at 1440px**, at 128px and 8.9vw. Ibrahim
   spotted this himself from the live site before the inspector ran. **My own test had passed it**,
   because it counted `<br>` tags rather than rendered lines. That is a false pass, and the honest
   lesson is that a check which does not exercise the real mechanism produces confidence without
   evidence. The test now does the arithmetic from `copy.md`, reading the clamp out of the built CSS,
   and its numbers match the browser exactly: 33.3px at 390, 61.6px at 768, 112px at 1440. A
   regression run against the old clamp makes it fail, so it has teeth. It is still only a proxy: the
   original break happened because the headline sat in a 574px column, and the arithmetic assumes it
   spans the container. The inspector remains the authority.
2. **`eyebrow`.** The "Not published yet" label sat immediately above each card title and was read as
   a kicker. Moved into the credit line below the title.
3. **`still-page`.** Zero elements moved. Resolved 2026-10-16, see above.

Fixing the eyebrow then created a worse problem that only the screenshots revealed: with the label
gone, the reserved aspect-ratio boxes were completely empty, and the 9:16 box at 177% height left
roughly 700px of void with a ratio label floating in it. The box is now only rendered when there is
something to put in it, and the shape moved to the credit line. The same screenshots showed the
"Written first" section leaving half the container empty, so its heading and prose now sit in two
columns. Neither defect was visible in any source scan or DOM assertion; both were obvious in a
picture.

## The deliberate FAIL that no longer exists

Until 2026-10-16 the inspector measured **0 moving elements** and this report carried `still-page`
as a deliberate FAIL, because Ibrahim had chosen a calm page over taste-skill's motion requirement.
He reversed that choice on 2026-10-16 and the page now moves; the section is kept so the history of
the decision stays readable.

## What the two skills decided between them

They contradict each other in four places. Ibrahim ruled on each, and taste-skill won on style:

1. **Monospace.** antislop R-06 allows it with a written brand reason, and `DESIGN.md` had one.
   taste-skill bans it outright. Removed: 19 findings gone, and the aligned-number job it was really
   doing is now `font-variant-numeric: tabular-nums` in the text face, which is the correct tool.
2. **Thin rules.** antislop R-12 allows a 1px border as a surface marker, and that was this site's
   whole separation system. taste-skill bans every hairline. All 13 removed, replaced by a tone step
   measured at 4.7 lightness points (the rule allows 2 to 6) plus one section that takes the whole
   page to an inverted field.
3. **Motion.** taste-skill *requires* at least eight moving elements with staggered scroll entrances.
   antislop names a uniform version of that pattern as slop, and Ibrahim had just approved a
   near-static page, so on 2026-10-15 **he chose to keep it calm**. On 2026-10-16 **he reversed
   that** and asked for scroll transitions. They are built with three manners chosen by content, not
   one fade on every block, which satisfies both skills: taste-skill's count, and antislop R-19's
   requirement of a written purpose for each move.
4. **Invented sample content.** taste-skill expects sample details filled in so the design is seen at
   full density. antislop R-38 and Ibrahim's own standing rule forbid it. **Nothing is invented.**
   The two film titles stay as `[FILM TITLE]`, the unpublished pieces say so, and the live thing shows
   a labelled empty state instead of invented script lines.

## The idea, which is the deepest change

The previous direction was "dark mode cinema for a video editor". That is true of every video
editor's portfolio, so it failed taste-skill's competitor test. The page is now built on one fact
from Ibrahim's own history: he wrote the script for the Kolega 76 teaser first, then cut the footage
to the rhythm he had already written. The headline states it, a section is named for it, and the one
interactive thing on the page steps through his written lines beside what each became. Substitute
another editor into that sentence and it collapses, because they have no script of their own. Full
inventory and idea sentence are in `DESIGN.md`.

## Evidence

The Tailwind build runs clean (v4.3.3, 51ms, CSS down from 20,338 to 15,075 bytes after the borders
and the third typeface came out). The page is loaded into a real DOM (jsdom 30.1.2) and every control
is dispatched a real click or keypress with the resulting state asserted: 62 assertions in the main
harness, 13 in a harness that stubs the View Transitions API. A separate pass presses the theme
toggle 12 times with every other reveal made to skip the previous one, exercising the API's rejected
promise: 0 console messages, 0 unhandled rejections, root inline style left empty. Every colour pair
is measured with `skills/antislop-human/contrast-check.py`, never estimated.

Six of the main harness assertions check taste-skill's house rules against the **live DOM** rather
than the source, so the markup `main.js` injects is covered too: no border utility, no monospace, no
shadow, no backdrop blur, no uppercase tracked micro label, no decorative index numbering.

**The impeccable findings, checked rather than dismissed.** All six are `cramped-padding`. Each
flagged element was tested against the markup: five have their inset on the direct child (`px-5` on
the inner wrapper), and one, the capability panel, carries `p-8` on the element impeccable flagged.
The sixth, the film negative band, has an edge-to-edge image by design and a caption that carries
`px-5 py-5`. The detector stops one level below the element it names and does not follow into a
`<figure>`. No ignore rule was added: the findings are reported and answered rather than silenced.

## Block 1: Hard Gate

| Rule | Answer | Evidence |
|---|---|---|
| R-02 em dash | no | Automated scan of rendered text: 0 em dashes, 0 en dashes used as connectors. |
| R-03 mobile overflow | no | No fixed px widths, no `100vh`, no `whitespace-nowrap`, `break-all` on the address, `max-width:100%` on every image, three layout states per grid, 44px minimum touch area on all 7 controls. Confirmed by Ibrahim in Chrome's device toolbar before the rebuild; the rebuild removed elements rather than adding them, but see the open check at the end. |
| R-17 unsourced numbers | no | The only figures are 2018, IELTS 6.5 in 2025, third place PKP 2016, OPTIKA 2023, graduated May 2025. All from his own records. |
| R-18 fictional testimonials | no | There is no testimonials section, because there are no real testimonials. |
| R-23 assets invented | no | Six real pictures. One is his own portrait, placed unmodified. Five are archive photographs found with `assets.mjs` through Openverse, each downloaded into the project with its licence recorded in `assets/credits.json`. **Each was opened and looked at before use**, and one, an "Editing studio" photograph, was rejected after looking: a cluttered workbench with a cordless drill dominating the frame. Nothing was generated. |
| R-24 dead nav links | no | All five anchors (`#main #written #work #about #contact`) resolve to an element that exists. |
| R-25 contrast below AA | no | Dark ground: ink 17.68:1, muted 7.66:1, accent 9.53:1, status 7.67:1. Dark surface: 16.17, 7.01, 8.72. Light ground: 16.57, 5.75, 5.06, 5.11. Light surface: 17.77, 6.16, 5.43. Inverted field, dark theme: ink 15.45:1, muted 5.56:1, accent 4.72:1. Inverted field, light theme: ink 16.17:1, muted 7.01:1. The theme change passes through no intermediate state, so these hold throughout. |
| R-26 dead controls | no | 7 of 7 buttons wired, 14 of 14 links carry a real href, and the mail link carries a written subject. The dialog was removed entirely rather than left as a control that only revealed text. |
| R-27 missing states | no | Five states, all text first: filter empty state, "Not published yet" on unpublished pieces, player loading, player error, copy success, copy failure. |
| R-28 generic FAQ | no | There is no FAQ section. |
| R-32 keyboard | no | 0 occurrences of `outline:none` in the built CSS; the focus ring is a 3px accent outline clearing 3:1 on every ground. Escape closes the menu. The stepper is built from real buttons with a live-region counter and disabled end states. |
| R-33 patch scripts | no | Every feature is written in source. |
| R-34 a theme that breaks | no | Both themes fully measured, including the inverted field in both. Confirmed by Ibrahim in Chrome before the rebuild. |
| R-35 delivered unrun | no | Build run, 90 assertions passed, console clean, contrast measured, and **the page measured in a real browser at 1440, 768 and 390 pixels with the screenshots looked at**. The headline renders on two lines at all three widths (33.3px, 61.6px, 112px), both typefaces actually loaded (Hanken Grotesk 94%, Newsreader 6%), the page runs 9.9 screens with 1250 words and 6 images. Type sizes measured at exactly five (14 / 19 / 26 / 64 / 112), on the ceiling: a sixth came from one nav wordmark set in Tailwind's `text-lg`, which is not one of the scale steps, and it was moved onto the scale. |
| R-36 fabricated claims | no | No security, compliance or performance claim anywhere. |
| R-37 built without direction | no | `DESIGN.md` carries the direction, the inventory, the idea sentence, the competitor test, and a decision line for every conflict. |
| R-38 fabricated content | no | `[FILM TITLE]` appears to the visitor as a placeholder, unpublished pieces say so, the live thing is labelled a placeholder, the repository link is absent rather than faked, and each found picture carries a caption naming its source and licence. The archive manuscript carries an explicit "Not my manuscript" line in place, and the footer states that none of the archive photographs show his own work, equipment or clients. |

## taste-skill house rules

| Rule | Status |
|---|---|
| Headlines two lines or fewer | Pass. The headline is 32 characters across two lines, against taste-skill's 32-character guide. Section headings are single line. |
| Statements are paragraphs | Pass. The supporting line is a `<p>` at the lead size. |
| No eyebrows | Pass. Every kicker label was removed; the information moved into the heading or the first sentence. |
| No monospace | Pass. Removed entirely. |
| No index numbering | Pass. No element renders a bare `01`-style label. |
| No thin rules | Pass. All 13 removed. |
| No gradients | Pass. None, and none before. |
| No shadows at rest | Pass. None anywhere. |
| No assistant palette | Pass, with a note. The amber sits at hue 37 on a near-black ground, so it is not the banned light-cream-plus-rust pairing. A bone field at `#F2EFE9` measured hue 40 at 25.7% saturation and would have tripped it; it was replaced by `#EFEFEE` at 3.0%. |
| No tiny tracked caps | Pass. All 7 removed. |
| No icon cards, no identical card rows | Pass. The capability block is one full-width panel plus a pair, the contact section is one dominant action rather than three equal cards, and the credibility strip was removed. |
| No glass | Pass. The navbar is a plain bar. |
| No emoji | Pass. |
| No styled accent word in a headline | Pass. |
| Two typefaces at most | Pass. Three became two, and both of the previous faces were on the banned lists. |
| Four or more real pictures | Pass. Six, with credits. |
| One live thing | Built, currently empty. The stepper is in place and tested with injected pairs; it needs three or four real lines from his Kolega 76 script. |
| Motion layer, eight or more moving elements | Pass since 2026-10-16: 59 moving elements at 1440px, 61 at 768, 53 at 390. Until then a deliberate fail by Ibrahim's choice, which he reversed. |

## Block 3: Liveliness

| Check | Answer | Evidence |
|---|---|---|
| Dials declared | yes | ENERGY 2 / RHYTHM 2 / MOTION 2 in `DESIGN.md`. |
| Output matches the dials | yes | Nine sections, no two neighbours sharing a composition: type-dominant hero with one large picture, a type-only idea section, an asymmetric work grid, a full-bleed picture band, an unequal capability block, an inverted-field about section, three-column lists, a single-action contact block, a full-width name in the footer. |
| One focal point per screen | yes | Hero: the headline against the Garut photograph. Work: the featured card at double width. Capabilities: the full-width multimedia panel. Contact: the address at heading size. |
| Whitespace is structural | yes | Section padding steps from `py-20` to `py-28`, and sections separate by a change of ground rather than by a line. |
| One deliberate accent | yes | Amber marks actions only: the primary buttons, the next-line control and the focus ring. The selected filter moved to ink on 2026-10-16, because against the grey controls an amber state differed mostly by hue. Emerald marks only availability. |
| Identity motif | yes | The ratio chip on every piece of work, and the amber itself, which the page states is the colour of film negative rather than a brand colour. |
| Design Read declared | yes | Recorded in `DESIGN.md`. |

## Open checks for Ibrahim

**The motion, by eye.** Chrome runs here now and every frame was photographed, but whether the
entrances feel smooth and solid rather than busy is a judgement for the person who asked for them.
Scroll the page top to bottom once at your normal speed, and once with PageDown. If anything feels
slow, the durations live in one block of `src/input.css` and can be shortened together.

**Content that is still missing, and the one that matters.** Three or four real lines from the Kolega
76 script, which turn the empty live thing into the strongest thing on the page. At least one video
uploaded unlisted to YouTube with its ID pasted into the config block at the top of
`assets/js/main.js`. The two film titles and the competition name. The published repository URL. The
real domain, so `example.com` stops appearing in the canonical and Open Graph tags.

**One file to delete.** `assets/editing-studio.jpg` is the archive photograph I rejected after
looking at it. It is unused and uncredited on the page, but `rm` is not permitted in a connected
folder, so it has to go by hand.

## Block 2: Purpose-Gate

| Rule | Answer | Reason written down |
|---|---|---|
| R-01 gradient or glow as default | no | There is no gradient and no glow anywhere. The accent is a flat colour. |
| R-04 generic icons | no | There are no icons at all. Tool names are set as text, which also removes the implied certification that a row of Adobe logos would carry. |
| R-06 typeface without reason | no | All three previous faces were on a default roster, so all three were replaced. The two now in use are outside both tools' lists, each has one written job, and the reason for each is in `DESIGN.md`. The fixed-width face is gone, which also removed 19 lint findings. |
| R-07 background pattern | no | No grid, blueprint, dot pattern, or texture. |
| R-08 arrows on buttons | no | No arrow characters on any control. |
| R-09 decorative badges | no | One status indicator, and it marks a real state (open to contract work). No glow, no pulse, no uppercase. Nothing is parked above the H1. |
| R-10 glassmorphism | no | None. The header was the only glass element and taste-skill bans it outright, so it is now a plain bar. |
| R-12 shadow everywhere | no | No shadow anywhere. Surfaces separate by a tone step measured at 4.7 lightness points, and one section changes its whole ground. Borders are gone too. |
| R-13 glow | no | No glow anywhere. |
| R-14 identical cards | no | The capability pillars are deliberately unequal: multimedia production is full width because it is the evidenced strength, the other two sit in a narrower pair. |
| R-19 template animation | no | Each move has a written purpose in `DESIGN.md`, and there are three manners chosen by what arrives, not one preset: masked line rises for headings (the headline's is the signature), a shutter and settle for pictures, a short rise for text and list rows. No parallax, no pinning, no loop, no pulse, and no replay on scroll. The work filter does replay the entrance of the cards it brings in, 80ms apart and capped at five, as a response to a press rather than to scrolling; Ibrahim approved it by eye on 2026-10-17 and asked to keep it, and `DESIGN.md` records it as that one deliberate exception. This line was corrected the same day, when it still read "no replay" after that behaviour had shipped. MOTION 2 is the dial's own description of scroll reveals and transitions. Reduced motion, a failed script, scripts off and print each get the finished page, every path checked in Chrome. |
| R-22 generic illustrations | no | No illustration, no clipart, no abstract shape. Six real photographs: his own portrait plus five archive pictures of his world, each captioned with its source and licence and each looked at before use. |

## Block 4: Craftsmanship and Quality Locks

| Check | Answer | Evidence |
|---|---|---|
| C-1 any decision justified only as an AI default | no | Every colour, typeface, and layout decision carries a one line reason in `DESIGN.md`. |
| C-2 any control that does nothing | no | 7 of 7 buttons and 14 of 14 links verified. The dialog was deleted rather than kept as a control that only revealed text. |
| C-3 any section filling a template | no | No testimonials, no pricing, no FAQ, no logo bar, no newsletter, no "how it works". Nine sections, each from a claim with proof behind it, and the credibility strip was deleted because its content now sits in the hero and the capability block. |
| C-4 breaks in a state or without a mouse | no | Keyboard, states and both themes verified by assertion, and the rendered page checked at three widths in a real browser. |
| C-5 fabricated evidence | no | See R-17, R-18, R-36, R-38. |
| R-05 AI template layout | no | No bento mosaic as a default, no fake terminal, no three pricing columns, no four column footer. The work grid varies by cell size only because the pieces genuinely have two aspect ratios, and the placement was simulated at 1, 2, and 3 columns: zero empty cells anywhere, including mid grid. |
| R-11 everything pill shaped | no | No radius at all now. Every surface and control is square cornered, decided once, which is what 52% of the top-scored sites in taste-skill's study do. |
| R-15 generic CTA | no | Automated scan against both tools' lists: 0 hits. The CTAs are "See the work", "Copy the address", "Open it in your mail app", "Next line", "Play". |
| R-16 buzzwords | no | Automated scan over the full rendered text: 0 hits across the R-16 list and the Empty AI Vocabulary list. |
| R-20 generic with the name swapped | no | The page is built on one fact from his own history and the headline states it. Swap the name in and the claim stops being true, which is the competitor test in `DESIGN.md`. The accent is stated on the page as the colour of film negative rather than a brand colour. |
| R-21 dark forced without reason | no | Dark is justified by the subject matter in `DESIGN.md`, and a working light toggle ships anyway rather than being deferred. |
| R-29 palette over budget | no | One ground, one surface, one ink, one muted, one accent, plus an inverted field for a single section and emerald for the availability dot alone. |
| R-30 clone of a popular product | no | No reference to Linear, Vercel, Stripe, or Notion was used. |
| R-31 a decision with no one line reason | no | `DESIGN.md` carries a reason per decision, and the non obvious ones are repeated as comments in the source. |
