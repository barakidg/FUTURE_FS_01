# Bereket Degfew — Portfolio

Personal portfolio site, Full-Stack Developer. Built with React, showcasing background, experience, tech stack, and selected projects, with a working contact form.

**Live site:** _https://beki-portfolio.onrender.com/_

## Tech Stack

- **React 19 + Vite** — UI and build tooling
- **React Router** — routing
- **Framer Motion** — scroll and interaction animations
- **EmailJS** — contact form email delivery (no backend required)
- **Lucide React / React Icons** — iconography
- **Plain CSS** (custom properties) — theming and layout, light/dark mode via `ThemeContext`

## Project Structure

```
src/
├── components/       # Header, Footer, ContactForm
├── context/           # ThemeContext (light/dark mode)
├── data/               # portfolio-data.json (content), skillsIcon.js
├── pages/               # Home.jsx (main page)
├── styles/               # index.css, layout.css, home.css
├── App.jsx
└── main.jsx
public/                # static assets (images, favicon)
```

Site content (profile, skills, experience, projects, contact info) is data-driven from `src/data/portfolio-data.json` — update that file to change the content without touching component code.

## Setup

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/barakidg/FUTURE_FS_01.git
cd FUTURE_FS_01
npm install
```

Create a `.env` file in the project root with your EmailJS credentials (used by the contact form):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

These come from an [EmailJS](https://www.emailjs.com/) account — create a service and template there, then copy the IDs in.

## Development

```bash
npm run dev
```

Runs the app locally at `http://localhost:5173` with hot reload.

## Build

```bash
npm run build
```

Outputs a production build to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deployment (Render)

1. Push the repository to GitHub.
2. In Render, create a new **Static Site** and connect the repo.
3. Set the build command: `npm run build`
4. Set the publish directory: `dist`
5. Add the three `VITE_EMAILJS_*` environment variables under the site's **Environment** settings.
6. Deploy. 

