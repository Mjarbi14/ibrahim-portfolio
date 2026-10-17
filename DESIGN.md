# DESIGN.md

Design direction for Ibrahim Al Hanif's portfolio website.
Owner: Ibrahim Al Hanif. Compiled 2026-10-14 from his own decisions. The owner is the author of this direction; the agent only formatted it.

## Identity

A working multimedia producer's reel, not a startup landing page. The site is a gallery of finished video and design work, and the interface stays out of the way of the frames. Its character comes from the editing suite: a dark room, footage glowing on the monitor, one warm cue light for the controls.

The visitor is a recruiter or client skimming for evidence. He should see a thumbnail within the first screen and understand the offer within fifteen seconds.

## The idea

Added 2026-10-15, under taste-skill. The direction above says how the page is composed. This says what
makes it belong to Ibrahim and to nobody else. The earlier direction did not: "dark mode cinema for a
video editor" is true of every video editor's portfolio, which is the failure taste-skill exists to
catch.

**Inventory.** Things that belong to this subject and to no competitor. Every line is a verified fact,
nothing here is invented.

- He wrote the script for the Kolega 76 teaser first, then cut the footage to match the rhythm he had
  already written down.
- He reviews a cut frame by frame before anyone else sees it.
- He reviewed other people's work before publication, as chairperson of Rijaalul Ghad Mu'allimin.
- He moved from Creative Division staff to chairperson inside the same organisation: executing, then
  leading.
- Garut, West Java, on GMT+7.
- Adobe tools since 2018, starting as the student in a school organisation who got handed the footage.
- IELTS 6.5, and analytical English prose he writes himself.
- A school research paper on boom and crash behaviour in cryptocurrency markets from an Islamic
  perspective, accepted by his supervising teacher.
- Third place, International Robotic Games 2016, maze solving, junior category.
- 7th National Honorable Mention (Juara Harapan 7 Nasional), OPTIKA 23 Mathematics Olympiad, 2023.
- His work arrives in two shapes, 16:9 and 9:16.
- Admitted to Informatics at Universitas Padjadjaran through the national SNBT route, enrolled, then
  withdrew.
- Teaching himself programming and artificial intelligence; this website is his first code sample.

**The idea.**

> On this page, **the script he writes before touching any footage** becomes **the structure of the
> page itself: the writing comes first and is read as writing, and the work is shown as what that
> writing produced.**

**The competitor test.** Substitute another video editor: "On this page, the script they write before
touching any footage becomes the structure." For almost every editor the sentence collapses, because
there is no script of theirs; they are handed footage and asked to cut it. It holds for Ibrahim
because writing the thing first is how he actually works, and it is the one claim that joins his two
otherwise unrelated strengths, Adobe production and analytical English. The idea passes.

**The one live thing.** A visitor can step through the lines Ibrahim wrote for the Kolega 76 teaser
and see what each line became in the cut. It uses his own writing, it is one thing rather than a
playground, it works with a thumb, and it reads as plain text when JavaScript does not run. It needs
three or four real lines from his script, which only he has; until he sends them the section shows a
labelled empty state rather than invented lines (R-38, and his own standing rule).

## Dial

ENERGY 2 / RHYTHM 2 / MOTION 2

ENERGY 2 because the work supplies the brightness and the interface should not compete with it. RHYTHM 2 because the sections genuinely differ in content (video grid, capability pillars, timeline, contact) so they should differ in shape, while staying calm enough to read as one document. MOTION 2 is the dial's own definition of what the page now does: scroll reveals and transitions. It was 1 until 2026-10-15, became 2 with the circular theme reveal, and the scroll entrances added on 2026-10-16 sit inside the same band. It does not go to 3: nothing is pinned, nothing moves with the scroll position, nothing loops, and every part moves once and then stays still.

## Palette (R-29: 2 core + 1 accent)

Revised 2026-10-15 under taste-skill, which bans lines and shadows and so makes tone the only way a
surface is told apart from the ground.

Dark (default):

- Ground `#0B0D10`, the room with the lights down
- Surface `#14181F`, panels and tiles. **One tone step of 4.7 lightness points from the ground**,
  measured, inside the 2 to 6 points the rule allows. This is what replaced thirteen 1px borders.
- Ink `#F3F4F6`, muted `#9CA3AF` for secondary notes only
- Accent `#F5A524` projector amber, for actions only: the primary buttons and the focus ring. Under
  the pointer it lifts to `#FFD27A`.
- Control `#5F6978`, the resting fill of every secondary button: the theme toggle, the menu, the work
  filters. Added 2026-10-16 after Ibrahim reported he could not tell the theme toggle was a button.
  The surface tone could not do the job: a panel's 4.7-point step is 1.09:1 against the ground, and a
  control's edge is held to 3:1 by antislop-human. Measured: 3.50:1 against the ground, 3.20:1
  against the surface, ink text on it 5.05:1.
- Field `#EFEFEE` with ink `#16181C` and muted `#55606E`, for the one inverted section

Light:

- Ground `#F7F7F5`, surface `#FFFFFF`, a step of 3.5 points, also in range
- Ink `#16181C`, muted `#5A626E`
- Accent `#9A5B00`, a darkened amber, because one accent value cannot clear AA on both grounds. Under
  the pointer it deepens to `#663B00`.
- Control `#82898F`: 3.30:1 against the ground, 3.54:1 against the surface, ink text 5.01:1.
- Field `#14181F` with ink `#F3F4F6`, so the inverted section inverts in both themes

Status only: emerald `#10B981` dark, `#047857` light, for the availability indicator and nothing else.

**Controls and their states.** A secondary button rests on the control grey and, under the pointer,
takes the muted fill with ground-coloured text (a step of 2.19:1 in dark, 1.74:1 in light, with the text
inverting too). A pressed toggle, the selected work filter, is ink. It used to be the accent, but on
the grey resting fill an accent state differs from its neighbours mostly by hue, 2.57:1 in dark and
1.53:1 in light, which leaves anyone who cannot rely on hue unable to tell which filter is on; ink
differs by luminance alone, 5.05:1 and 5.01:1. A primary button changes fill under the pointer instead
of fading: the earlier `opacity: 0.9` was a step of 1.21:1 that moved the button toward the ground and
read as nothing. Every button shows a pointer cursor, which Tailwind v4's preflight no longer sets.

No borders anywhere. No shadows anywhere. Surfaces are separated by the tone step, by space, or by a
whole section changing its ground.

Measured with the antislop contrast checker, never estimated. Dark ground: ink 17.68:1, muted 7.66:1,
accent 9.53:1, status 7.67:1. Dark surface: ink 16.17:1, muted 7.01:1, accent 8.72:1. Light ground:
ink 16.57:1, muted 5.75:1, accent 5.06:1, status 5.11:1. Light surface: ink 17.77:1, muted 6.16:1,
accent 5.43:1. Light field: ink 15.45:1, muted 5.56:1, accent 4.72:1. The blueprint's original indigo
`#6366F1` measured 4.36:1 on the dark ground and was replaced for that reason.

Why amber: a warm yellow is the colour of a projector lamp and of the clip marker on an editing
timeline, so the accent comes from the subject rather than from a default palette, which is what the
colour reference asks for.

**One residual risk, recorded rather than hidden.** taste-skill fails a light yellow-cream ground
paired with a rust or burnt-orange accent, calling it the house look of AI assistants, and notes that
either half alone is suspect. Our amber sits at hue 37 and our light ground at hue 60 with 11.1%
saturation, so the ground is not in the saturated-cream family and the pair is not the banned
combination. A bone field at `#F2EFE9` was measured at hue 40 and 25.7% saturation, which would have
tripped it, and was replaced by the neutral `#EFEFEE` at 3.0% saturation. Since 2026-10-16 the
inspector runs here too, in a real browser, and it does not flag the palette.

## Typography

Revised 2026-10-15. Three faces became two, and both of the previous faces had to go: Space Grotesk
and Plus Jakarta Sans are named on taste-skill's own default-typeface list and on impeccable's
overused-font list, independently. Monospace is gone entirely, which removed nineteen findings.

- Display: **Newsreader**. An editorial serif built for screen reading. It carries the idea directly:
  the subject of this page is writing that precedes the cut, and a reading face says written where a
  geometric sans says software. Used for the headline and section headings only, never for body text,
  because it is drawn for large sizes.
- Text: **Hanken Grotesk**. Neutral and legible at 17 to 19px, which is where the body now sits. It
  carries every technical detail, every label and every paragraph.
- Numbers that need to align use `font-variant-numeric: tabular-nums` in the text face. That is what
  the monospace face was really being used for, and it is the correct tool for it.

Neither face appears on either tool's generic list. Instrument Serif was the first choice and was
dropped after reading the linter's own rule, which names it. That is worth recording: the pick that
felt distinctive was on the banned list, and only checking the source caught it.



## Layout decisions (R-31, one line each)

Revised 2026-10-15. The first five still hold; the rest are new and replace the border based surface
system.

- Asymmetric grid for the video work only, because the pieces genuinely come in two shapes (16:9 and 9:16) and the grid is the honest way to show both.
- Analytical and code-sample proof separated into a different composition, because filing them as equal tiles in the same grid would imply they carry the same weight as the videos.
- Capability pillars given unequal treatment: the multimedia pillar is full width, the other two are a list, because multimedia production is the evidenced strength and the other two support it.
- Photo appears once, in the about section, because the work is the subject of the page and a portrait in the hero would compete with it.
- No two neighbouring sections share a composition, because a page where every section is a title over a card grid reads as a template rather than a decision.
- The about section takes the whole page to the inverted field, because a section that changes its entire ground is the strongest separation available and it replaces dividers, cards and background decoration at once. It is also the one place the page becomes a printed page, which is the idea.
- One rest per page at most: every other screen carries a dominant thing and its content, because a mostly empty screen is an underbuilt section rather than a pause.
- The navigation is a plain bar with a wordmark, a few links and one action. No blur, no pill, no chrome.
- Running text sits in the full ink at 17px or more. Grey is for secondary notes only, because a page set in soft grey reads unfinished.
- On a wide screen the whole hero, photo and caption included, ends inside the first screen, because Ibrahim reported the photo cut off. Measured cause: his 1920x1080 display at 125% scaling leaves a viewport of about 1523x743 CSS pixels, every check had run at 1440x900, and the caption ended 158px below the first screen; only two of six common screen sizes fitted. The photo's height is now solved from the screen's height (`--hero-photo-max`), so it stays 5:4 where there is room and crops wider, toward a cinema frame, where there is not, with the crop held high enough to keep the volcano's peak. All seven sizes tested now fit with about 20px to spare. Phones keep the stacked order, photo after the button, because a phone screen cannot hold the headline, text, action, photo and caption at a readable size.
- The navigation marks the chapter on screen, because Ibrahim reported no sign of where he was on the page. The link for the current chapter is ink and underlined; the others rest in muted and rise to ink under the pointer, so "here" and "hovered" never look alike. Sections without a link of their own belong to the nearest one above them, so the marker never blinks out while they are read. The look is drawn from `aria-current`, so what a screen reader announces and what the eye sees are one value.

## Motion (R-19)

Rewritten 2026-10-16. Until this date the page was deliberately still apart from hover feedback and the
theme reveal; Ibrahim had chosen calm over taste-skill's motion requirement. He reversed that on
2026-10-16, asking for transitions while scrolling and moving between sections so the page feels
smoother and more solid. That is his decision and it is recorded below.

**What moves, and why each one exists.**

- **The signature: the headline's lines rise from behind their own baselines, in order, on load.**
  It is the one move allowed to be loud, and it says the page's idea without words: the lines come
  first. Section headings echo it at their own size, and the footer name closes with it.
- **Pictures open like a shutter from the top edge while settling from a 1.12 scale**, so a found
  photograph arrives as a frame being shown rather than a card fading in. The film negative band is
  the largest of these and is the page's one moving picture.
- **Text and list rows rise 24px and fade in**, row by row where they are a list. Parts of one section
  that arrive together are staggered 80ms apart in reading order, heading then text then picture.
- **Buttons give under the hand**: a 0.97 press, 140ms.
- **The work filter replays the entrance of the cards it brings in**, staggered 80ms apart and capped
  at five, so filtering reads as the grid rearranging rather than cells snapping into place. The card
  leaving `display:none` has no starting style to move from, so `main.js` commits the hidden state for
  one frame before adding `is-in`; without that the rise is skipped and the card only appears.
  Ibrahim approved this replay by eye on 2026-10-17 and asked to keep it.
- **The theme toggle reveals the new theme in a circle** from the button (see the theme notes below).

Three manners chosen by what is arriving, rather than one fade stamped on every block, which is the
motion tell taste-skill names first. Transform, opacity and clip-path only, so nothing forces layout.

**Where it departs from the skill's own recipe, and why.** The recipe reveals a part when it is 12%
above the bottom of the screen. Measured on this page, that left a band at the foot of every screen
where content sat hidden: a reader who stopped with a heading in it saw an empty gap, and the
inspector caught "Selected work" there at 390px with its text pushed out of its mask. Parts now arrive
from their first visible pixel. The stagger also counts within each section rather than across
everything that arrives at once, so after a long jump a heading leads its own section instead of
queueing behind the last rows of the one above.

**What never happens.** No scroll hijacking and no smooth-scroll library: the scroll is the browser's
own, which taste-skill's motion reference insists on because hijacked scrolling costs usability. No
parallax, no pinning, no loops, no pulse; the status dot does not pulse, because the state it marks is
static. No replay on scroll: a part that has arrived stays arrived, however far the reader scrolls
away and back. The one replay is the work filter's, described above, and it is a response to a press
rather than to scrolling. No colour transitions on buttons, because a
colour transition would still be running inside the theme reveal and fade a button's text through its
own background, the collapse the reveal exists to prevent.

**When it does not run.** Every rule that hides anything sits inside one media query, screen with no
reduced-motion preference. So someone who asked their system for reduced motion gets the finished
page at once; printing before scrolling prints everything; a page whose script fails to arrive never
hides anything below the hero, because the hidden state only exists under a class the script sets
after its observer exists; and with scripts off nothing is held at all. Each of these four paths was
loaded in a real browser and checked part by part.

**The theme reveal.** A 420ms circular reveal when the theme toggle is pressed. A circle grows out of
the toggle and the new theme appears inside it, so every pixel is either fully the old theme or fully
the new one and nothing is ever a blend of the two.

This arrived after two failed attempts, and the reason it is a reveal rather than a fade is worth
keeping. The first attempt cross faded `color` and `background-color` on the root and on every element
at once. That stutters, because an element which inherits its colour sees the inherited value move
every frame and restarts its own transition toward a target that is still moving; it stuttered on the
headings, which inherit, and not on the paragraphs, which carry an explicit colour class. The second
attempt fixed that by animating the colour variables on the root alone, putting the page on one clock.
It removed the stutter and exposed a worse problem underneath. The two themes are inversions, so a
blend between them drives the text and its background through mid grey at the same instant. Measured
at the halfway point on this palette: nav links fall to 1.00:1, which is to say the text and its
background become the same colour, the navbar buttons to 1.06:1, and the primary button to 1.14:1,
against the 4.5:1 that normal text requires. The text was not flickering, it was disappearing. Perfect
synchronisation is what made it worse, because it aligned the two crossings exactly. No cross fade can
avoid this between inverted themes, including a snapshot cross fade, so the fade was abandoned rather
than shortened. A reveal has no intermediate state to collapse. Reduced motion, and any browser
without the View Transitions API, get the theme change instantly.

## Theme

Dark by default, with a working light toggle. Dark is the right base because the site's subject is video work and footage reads better against a dark surround, which is the reason a screening room is dark. That is a subject-matter reason, not a preference for dark interfaces. The toggle ships fully working in both modes; a light mode that breaks is a defect (R-34).

## Decisions recorded under R-37

Where the original project blueprint collided with the antislop rules, the owner decided as follows.

1. Em dashes: removed. The agent rewrites the drafted copy using commas, colons, and parentheses (R-02).
2. Permanent dark theme: replaced with dark default plus a working light toggle (R-21).
3. Space Grotesk, Plus Jakarta Sans, JetBrains Mono: kept, with the reasons written above (R-06). *Superseded 2026-10-15: all three were on taste-skill's or impeccable's generic lists and were replaced; see Typography.*
4. Accent `#6366F1`: dropped, replaced with amber. It measured 4.36:1, below AA (R-01, R-25).
5. Bento grid: kept for the video work only, where the content sizes genuinely differ (R-05).
6. Three equal capability cards: replaced with one full-width pillar plus a list, so the hierarchy is visible (R-14).
7. Software logo strip: replaced with a plain text list of tools with no implied certification, because the agent cannot verify certification or proficiency claims and R-38 forbids content that looks verified without a source.
8. Contact form: deferred. Contact runs on a working copy-email button, WhatsApp, and LinkedIn. A form may be added later, at which point it must genuinely submit and carry empty, loading, and error states (R-26, R-27).
9. Profile photo: owner supplied a real portrait. It is placed as-is and never retouched, recoloured, or generated (R-23).
10. Motion on scroll: on 2026-10-15 the owner chose to keep the page still and override taste-skill's motion requirement. On 2026-10-16 he reversed that and asked for scroll and section transitions. The page now moves, within MOTION 2; see Motion.

## Stack and delivery

Owner's decisions, 2026-10-14.

- Tailwind CSS with a real build step, not the Play CDN, because the CDN prints a production warning, ships a compiler to every visitor, and can flash unstyled content on first paint. Tailwind v4 needs no config file, so the build is one CSS entry file and one CLI command.
- Hosting on Cloudflare Pages, connected to a public GitHub repository. The owner's domain is already managed in Cloudflare, so attaching it is a dropdown choice with no certificate step, and Cloudflare runs the build on every push so the owner never needs a terminal.
- The GitHub repository stays public because the site doubles as the owner's first code sample.
- Because the site uses Tailwind, the code-sample card must not claim plain hand-written CSS. It states what is actually true: built from scratch, no template and no site builder, with the framework named (R-36, C-5).

## Open items

- Two short films still have no title, and one competition has no name. These are `[FILM TITLE]` placeholders until the owner supplies them (R-38).
- No video embeds exist yet. Until YouTube IDs arrive, the work grid shows a clearly labelled placeholder state.
