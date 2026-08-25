# HeartScript - Interactive Love Letter PWA

<!-- MIT License -->

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

<!-- Demo Live Link -->

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-brightgreen)](https://md-abu-kayser.github.io/heartscript/)

<!-- HTML & CSS -->

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<!-- Styling / PostCSS -->

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/docs/)
[![PostCSS](https://img.shields.io/badge/PostCSS-efefef?logo=postcss\&logoColor=black)](https://postcss.org/)
[![daisyUI](https://img.shields.io/badge/daisyUI-5A0EF8?logo=tailwindcss\&logoColor=white)](https://daisyui.com/)

<!-- Fonts & Icons -->

[![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?logo=google\&logoColor=white)](https://fonts.google.com/)
[![Heroicons](https://img.shields.io/badge/Heroicons-0EA5E9?logo=heroicons\&logoColor=white)](https://heroicons.com/)

<!-- Languages & Web Standards -->

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

Tiny, dependency-free progressive web app that renders playful, animated "love letters" as interactive heart visuals. Perfect for portfolios, landing pages, and small campaigns - mobile-first, accessible, and easy to customize.

## Table of contents

- Features
- Demo
- Project structure
- Quick start (run locally)
- PWA and Offline
- Customization
- Contract (inputs / outputs)
- Edge cases and accessibility
- Contributing
- License

## Features

- Tiny, dependency-free front-end (HTML, CSS, vanilla JS).
- Animations and simple forms to create/share a short "love letter".
- Progressive Web App support (service worker in `sw.js`) for basic offline behavior.
- Mobile-friendly, accessible UI with focus/keyboard support.
- Easy to customize visuals from `css/style.css`.

## Live demo

1. **github page:**

```
https://md-abu-kayser.github.io/heartscript/

```

2. **git repo clone:**

```
git clone https://github.com/md-abu-kayser/heartscript.git

```

Replace the placeholder above with your GitHub Pages URL after deployment.

## Project structure

```
index.html        # Single-page UI and markup
css/style.css     # Visual styles and theme tokens
js/script.js      # Interaction, form handling, animations
sw.js             # Optional service-worker for offline caching
LICENSE
README.md
```

## PWA and Offline

`sw.js` includes a basic service-worker registration and caching strategy to allow the demo to work offline for common browsing flows. To test PWA installability:

- Serve the project over `http://localhost` or `https`.
- Open DevTools --> Application --> Service Workers to inspect and unregister.

**Notes:**

- For production, expand the cache manifest and implement cache invalidation strategies.

## Customization

**Visuals and theme tokens are centralized in `css/style.css`. Suggested edit points:**

- Primary color / accent: `--accent` variable.
- Typography: adjust `body` font-family and sizes.
- Heart animation durations and easing are controlled as CSS keyframes and JS timeouts in `js/script.js`.

## Contract---> short

- **Inputs:** user-provided short message (text), optional sender name, optional styling choices.
- **Outputs:** an animated heart visual plus sharable/printable representation; data is processed only client-side (no server required by default).
- **Error modes:** invalid/empty input is validated client-side; messages are retained in-memory unless you add remote storage.

## Edge cases and accessibility

- **Empty message:** form shows inline validation and prevents submission.
- **Large messages:** UI constrains visible text and enables scroll/clipboard copy for long content.
- **Keyboard navigation:** form controls and primary actions are focusable and operable via Enter/Space.
- **Reduced motion:** respects `prefers-reduced-motion` media query to minimize animations.

Make sure to test on low-resource devices and small view ports.

### Contributing

Contributions are welcome. Small suggestions that improve accessibility, visuals, or add tests are appreciated.

- **Suggested workflow:**

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make changes and run in local server.
4. Submit a PR describing the change and include before/after screenshots if visual.

If you want to add automated deployment, consider adding a GitHub Actions workflow to publish to GitHub Pages.

## Security and Privacy

- This project collects no data by default. If you add remote backends, secure them and document how data is handled.

### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

### Contact & Maintainer

- **Project:** _heartscript_
- **Name:** Md Abu Kayser - Full-Stack Engineer
- **Maintainer:** [md-abu-kayser](https://github.com/md-abu-kayser)
- **GitHub:** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)
- **Email:** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)

---

**Thank you for reviewing this project!**

---

**Summary:** a small, elegant static PWA demo for sharing playful messages; designed to be drop-in to portfolios or landing pages.

---
