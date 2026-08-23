# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide Icons (pinned by the user's brief). React Router only if needed (single-page with anchor sections is acceptable). Deploy target: Vercel, prepared for custom domain. No localhost dependencies in production.

## Users

Recruiters, tech leads, and potential clients evaluating a front-end developer. They arrive from LinkedIn/GitHub, scan fast (often on mobile), and decide within seconds whether the person is worth contacting. Secondary: the owner herself, who must update projects/skills/experience easily without touching component code.

## Product Purpose

Personal professional portfolio for a front-end developer (Desenvolvedora Front-end). Success = visitor understands who she is and what she builds, browses real projects, and initiates contact. For the owner: a production site she can publish on Vercel today and maintain by editing data files only.

## Positioning

Not a generic template: a premium, dark, technology-forward portfolio whose craft itself demonstrates the developer's front-end skill. The site is the proof of competence.

## Operating Context

Content language: Portuguese (pt-BR). Contact form posts to Web3Forms (access key via `VITE_WEB3FORMS_KEY` env var, configured on Vercel). All personal data, skills, projects, experience, and education live in centralized data files (`src/data/`) so adding a project = editing one object.

## Capabilities and Constraints

- Sections: Hero, Sobre, Skills (6 categories), Projetos (with technology filters, featured flag, easy add), Experiência (timeline), Formação/Cursos, Contato (working form with success/error states), Footer.
- Confirmed facts: GitHub https://github.com/EVI-DEV1 · LinkedIn https://www.linkedin.com/in/eliane-vitoriano-luiz-1152892b1
- Display name: DELIBERATELY UNDECIDED — user chose placeholder `[SEU NOME]` for now; must be clearly marked in data files, never invented.
- All professional history, project entries, courses: NOT provided — ship clearly labeled placeholder/example entries the user replaces; never present invented facts as real.
- Performance and responsiveness are hard requirements (mobile through large monitors, no horizontal scroll). Animations must stay professional and light.
- SEO: title, description, Open Graph, favicon, semantic structure.

## Brand Commitments

Dark mode as the primary identity. Modern gradients, moderate glassmorphism, subtle tech background, discreet glow effects, elegant typography, micro-interactions, scroll entrance animations. Must read as a premium professional developer portfolio, not a generic template.

## Evidence on Hand

None yet: no project screenshots, no CV text, no photo. Data files ship with labeled example/placeholder content and a fill-in guide.

## Product Principles

1. The site's own craft is the résumé — every detail must demonstrate front-end skill.
2. Content is data: updating the portfolio never requires touching components.
3. Fast and light beats flashy: animations serve hierarchy, never block reading.
4. Truth over polish: placeholder content is always visibly marked, never fake-real.
5. Production-first: everything works after `git push` + Vercel deploy, no local-only dependencies.

## Accessibility & Inclusion

Semantic landmarks, keyboard-navigable menu and filters, visible focus states, WCAG AA contrast on dark ground, `prefers-reduced-motion` respected.
