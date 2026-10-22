# scarloser.org

The source code of my personal website: a small terminal-style landing page with an about page, my tech stack, and a few tools.

**Live:** https://scarloser.org

## Features

- Terminal intro on the home page with a typing animation
- Live Discord avatar and Spotify "listening to" status via [Lanyard](https://github.com/Phineas/lanyard)
- Light, dark and system theme
- Tech stack overview with Discord server cards
- Aliucord theme converter (`/convert`)
- 88x31 button wall

## Project structure

```
.
├── index.html          home
├── about/              about page
├── tech/               tech stack
├── convert/            Aliucord theme converter
├── 404.html
├── css/site.css        custom styles (terminal, project cards, tags)
├── js/
│   ├── terminal.js         typing animation on the home page
│   ├── now-playing.js      Discord avatar + Spotify status
│   ├── theme-toggle.js     light / dark / system switch
│   ├── discord-invites.js  server cards on /tech
│   └── convert.js          theme converter logic
├── assets/             icons, flags, tech stack logos
├── fonts/              Inter (subset)
└── _astro/             bundled CSS/JS and images from the Astro build
```

## Run locally

The site is static, so any file server works:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Hosted on Cloudflare Pages. Connect the repo, leave the build command empty and set the output directory to `/`.

## Credits

This site is based on [vendicated.dev](https://github.com/Vendicated/vendicated.dev) by [Vendicated](https://github.com/Vendicated). The layout, the Astro setup and many of the components come from there. Thanks for making it open source!

## License

Like the original, this project is licensed under the [GNU AGPL-3.0](LICENSE).
