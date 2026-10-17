# HANDOFF

Session of 2026-10-14 to 2026-10-16. Only what was agreed or built in that session.

## Identity
- Portfolio of Ibrahim Al Hanif, video editor and motion designer in Garut, GMT+7. The site is also his first code sample.
- Idea: he writes a piece as lines before he cuts it. Headline: "I write the cut before I make it."
- Rules: `CLAUDE.md` + antislop 3.2.20 (mode DURING) + taste-skill v2 in `skills/design-taste-frontend`. Where they conflict, taste-skill wins on style.
- Nothing is invented. Unknown content stays a visible placeholder.
- His screen: 1920x1080 at 125% scaling, a viewport of about 1523x743 CSS px. Test there first.

## Stack and main files
- Tailwind CSS v4.3.3 with a CLI build: `npm run build` turns `src/input.css` into `assets/style.css` (git-ignored). Vanilla JS, no framework.
- `index.html` is the page. `src/input.css` holds the tokens, components and motion. `assets/js/main.js` is one IIFE with the `PROJECTS` config at the top.
- `DESIGN.md` holds the direction and its reasons, `DELIVERY-GATE.md` the verification report, `assets/credits.json` the picture licences.
- Agreed hosting: Cloudflare Pages + a public GitHub repo. He currently tests on an S3 website endpoint, which serves HTTP only.

## Design decisions
- Palette: ground `#0B0D10`, surface `#14181F`, ink `#F3F4F6`. Amber `#F5A524` (light `#9A5B00`) marks actions only. Controls `#5F6978` / `#82898F`. About is an inverted field.
- No borders, shadows, gradients, glass or monospace. Fonts: Newsreader (display) and Hanken Grotesk (text).
- Dark by default with a light toggle. The theme changes by a circular View Transition reveal, never a cross fade.
- The hero photo's height is solved from the screen height (`--hero-photo-max`), so photo and caption fit the first screen.
- The nav marks the current chapter through `aria-current` (ink + underline).
- Motion (MOTION 2): headings rise out of line masks, pictures open like a shutter, text rises a short way. Stagger runs per section, reveals start at the first visible pixel, and scrolling is never hijacked.
- Reduced motion, print, a missing script and scripts off all show the finished page.

## Done
- Page built, then rebuilt under taste-skill, with 6 real pictures. Each archive picture is credited and marked as not his work.
- Fixed this session: theme flicker, the 4-line headline, empty reserved video boxes, buttons that did not read as buttons (cursor and contrast), the missing section indicator, the hero cut off on his screen, and the scroll transitions.
- All eight projects in PROJECTS now have real YouTube videos and real titles (Kolega 76, Vertical short form, Geosac 2023-2024, A Token Of Appreciation, Qishatun Mumti'ah, Introducing BedulPeek, Two Different World Edits, Perumusan Dasar Negara Pancasila). Zero placeholders remain in the work section.
- Video card facades render the official video frame thumbnail behind the Play button with a 40% dark overlay.
- Desktop grid forms a balanced 4-row layout with zero empty cells across all rows.
- GitHub profile and repository links wired into `#contact` and `#capabilities` sections.
- Canonical URL and OpenGraph metadata updated to `https://mjarbi.my.id/`.
- Deployed and live via Cloudflare Pages on custom domain `https://mjarbi.my.id/`.
- Work availability updated across Hero, Capabilities, About, and Education to encompass full-time, part-time, contract, and remote/hybrid/on-site arrangements.
- Integrated Junior Software Engineer title and capabilities into Hero, Metadata, Capabilities, About, and Education sections alongside Multimedia Production.

## Not done (placeholders, line numbers as of 2026-10-17)
- `assets/js/main.js:37, 53, 69, 85`: `thumb: null`. Optional local asset override (defaults cleanly to official YouTube thumbnail).
- Ibrahim has not yet judged the transitions by eye after opening live site.

## Known bugs and limits
- Below 768px wide, the current-section mark only shows inside the opened menu.
- Below roughly 630px of viewport height, the 13rem photo floor pushes the hero caption below the first screen.
- `npx impeccable detect` reports 6 `cramped-padding` findings. All six were checked against the markup and are false positives.
- `assets/editing-studio.jpg` is an unused, rejected picture. The agent cannot delete files in this folder.
- The agent cannot write `CLAUDE.md`. Changes to it must be pasted by hand.
- The test harness and Chrome live in `/tmp` and are lost every session. The install recipe is in `DELIVERY-GATE.md`.

## Next task
Review the live website at https://mjarbi.my.id/ and check animations, transitions, and video embeds by eye.
