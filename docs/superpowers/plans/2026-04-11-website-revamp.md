# Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition scholz-cloud.de from "IT-Experte & SEO-Berater" to "Automatisierung, KI-Integration & IT-Infrastruktur" with Problem-First page structure targeting Kleinunternehmer.

**Architecture:** Modify existing Astro 4 components in-place + add 2 new components (WhatISolve, Process) + replace 3 blog posts. All changes are DE+EN bilingual via existing lang prop pattern. No new dependencies needed.

**Tech Stack:** Astro 4.16, Tailwind CSS 3.4, TypeScript, Formspree (contact), GitHub Pages

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/pages/index.astro` | Modify | DE page root — add new components, update meta |
| `src/pages/en/index.astro` | Modify | EN page root — add new components, update meta |
| `src/components/Hero.astro` | Modify | New copy, new eyebrow, same layout |
| `src/components/Services.astro` | Modify | 4 new cards: Automation/KI/Infra/Software |
| `src/components/WhatISolve.astro` | **Create** | 5 problem scenario cards (new section) |
| `src/components/Process.astro` | **Create** | 4-step process section (new section) |
| `src/components/About.astro` | Modify | New copy — enterprise ref anon, homelab angle |
| `src/components/Contact.astro` | Modify | Add email + expectation management text |
| `src/components/Navigation.astro` | Modify | Update nav links to new section anchors |
| `src/content/blog/ki-seo-2025.md` | Modify | Set `draft: true` |
| `src/content/blog/powershell-automatisierung.md` | Modify | Set `draft: true` |
| `src/content/blog/docker-homelab-beginners.md` | Modify | Set `draft: true` |
| `src/content/blog/powershell-praxis-automatisierung.md` | **Create** | New blog post 1 |
| `src/content/blog/ki-integration-unternehmen-2025.md` | **Create** | New blog post 2 |
| `src/content/blog/homelab-docker-infrastruktur.md` | **Create** | New blog post 3 |

---

## Task 1: Update Meta Titles & Descriptions

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Step 1: Update DE index.astro**

Replace the entire `<BaseLayout>` opening tag:

```astro
<BaseLayout
  lang="de"
  title="Paul Scholz | Automatisierung, KI-Integration & IT-Infrastruktur"
  description="Ich automatisiere manuelle Prozesse, baue KI-Workflows und schaffe stabile IT-Infrastruktur — für Kleinunternehmen, Selbstständige und Privatpersonen."
>
```

- [ ] **Step 2: Update EN index.astro**

```astro
<BaseLayout
  lang="en"
  title="Paul Scholz | Process Automation, AI Integration & IT Infrastructure"
  description="I automate manual processes, build AI workflows, and deliver stable IT infrastructure — for small businesses, freelancers, and individuals."
>
```

- [ ] **Step 3: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```
Expected: `dist/` output, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/pages/en/index.astro
git commit -m "feat: update meta titles and descriptions — automation/AI focus"
```

---

## Task 2: Refactor Hero.astro

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Replace content object (DE + EN)**

Find the `const content = isEnglish ? { ... } : { ... }` block and replace it entirely:

```typescript
const content = isEnglish
  ? {
      headline: 'Less manual work.\nMore results.',
      subheadline:
        'I automate processes, build AI workflows, and deliver infrastructure that stays running — for small businesses, freelancers, and anyone who wants to spend time on what actually matters.',
      primaryCta: 'View Services',
      secondaryCta: 'Get in Touch',
      primaryHref: '#services',
      secondaryHref: '#contact',
      eyebrow: 'Automation · AI Integration · Infrastructure'
    }
  : {
      headline: 'Weniger Handarbeit.\nMehr Ergebnis.',
      subheadline:
        'Ich automatisiere Prozesse, baue KI-Workflows und schaffe Infrastruktur, die läuft — für Kleinunternehmen, Selbstständige und alle, die ihre Zeit sinnvoller einsetzen wollen.',
      primaryCta: 'Mein Angebot ansehen',
      secondaryCta: 'Kontakt aufnehmen',
      primaryHref: '#leistungen',
      secondaryHref: '#kontakt',
      eyebrow: 'Automatisierung · KI-Integration · Infrastruktur'
    };
```

- [ ] **Step 2: Replace stats object**

```typescript
const stats = isEnglish
  ? [
      { value: '10+', label: 'Years in Enterprise IT' },
      { value: '1,000+', label: 'VMs managed' },
      { value: 'Enterprise', label: 'Large-scale automation experience' },
    ]
  : [
      { value: '10+', label: 'Jahre Enterprise-IT' },
      { value: '1.000+', label: 'VMs betrieben' },
      { value: 'Enterprise', label: 'Erfahrung in Großorganisationen' },
    ];
```

- [ ] **Step 3: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: hero — new copy, automation/AI positioning"
```

---

## Task 3: Create WhatISolve.astro (new section)

**Files:**
- Create: `src/components/WhatISolve.astro`

- [ ] **Step 1: Create the component**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const scenarios = isEnglish
  ? [
      {
        problem: '"My team clicks through the same 50 steps every single day."',
        solution: 'Automated workflow — done in seconds, no more manual clicking.',
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        problem: '"My data lives in 3 different systems that never sync."',
        solution: 'One integrated workflow — a single source of truth for all your systems.',
        icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
      },
      {
        problem: '"I want to use AI but don\'t know where to start or what it costs."',
        solution: 'Honest analysis, clear proposal, no overkill — only what actually helps.',
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        problem: '"My server works somehow — but nobody really knows how."',
        solution: 'Clean, documented, stable infrastructure that anyone can understand and maintain.',
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        problem: '"I need a tool or app that simply doesn\'t exist yet."',
        solution: 'Custom software built exactly for your problem — nothing more, nothing less.',
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ]
  : [
      {
        problem: '„Meine Mitarbeiter klicken täglich dieselben 50 Schritte durch."',
        solution: 'Automatisierter Workflow — in Sekunden erledigt, kein manuelles Klicken mehr.',
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        problem: '„Ich habe Daten in 3 verschiedenen Systemen, die sich nie synchronisieren."',
        solution: 'Ein integrierter Workflow — eine einzige Quelle der Wahrheit für alle Systeme.',
        icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
      },
      {
        problem: '„Ich will KI nutzen, weiß aber nicht wo ich anfange oder was es kostet."',
        solution: 'Ehrliche Analyse, klarer Vorschlag, kein Overkill — nur was wirklich hilft.',
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        problem: '„Mein Server läuft irgendwie — aber niemand weiß eigentlich wie."',
        solution: 'Saubere, dokumentierte, stabile Infrastruktur, die jeder versteht und warten kann.',
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        problem: '„Ich brauche ein Tool oder eine App, die es so noch nicht gibt."',
        solution: 'Maßgeschneiderte Softwarelösung — genau für dein Problem, nicht mehr und nicht weniger.',
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ];
---

<section
  id={isEnglish ? 'what-i-solve' : 'was-ich-loese'}
  class="bg-white py-24 sm:py-28"
  aria-labelledby="solve-heading"
>
  <div class="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
    <p class="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
      {isEnglish ? 'Problems I solve' : 'Was ich löse'}
    </p>
    <h2 id="solve-heading" class="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
      {isEnglish ? 'Does any of this sound familiar?' : 'Klingt das bekannt?'}
    </h2>
    <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
      {isEnglish
        ? 'These are the situations I get called for. If one of them matches your situation, we should talk.'
        : 'Das sind die Situationen, für die man mich ruft. Wenn eine davon auf dich zutrifft, sollten wir reden.'}
    </p>

    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {scenarios.map((s) => (
        <div class="flex flex-col rounded-[2rem] border border-slate-200 bg-slate-50 p-7 transition-all duration-200 hover:border-teal/40 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d={s.icon}></path>
            </svg>
          </div>
          <p class="mt-5 text-sm font-semibold leading-6 text-navy italic">
            {s.problem}
          </p>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            {s.solution}
          </p>
        </div>
      ))}
    </div>

    <div class="mt-10">
      <a
        href={isEnglish ? '#contact' : '#kontakt'}
        class="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-sky-600 transition-colors"
      >
        {isEnglish ? 'Talk about your situation' : 'Über deine Situation sprechen'}
        <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```
Expected: no errors (component not yet imported, build still passes).

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatISolve.astro
git commit -m "feat: add WhatISolve component — 5 problem scenarios DE+EN"
```

---

## Task 4: Create Process.astro (new section)

**Files:**
- Create: `src/components/Process.astro`

- [ ] **Step 1: Create the component**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const steps = isEnglish
  ? [
      {
        number: '01',
        title: 'Discovery',
        description: 'First conversation: understand the problem, clarify goals, assess scope. No commitment required — just an honest exchange.',
      },
      {
        number: '02',
        title: 'Concept',
        description: 'Proposed solution, timeline, and transparent pricing. You know exactly what you get before anything is built.',
      },
      {
        number: '03',
        title: 'Implementation',
        description: 'Development in small iterations with regular updates. No black box — you see progress throughout.',
      },
      {
        number: '04',
        title: 'Handover & Operations',
        description: 'Full documentation, walkthrough, and training. Optional ongoing support if you need it.',
      },
    ]
  : [
      {
        number: '01',
        title: 'Discovery',
        description: 'Erstgespräch: Problem verstehen, Ziele klären, Umfang einschätzen. Kein Commitment nötig — nur ein ehrlicher Austausch.',
      },
      {
        number: '02',
        title: 'Konzept',
        description: 'Lösungsansatz, Zeitplan und transparente Kalkulation. Du weißt genau was du bekommst, bevor etwas gebaut wird.',
      },
      {
        number: '03',
        title: 'Umsetzung',
        description: 'Entwicklung in kleinen Iterationen mit regelmäßigen Updates. Keine Blackbox — du siehst den Fortschritt.',
      },
      {
        number: '04',
        title: 'Übergabe & Betrieb',
        description: 'Vollständige Dokumentation, Einweisung und Schulung. Optional: laufender Support, wenn du ihn brauchst.',
      },
    ];
---

<section
  id={isEnglish ? 'process' : 'vorgehen'}
  class="bg-slate-50 py-24 sm:py-28"
  aria-labelledby="process-heading"
>
  <div class="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
    <p class="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
      {isEnglish ? 'How I work' : 'Vorgehen'}
    </p>
    <h2 id="process-heading" class="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
      {isEnglish ? 'From first call to working solution' : 'Vom Erstgespräch zur fertigen Lösung'}
    </h2>

    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <div class="relative flex flex-col">
          <span class="text-5xl font-bold text-slate-100 select-none leading-none">
            {step.number}
          </span>
          <h3 class="mt-3 text-lg font-semibold text-navy">
            {step.title}
          </h3>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            {step.description}
          </p>
        </div>
      ))}
    </div>

    <div class="mt-12">
      <a
        href={isEnglish ? '#contact' : '#kontakt'}
        class="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal/25 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-sky-500"
      >
        {isEnglish ? 'Start with a free discovery call' : 'Kostenloses Erstgespräch starten'}
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Process.astro
git commit -m "feat: add Process component — 4-step workflow DE+EN"
```

---

## Task 5: Refactor Services.astro (4 cards)

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Replace the services array (EN)**

Replace the entire `isEnglish` services array:

```typescript
const services = isEnglish
  ? [
      {
        title: 'Process Automation',
        description: 'Whether it\'s a PowerShell pipeline for hundreds of servers, an n8n workflow that handles repetitive tasks overnight, or an Automic job chain that replaces manual operations — I design it, build it, and document it so it keeps running.',
        bullets: [
          'Analysis & mapping of existing manual processes',
          'Scripting & workflow development (PowerShell, Python, n8n)',
          'Documentation & knowledge transfer',
        ],
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        title: 'AI & LLM Integration',
        description: 'From a simple document Q&A to a fully autonomous agent workflow — I help you find the AI use case that actually delivers value, then build and deploy it. Local models, cloud APIs, or hybrid setups.',
        bullets: [
          'Use-case analysis & honest feasibility assessment',
          'LLM integration, RAG pipelines, agent workflows',
          'Deployment, testing & handover',
        ],
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        title: 'Infrastructure',
        description: 'On-premises, cloud, homelab, or hybrid: I plan and build infrastructure that\'s stable, reproducible, and maintainable. Docker-first where it makes sense, documented so it doesn\'t break when you\'re on vacation.',
        bullets: [
          'Infrastructure planning & containerization (Docker)',
          'On-prem, cloud & hybrid setups',
          'Monitoring, stability & documentation',
        ],
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        title: 'Software & Web',
        description: 'Need a custom tool, a lightweight web app, or a fast website? I build with modern tooling — Astro, Tailwind, Python — and keep things lean. SEO basics included where relevant.',
        bullets: [
          'Custom tools & small web applications',
          'Fast websites with Astro & Tailwind',
          'SEO fundamentals (technical, on-page)',
        ],
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ]
```

- [ ] **Step 2: Replace the DE services array**

```typescript
  : [
      {
        title: 'Prozessautomatisierung',
        description: 'Ob PowerShell-Pipeline für hunderte Server, n8n-Workflow der repetitive Aufgaben über Nacht erledigt, oder Automic-Job-Chain die manuelle Abläufe ersetzt — ich konzipiere es, baue es und dokumentiere es so, dass es auch wirklich läuft.',
        bullets: [
          'Analyse & Aufnahme bestehender manueller Prozesse',
          'Skript- & Workflow-Entwicklung (PowerShell, Python, n8n)',
          'Dokumentation & Wissensübergabe',
        ],
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        title: 'KI & LLM-Integration',
        description: 'Von der einfachen Dokumenten-Suche bis zum vollautonomen Agenten-Workflow — ich helfe dir den KI-Use-Case zu finden der wirklich Mehrwert liefert, und setze ihn dann um. Lokale Modelle, Cloud-APIs oder hybride Setups.',
        bullets: [
          'Use-Case-Analyse & ehrliche Machbarkeitsbewertung',
          'LLM-Integration, RAG-Pipelines, Agenten-Workflows',
          'Deployment, Testing & Übergabe',
        ],
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        title: 'Infrastruktur',
        description: 'On-Premises, Cloud, Homelab oder Hybrid: Ich plane und baue Infrastruktur, die stabil, reproduzierbar und wartbar ist. Docker-first wo es Sinn macht, dokumentiert damit es nicht kaputt geht wenn du im Urlaub bist.',
        bullets: [
          'Infrastrukturplanung & Containerisierung (Docker)',
          'On-Prem-, Cloud- & Hybrid-Setups',
          'Monitoring, Stabilität & Dokumentation',
        ],
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        title: 'Software & Web',
        description: 'Du brauchst ein Custom-Tool, eine schlanke Web-App oder eine schnelle Website? Ich baue mit modernem Stack — Astro, Tailwind, Python — und halte die Lösung schlank. SEO-Grundlagen inklusive wo sinnvoll.',
        bullets: [
          'Custom-Tools & kleine Web-Applikationen',
          'Schnelle Websites mit Astro & Tailwind',
          'SEO-Grundlagen (technisch, on-page)',
        ],
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ];
```

- [ ] **Step 3: Update section heading copy**

Find and replace the heading text block in the template:

```astro
    <p class="text-sm font-semibold uppercase tracking-[0.24em] text-teal">
      {isEnglish ? 'Services' : 'Leistungen'}
    </p>
    <h2 id="services-heading" class="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
      {isEnglish ? 'What I build and deliver' : 'Was ich baue und liefere'}
    </h2>
```

- [ ] **Step 4: Remove bottom note paragraph**

Delete the `<p class="mt-10 text-sm font-medium text-slate-600">` paragraph (the "Alle Leistungen auf Anfrage" line) — replaced by the Process CTA.

- [ ] **Step 5: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: services — 4 new cards automation/AI/infra/software"
```

---

## Task 6: Refactor About.astro

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Replace content object**

```typescript
const content = isEnglish
  ? {
      id: 'about',
      title: 'About Me',
      lead:
        'I\'m Paul Scholz — IT professional and automation engineer from Germany. For over a decade, I\'ve been automating complex processes at enterprise scale: in one of Germany\'s largest social security organizations, I designed and operated automation pipelines handling thousands of daily jobs with Automic (UC4) and PowerShell.',
      body:
        'On the side, I work with small businesses, freelancers, and individuals on automation, AI integration, and infrastructure. I run an extensive homelab with Docker, n8n, and self-hosted services — the playground where most of my ideas get tested before they go anywhere near production. I write about what I actually do, not about what sounds good.',
      asideTitle: 'Track Record',
      asideText:
        '10+ years in enterprise IT. Automation at scale in regulated, large-organization environments. Personal projects in Docker, n8n, local LLMs, and self-hosted infrastructure.',
      tags: [
        'Enterprise IT',
        'Hyper-V / SCVMM',
        'PowerShell',
        'Automic / UC4',
        'KI / AI',
        'Docker',
        'Python',
        'n8n',
        'Cloud',
      ]
    }
  : {
      id: 'ueber-mich',
      title: 'Über mich',
      lead:
        'Ich bin Paul Scholz — IT-Spezialist und Automatisierungsentwickler aus Deutschland. Seit über einem Jahrzehnt automatisiere ich komplexe Prozesse im Enterprise-Maßstab: Bei einem der größten deutschen Sozialversicherungsträger habe ich Automatisierungs-Pipelines konzipiert und betrieben, die täglich tausende Jobs mit Automic (UC4) und PowerShell verarbeiten.',
      body:
        'Nebenbei arbeite ich mit Kleinunternehmen, Selbstständigen und Privatpersonen an Automatisierung, KI-Integration und Infrastruktur. Ich betreibe ein umfangreiches Homelab mit Docker, n8n und Self-Hosted-Services — der Spielplatz auf dem die meisten meiner Ideen getestet werden bevor sie irgendwo in Produktion gehen. Ich schreibe über das, was ich wirklich tue — nicht über das, was gut klingt.',
      asideTitle: 'Nachweisliche Erfahrung',
      asideText:
        '10+ Jahre Enterprise-IT. Automatisierung im Maßstab in regulierten Großorganisations-Umgebungen. Eigene Projekte in Docker, n8n, lokalen LLMs und Self-Hosted-Infrastruktur.',
      tags: [
        'Enterprise IT',
        'Hyper-V / SCVMM',
        'PowerShell',
        'Automic / UC4',
        'KI / AI',
        'Docker',
        'Python',
        'n8n',
        'Cloud',
      ]
    };
```

- [ ] **Step 2: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: about — enterprise automation angle, anon DRV ref"
```

---

## Task 7: Update Contact.astro

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Update content object — add email + expectation text**

In the `content` object for both EN and DE, add two new fields after `direct`:

```typescript
// EN additions:
directEmail: 'kontakt@wichtige.email',
responseTime: 'I usually respond within 1–2 business days.',
helpMe: 'Most helpful: a brief description of your situation, what you have in mind, and any timing constraints.',

// DE additions:
directEmail: 'kontakt@wichtige.email',
responseTime: 'Ich antworte in der Regel innerhalb von 1–2 Werktagen.',
helpMe: 'Am hilfreichsten: eine kurze Beschreibung deiner Situation, was du dir vorstellst, und ob es einen Zeitrahmen gibt.',
```

- [ ] **Step 2: Find the direct contact block in the template**

Locate the `<div>` that renders the direct contact email link and update it to use `content.directEmail`:

```astro
<a
  href={`mailto:${content.directEmail}`}
  class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-sky-400 transition-colors"
>
  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
  {content.directEmail}
</a>
```

- [ ] **Step 3: Add response time + helper text below the email link**

After the email `<a>` tag, add:

```astro
<p class="mt-4 text-xs text-slate-400">{content.responseTime}</p>
<p class="mt-2 text-xs text-slate-400 italic">{content.helpMe}</p>
```

- [ ] **Step 4: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: contact — add email, response time, helper text"
```

---

## Task 8: Update Navigation + Wire New Components into Pages

**Files:**
- Modify: `src/components/Navigation.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Step 1: Update Navigation nav links**

Find the nav links array in Navigation.astro and replace with:

```typescript
const navLinks = isEnglish
  ? [
      { href: '#services', label: 'Services' },
      { href: '#process', label: 'Process' },
      { href: '#about', label: 'About' },
      { href: '/en/blog', label: 'Blog' },
      { href: '#contact', label: 'Contact' },
    ]
  : [
      { href: '#leistungen', label: 'Leistungen' },
      { href: '#vorgehen', label: 'Vorgehen' },
      { href: '#ueber-mich', label: 'Über mich' },
      { href: '/blog', label: 'Blog' },
      { href: '#kontakt', label: 'Kontakt' },
    ];
```

- [ ] **Step 2: Add new component imports to DE index.astro**

Add these imports at the top of the frontmatter:

```astro
import WhatISolve from '../components/WhatISolve.astro';
import Process from '../components/Process.astro';
```

- [ ] **Step 3: Insert new components into DE page body**

Replace the `<main>` section in `src/pages/index.astro`:

```astro
<main>
  <Hero lang="de" />
  <WhatISolve lang="de" />
  <Services lang="de" />
  <Process lang="de" />
  <About lang="de" />
  <TechStack lang="de" />
  <Portfolio lang="de" />
  <Contact lang="de" />
</main>
```

- [ ] **Step 4: Do the same for EN index.astro**

```astro
import WhatISolve from '../../components/WhatISolve.astro';
import Process from '../../components/Process.astro';
```

```astro
<main>
  <Hero lang="en" />
  <WhatISolve lang="en" />
  <Services lang="en" />
  <Process lang="en" />
  <About lang="en" />
  <TechStack lang="en" />
  <Portfolio lang="en" />
  <Contact lang="en" />
</main>
```

- [ ] **Step 5: Verify full build**

```bash
cd W:\Website && npm run build 2>&1 | tail -10
```
Expected: clean build, no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Navigation.astro src/pages/index.astro src/pages/en/index.astro
git commit -m "feat: wire WhatISolve + Process into pages, update nav links"
```

---

## Task 9: Disable Old Blog Posts

**Files:**
- Modify: `src/content/blog/ki-seo-2025.md`
- Modify: `src/content/blog/powershell-automatisierung.md`
- Modify: `src/content/blog/docker-homelab-beginners.md`

- [ ] **Step 1: Add draft: true to ki-seo-2025.md**

In the frontmatter, add or change:
```yaml
draft: true
```

- [ ] **Step 2: Add draft: true to powershell-automatisierung.md**

```yaml
draft: true
```

- [ ] **Step 3: Add draft: true to docker-homelab-beginners.md**

```yaml
draft: true
```

- [ ] **Step 4: Verify blog index shows no posts**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```
Expected: build succeeds; `/blog` renders empty list (check `dist/blog/index.html`).

- [ ] **Step 5: Commit**

```bash
git add src/content/blog/
git commit -m "chore: disable 3 old blog posts (draft: true)"
```

---

## Task 10: Write New Blog Post 1 — PowerShell Automation

**Files:**
- Create: `src/content/blog/powershell-praxis-automatisierung.md`

- [ ] **Step 1: Create post**

```markdown
---
title: "PowerShell-Automatisierung in der Praxis: Wie ich hunderte Server gleichzeitig verwalte"
titleEn: "PowerShell Automation in Practice: How I Manage Hundreds of Servers at Once"
description: "Ein ehrlicher Erfahrungsbericht: Wie ich in einer Großorganisation mit PowerShell repetitive Prozesse automatisiert habe — mit konkreten Beispielen, typischen Fallen und einem Einstiegsrezept für KMU."
descriptionEn: "An honest field report: how I automated repetitive processes in a large enterprise with PowerShell — concrete examples, common pitfalls, and a starter recipe for SMBs."
pubDate: 2026-04-11
tags: ["PowerShell", "Automatisierung", "Enterprise IT", "Scripting", "Windows"]
draft: false
---

Wenn man täglich mit hunderten von Servern arbeitet, lernt man schnell: Was sich wiederholt, gehört automatisiert. Nicht irgendwann. Sofort.

In diesem Post zeige ich, wie ich PowerShell-Automatisierung im Enterprise-Umfeld einsetze — und was KMU davon direkt übernehmen können.

## Warum PowerShell und nicht einfach ein Klick-Tool?

PowerShell ist auf jedem Windows-System verfügbar, seit 2016 auch open-source und auf Linux lauffähig. Wer einmal die Grundlagen draufhat, kann damit:

- Massenupdates auf hunderten Servern gleichzeitig ausrollen
- Berichte aus Active Directory in Sekunden generieren
- Monitoring-Checks automatisch alle 5 Minuten ausführen
- Dateisystem-Aufräumjobs ohne menschliches Zutun erledigen

Das Wichtige: PowerShell ist kein Experten-Tool. Wer `Get-Process` und `ForEach-Object` versteht, kann damit echte Probleme lösen.

## Ein konkretes Beispiel: Server-Health-Check für 200 Maschinen

**Das Problem:** In einer größeren IT-Umgebung will niemand 200 Server einzeln aufrufen, um zu prüfen ob Dienste laufen, ob der Speicher kritisch ist oder ob Updates ausstehen.

**Die Lösung:** Ein Skript, das das in unter 2 Minuten erledigt.

```powershell
# server-health.ps1
$servers = Get-Content ".\servers.txt"
$results = @()

foreach ($server in $servers) {
    $status = [PSCustomObject]@{
        Server    = $server
        Ping      = (Test-Connection -ComputerName $server -Count 1 -Quiet)
        DiskFree  = $null
        CpuLoad   = $null
        Timestamp = Get-Date
    }

    if ($status.Ping) {
        $disk = Get-WmiObject Win32_LogicalDisk -ComputerName $server -Filter "DeviceID='C:'"
        $status.DiskFree = [math]::Round($disk.FreeSpace / 1GB, 1)

        $cpu = Get-WmiObject Win32_Processor -ComputerName $server
        $status.CpuLoad = ($cpu | Measure-Object LoadPercentage -Average).Average
    }

    $results += $status
}

$results | Where-Object { $_.DiskFree -lt 10 -or $_.CpuLoad -gt 85 } |
    Export-Csv ".\critical-servers-$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
```

Das Skript läuft täglich als geplante Aufgabe. Kritische Server landen automatisch im Report. Kein manueller Aufwand mehr.

## Was das für ein kleines Unternehmen bedeutet

Im Enterprise-Umfeld läuft so etwas auf hunderten Servern. Im KMU-Umfeld sind es vielleicht 5. Aber das Prinzip ist exakt gleich:

**Typische Automatisierungen für KMU mit PowerShell:**

- **Backup-Kontrolle:** Prüfen ob das Backup vom Vorabend erfolgreich war — und bei Fehler sofort eine Mail schicken
- **Benutzer-Onboarding:** Neuen Mitarbeiter in Active Directory anlegen, Ordnerrechte setzen, Mailbox erstellen — alles in einem Skript
- **Daten-Export:** Täglich einen Bericht aus einem System exportieren und per Mail versenden
- **Aufräumen:** Temporäre Dateien, alte Logs, leere Ordner — automatisch bereinigen

**Einstiegsrezept:** Nimm den einen manuellen Prozess, den du oder dein Team am häufigsten wiederholt. Schreib ihn in Stichpunkten auf. Dann ist das schon der erste Schritt zum Skript.

## Die häufigsten Fehler beim Einstieg

1. **Zu groß anfangen** — ein Skript für alles auf einmal. Besser: eine Aufgabe, ein Skript.
2. **Kein Error-Handling** — wenn etwas schiefgeht, bricht das Skript still ab. Immer `try/catch` verwenden.
3. **Hardcoded Pfade** — `C:\Users\paul\Desktop\file.txt` funktioniert auf keinem anderen Rechner. Parameter verwenden.
4. **Kein Logging** — ohne Log weiß man nicht ob das Skript gestern Nacht wirklich durchgelaufen ist.

## Fazit

PowerShell ist eines der unterschätztesten Werkzeuge im IT-Alltag. Es ist kostenlos, überall verfügbar und mit wenigen Stunden Einarbeitung produktiv einsetzbar.

Wenn du nicht weißt wo du anfangen sollst — oder wenn du einen bestehenden Prozess automatisieren willst und dir jemanden wünschst der das umsetzt: [Schreib mir](/kontakt).

---

*Weitere Beiträge zu Automatisierung, KI und Infrastruktur findest du im [Blog](/blog). Oder schau dir meine [Leistungen](/leistungen) an.*
```

- [ ] **Step 2: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```
Expected: post appears in blog index.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/powershell-praxis-automatisierung.md
git commit -m "feat: blog post 1 — PowerShell automation in practice"
```

---

## Task 11: Write New Blog Post 2 — KI Integration

**Files:**
- Create: `src/content/blog/ki-integration-unternehmen-2025.md`

- [ ] **Step 1: Create post**

```markdown
---
title: "KI im Unternehmensalltag 2025: Was wirklich funktioniert (und was nicht)"
titleEn: "AI in Business 2025: What Actually Works (and What Doesn't)"
description: "Kein Hype, kein Buzzword-Bingo: Ein ehrlicher Erfahrungsbericht darüber welche KI-Anwendungen in kleinen und mittelständischen Unternehmen tatsächlich Mehrwert liefern — und wo die Grenzen sind."
descriptionEn: "No hype, no buzzword bingo: an honest field report on which AI applications actually deliver value in small and mid-sized businesses — and where the limits are."
pubDate: 2026-04-11
tags: ["KI", "AI", "LLM", "Automatisierung", "n8n", "Workflow"]
draft: false
---

KI ist gerade überall. Auf jeder Konferenz, in jedem Newsletter, in jedem zweiten LinkedIn-Post. Und gleichzeitig habe ich noch nie so viele enttäuschte Unternehmer getroffen, die ein KI-Tool gekauft haben und jetzt nicht wissen was sie damit anfangen sollen.

Dieser Post ist kein Verkaufspitch. Er ist ein ehrlicher Bericht darüber, was ich bei der KI-Integration in der Praxis gesehen habe — und was ich meinen Kunden rate.

## Die drei häufigsten Fehler beim KI-Einstieg

**1. Das falsche Problem lösen**

KI ist keine Lösung für ein schlecht definiertes Problem. Wer nicht weiß was er automatisieren will, findet auch mit ChatGPT keine Antwort. Zuerst muss der Prozess klar sein — dann erst kommt das Tool.

**2. Zu viel auf einmal**

"Wir wollen unseren gesamten Kundenservice mit KI machen" ist kein Projekt, das in drei Wochen fertig ist. Die erfolgreichsten KI-Einführungen, die ich begleitet habe, haben mit einem einzigen, klar abgegrenzten Use-Case angefangen.

**3. Kosten unterschätzen**

GPT-4 klingt günstig. Aber wenn du 10.000 Dokumente täglich durchlaufen lässt, summieren sich die API-Kosten schnell. Lokale Modelle (Ollama, LM Studio) sind oft die bessere Wahl für repetitive, interne Aufgaben.

## Was wirklich funktioniert: 4 Use Cases mit echtem ROI

### 1. Dokument-Q&A (RAG)

Ein Unternehmen hat hunderte PDFs: Handbücher, Verträge, interne Richtlinien. Mitarbeiter suchen täglich darin — und verschwenden dabei Zeit.

**Lösung:** Ein RAG-System (Retrieval Augmented Generation) indexiert alle Dokumente und beantwortet Fragen im Klartext. Der Mitarbeiter fragt: "Was ist die Kündigungsfrist laut Vertrag vom März 2023?" — und bekommt die Antwort in Sekunden, mit Quellenangabe.

**Aufwand:** 1–3 Tage Setup, je nach Datenmenge. Danach fast wartungsfrei.

### 2. E-Mail-Klassifizierung und Routing

Wer täglich viele eingehende E-Mails hat, kennt das Problem: Sortieren, zuweisen, priorisieren — alles manuell.

**Lösung:** Ein Workflow (z.B. in n8n) liest eingehende Mails, klassifiziert sie per LLM (Beschwerde? Anfrage? Spam?) und leitet sie automatisch weiter oder beantwortet einfache Anfragen direkt.

**Aufwand:** 1–2 Tage, je nach Mail-Volumen und Antwort-Komplexität.

### 3. Datennormalisierung

Immer wieder dieselbe Aufgabe: Daten kommen in unterschiedlichen Formaten rein (Excel, PDF, CSV, freitext) und müssen in ein einheitliches Format gebracht werden.

**Lösung:** LLM-gestützter Parser, der unstrukturierte Daten in strukturierte Ausgabe überführt — zuverlässiger als Regex, flexibler als starre ETL-Pipelines.

### 4. Zusammenfassungen & Reports

Meetings, Dokumente, Kundentelefonate — alles wird aufgezeichnet, aber niemand liest die Transkripte.

**Lösung:** Automatische Zusammenfassungen mit Whisper (Sprache-zu-Text) + LLM. Ergebnis: strukturierter Report mit Action Items, in unter einer Minute nach dem Meeting.

## Lokale Modelle vs. Cloud-API: Wann was?

| Szenario | Empfehlung |
|----------|------------|
| Interne, sensible Daten | Lokales Modell (Ollama + Llama 3) |
| Hohe Qualitätsanforderungen, externe Daten | Cloud API (Claude, GPT-4) |
| Hohe Volumen, einfache Aufgaben | Lokales Modell |
| Prototyp / Machbarkeitsstudie | Cloud API (schneller Start) |

## Mein Empfehlungsrezept für den KI-Einstieg

1. **Einen Prozess identifizieren**, der sich täglich oder wöchentlich wiederholt und Zeit kostet
2. **Den Prozess aufschreiben** — Input, Schritte, Output
3. **Einen Machbarkeitscheck machen** — ist das wirklich ein LLM-Problem oder ein simples Skript-Problem?
4. **Klein starten** — Pilot mit echten Daten, aber begrenztem Scope
5. **Messen** — Zeit vorher vs. nachher, Fehlerrate, Zufriedenheit

Wenn du einen konkreten Prozess hast und nicht weißt ob und wie KI helfen kann — [schreib mir](/kontakt). Ich sage dir ehrlich ob es Sinn macht.

---

*Weitere Beiträge zu Automatisierung und Infrastruktur im [Blog](/blog). Meine KI-Integrationsleistungen findest du unter [Leistungen](/leistungen#ki).*
```

- [ ] **Step 2: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/ki-integration-unternehmen-2025.md
git commit -m "feat: blog post 2 — AI integration in business 2025"
```

---

## Task 12: Write New Blog Post 3 — Homelab & Infrastructure

**Files:**
- Create: `src/content/blog/homelab-docker-infrastruktur.md`

- [ ] **Step 1: Create post**

```markdown
---
title: "Homelab 2025: Warum ich meine eigene Infrastruktur betreibe — und was du davon lernst"
titleEn: "Homelab 2025: Why I Run My Own Infrastructure — and What You Can Learn from It"
description: "Ein praktischer Einblick in mein Homelab-Setup mit Docker, n8n und Self-Hosted-Services — warum das mehr ist als ein Hobby, und was Unternehmen daraus mitnehmen können."
descriptionEn: "A practical look at my homelab setup with Docker, n8n, and self-hosted services — why it's more than a hobby, and what businesses can learn from it."
pubDate: 2026-04-11
tags: ["Homelab", "Docker", "Infrastruktur", "Self-Hosting", "n8n", "On-Premises"]
draft: false
---

Viele IT-Profis betreiben ein Homelab. Aber warum? Und was hat ein kleines Unternehmen davon zu wissen?

Dieser Post ist kein Tutorial für Techniknerds. Es ist eine ehrliche Erklärung, warum ich mein eigenes Infrastruktur-Labor betreibe — und welche Prinzipien daraus ich direkt in Kundenprojekte übertrage.

## Was ist ein Homelab?

Ein Homelab ist eine private IT-Umgebung zu Hause: ein oder mehrere Server (oft alte Workstations oder Mini-PCs), auf denen man eigene Dienste betreibt, Konfigurationen testet und Neues ausprobiert — ohne Konsequenzen im Produktivbetrieb.

Mein aktuelles Setup:
- **Hardware:** 2× Mini-PC (Intel N100, 16 GB RAM, 512 GB SSD) + 1× NAS
- **Basis:** Proxmox VE als Hypervisor, Docker auf VMs
- **Services:** n8n (Workflow-Automatisierung), Nextcloud (Dateien), Vaultwarden (Passwörter), Uptime Kuma (Monitoring), Ollama (lokale LLMs)
- **Netz:** Separate VLANs für IoT, Services und Admin

Kosten: unter 600 € Einmalinvestition, unter 10 € Strom pro Monat.

## Warum Docker? Und was bedeutet das für ein Unternehmen?

Docker ist der Standard für containerisierte Applikationen. Die Kerneigenschaft: Was auf meinem Rechner läuft, läuft exakt gleich auf deinem Server — und auf dem nächsten, und auf dem übernächsten.

**Für ein Unternehmen bedeutet das:**

- **Reproduzierbarkeit:** Jede Applikation läuft in einem definierten Container. Kein "bei mir funktioniert's aber auf dem Server nicht".
- **Isolation:** Dienste können sich nicht gegenseitig kaputt machen.
- **Portabilität:** Von der lokalen Entwicklungsumgebung auf den Produktionsserver — ein Befehl.
- **Einfache Updates:** `docker compose pull && docker compose up -d` — fertig.

Eine typische `docker-compose.yml` für einen einfachen Webdienst mit automatischem HTTPS:

```yaml
services:
  app:
    image: myapp:latest
    restart: unless-stopped
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    restart: unless-stopped
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=pass
      - POSTGRES_USER=user
      - POSTGRES_DB=mydb

  traefik:
    image: traefik:v3
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./acme.json:/acme.json

volumes:
  pgdata:
```

## Self-Hosting: Was Sinn macht und was nicht

Nicht alles lohnt sich selbst zu hosten. Meine Faustregel:

**Self-Hosting lohnt sich wenn:**
- Datenschutz/Compliance es erfordert (sensible Daten sollen nicht in der Cloud)
- Dauernutzung günstiger ist als SaaS (bei hohem Volumen)
- Man Kontrolle über den Betrieb braucht (eigene Backups, kein Vendor-Lock-in)

**Cloud/SaaS ist besser wenn:**
- Das Team keine IT-Ressourcen für Wartung hat
- Hochverfügbarkeit kritisch ist und man keine Redundanz aufbauen will
- Die Anforderungen sich oft ändern

## Das wichtigste Prinzip: Infrastructure as Code

Alles, was ich in meinem Homelab betreibe, ist dokumentiert — als Konfigurationsdateien, nicht als "ich erinnere mich an den Befehl von damals". Das nennt sich Infrastructure as Code (IaC).

**Warum das für Unternehmen wichtig ist:**

Wenn der einzige Mensch der weiß wie ein Server konfiguriert ist im Urlaub ist — oder kündigt — hast du ein Problem. Wenn alles in Git liegt, hat jeder Zugriff auf das Wissen.

Tooling: Ansible für Konfiguration, Git für Versionierung, Docker Compose für Services.

## Was du mitnehmen kannst

1. **Containerisiere deine Services** — auch wenn du nur 2 Anwendungen betreibst
2. **Dokumentiere alles als Code** — nicht in deinem Kopf
3. **Trenne Entwicklung und Produktion** — auch wenn Produktion "ein kleiner Server im Keller" ist
4. **Plane für den Ausfall** — Backups testen, Recovery dokumentieren

Wenn du Infrastruktur aufbauen oder modernisieren willst und nicht weißt wo du anfangen sollst — [schreib mir](/kontakt). Ich helfe dir ein Setup zu finden das zu deiner Größe und deinem Budget passt.

---

*Mehr zu Infrastruktur und Automatisierung im [Blog](/blog). Meine Infrastruktur-Leistungen findest du unter [Leistungen](/leistungen).*
```

- [ ] **Step 2: Verify build**

```bash
cd W:\Website && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/homelab-docker-infrastruktur.md
git commit -m "feat: blog post 3 — homelab & docker infrastructure"
```

---

## Task 13: Final Build Verification & Push

**Files:** None (verification only)

- [ ] **Step 1: Full clean build**

```bash
cd W:\Website && npm run build 2>&1
```
Expected: all pages built, no TypeScript errors, no broken imports.

- [ ] **Step 2: Check critical pages in dist/**

```bash
powershell.exe -Command "Get-ChildItem W:\Website\dist -Recurse -Name '*.html' | Sort-Object | Select-Object -First 20"
```
Expected: index.html, en/index.html, blog/index.html, blog/*.html all present.

- [ ] **Step 3: Verify blog posts visible**

```bash
powershell.exe -Command "Get-ChildItem W:\Website\dist\blog -Recurse -Name '*.html'"
```
Expected: 3 new post directories, no old posts.

- [ ] **Step 4: Check no old post slugs in dist**

```bash
powershell.exe -Command "Test-Path W:\Website\dist\blog\ki-seo-2025"
```
Expected: `False`

- [ ] **Step 5: Push to GitHub**

```bash
cd W:\Website && git push origin main
```

- [ ] **Step 6: Done — note the live URL**

GitHub Pages will redeploy automatically. Live at: `https://www.scholz-cloud.de/`
