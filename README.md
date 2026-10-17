# Portfolio site, Ibrahim Al Hanif

A single page portfolio for a multimedia producer. Built from scratch with semantic HTML,
Tailwind CSS v4, and vanilla JavaScript. No template, no site builder, no component library.

Live site: https://mjarbi14.github.io/ibrahim-portfolio/

## Running it

```bash
npm install
npm run build     # writes assets/style.css
```

Then open `index.html`. For live rebuilding while editing, use `npm run dev`.

## Deploying

### Option 1: GitHub Pages (Automatic via GitHub Actions)
1. Push this repository to GitHub (`https://github.com/Mjarbi14/ibrahim-portfolio`).
2. Go to **Settings** > **Pages** in the GitHub repository.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds Tailwind CSS and deploys the site automatically.

### Option 2: Cloudflare Pages
1. Push this repository to GitHub.
2. In the Cloudflare dashboard, open Workers and Pages, create a Pages project, and connect this repository.
3. Build command: `npm run build`
4. Build output directory: `/`
5. After the first deploy, open Custom domains and add your custom domain.

## Adding your own videos and titles

Everything editable lives in one block at the top of `assets/js/main.js`.

- `youtubeId` takes the ID only, not the whole URL. From `https://youtu.be/dQw4w9WgXcQ` the ID is `dQw4w9WgXcQ`. Upload as **unlisted** so the video plays on the site without appearing on your channel.
- `thumb` takes a path such as `assets/img/kolega76.webp`. Leave it `null` and the card shows a plain "still to be published" panel rather than a fake image.
- `[FILM TITLE]` placeholders are shown to visitors as placeholders on purpose. Replace them with the real titles.

The player loads nothing until someone presses play, so an unopened page never contacts YouTube.

## Structure

```
index.html            the whole page
src/input.css         Tailwind entry, theme tokens, base styles
assets/js/main.js     project data at the top, behaviour below
assets/img/           portrait, and thumbnails once they exist
DESIGN.md             the design direction every choice answers to
DELIVERY-GATE.md      the verification report for the current build
```

## Accessibility and theming

Dark is the default because the site is a gallery of video work. A working light theme sits
behind the toggle in the header and is remembered between visits. Every text and background
pairing in both themes was measured rather than estimated; the numbers are recorded in
`DESIGN.md`. The focus ring is never removed, the dialog traps focus and closes on Escape,
and every control has a 44px minimum touch area.
