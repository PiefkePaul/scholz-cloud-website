# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vollständiger Redesign von scholz-cloud.de — Precision Dark design, Sog-Ton copy, Canvas-Animationen, neue BrandBar + Numbers Komponenten, Signed Strip im Hero.

**Architecture:** Astro 4.16 SSG, Tailwind CSS 3.4, TypeScript. Animationen als pure TS-Module in `src/scripts/`, die von den jeweiligen Komponenten via Astro `<script>`-Bundling importiert werden. Kein GSAP, kein Three.js. IntersectionObserver für Scroll-Reveal und Counter.

**Tech Stack:** Astro 4.16, Tailwind CSS 3.4, TypeScript, Formspree (xykbqngy), Google Fonts Inter

---

## Dateiübersicht

**Neu erstellen:**
- `src/scripts/hero-canvas.ts` — Canvas-Partikel für Hero
- `src/scripts/scroll-reveal.ts` — IntersectionObserver Scroll-Reveal
- `src/scripts/counter.ts` — Counter-Animation für Numbers-Band
- `src/components/BrandBar.astro` — Technologie-Tag-Leiste
- `src/components/Numbers.astro` — Teal-Stats-Band mit Counter

**Modifizieren:**
- `tailwind.config.mjs` — Neue Keyframes breathe, fade-in-up
- `src/components/Hero.astro` — Komplett neu: Canvas, Gradient-Headline, Signed Strip
- `src/components/WhatISolve.astro` — Neue Texte (Sog-Ton), 6. CTA-Karte
- `src/components/Services.astro` — Neue Prosatexte, Brand-Tags, Dark-Schema
- `src/components/About.astro` — Dark-Schema, 4-Absatz-Prosa, Person-Card, LinkedIn
- `src/components/Portfolio.astro` — Dark-Schema (bg-Farben)
- `src/components/Contact.astro` — LinkedIn hinzufügen, neutraler Help-Text
- `src/layouts/BaseLayout.astro` — personRole, LinkedIn in sameAs, scroll-reveal init
- `src/pages/index.astro` — BrandBar + Numbers einbinden, Process + TechStack entfernen
- `src/pages/en/index.astro` — Dasselbe für EN

**Nicht anfassen:** Navigation.astro, Footer.astro, Process.astro, TechStack.astro (bleiben erhalten, werden nur aus den Index-Seiten entfernt), Blog-Posts

---

## Task 1: Tailwind — Neue Keyframes

**Files:**
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Keyframes `breathe` und `fade-in-up` ergänzen**

Ersetze den `keyframes`-Block in `tailwind.config.mjs` komplett:

```javascript
// tailwind.config.mjs — vollständiger keyframes + animation Block
keyframes: {
  'fade-up': {
    '0%': { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
    '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
  },
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  'float-soft': {
    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
    '50%': { transform: 'translate3d(0, -8px, 0)' }
  },
  'breathe': {
    '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
    '50%': { opacity: '1', transform: 'scale(1.06)' }
  },
  'fade-in-up': {
    '0%': { opacity: '0', transform: 'translateY(24px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  }
},
animation: {
  'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
  'fade-in': 'fade-in 0.7s ease-out both',
  'float-soft': 'float-soft 7s ease-in-out infinite',
  'breathe': 'breathe 8s ease-in-out infinite',
  'fade-in-up': 'fade-in-up 0.6s ease-out both'
}
```

Die vollständige Datei nach der Änderung:

```javascript
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        teal: '#0ea5e9',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'float-soft': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' }
        },
        'breathe': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.7s ease-out both',
        'float-soft': 'float-soft 7s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both'
      }
    }
  },
  plugins: [typography]
};
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Build erfolgreich, keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add tailwind.config.mjs && git commit -m "feat: add breathe and fade-in-up keyframes to tailwind config"
```

---

## Task 2: Script — Canvas-Partikel

**Files:**
- Create: `src/scripts/hero-canvas.ts`

- [ ] **Step 1: `src/scripts/hero-canvas.ts` erstellen**

```typescript
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  frame: number;
}

export function initHeroCanvas(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize(): void {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PARTICLE_COUNT = 40;

  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 1 + Math.random(),
    opacity: 0.15 + Math.random() * 0.25,
    color: Math.random() > 0.5 ? '#0ea5e9' : '#ffffff',
    frame: 0,
  }));

  function tick(): void {
    if (document.hidden) {
      requestAnimationFrame(tick);
      return;
    }

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.frame++;

      // Gentle direction nudge every 120 frames to keep motion organic
      if (p.frame % 120 === 0) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.4) {
          p.vx = (p.vx / speed) * 0.4;
          p.vy = (p.vy / speed) * 0.4;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = p.opacity;
      ctx!.fill();
    }

    ctx!.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  tick();
}
```

- [ ] **Step 2: TypeScript-Typen prüfen**

```bash
cd /w/Website && npx tsc --noEmit
```

Erwartet: Keine TS-Fehler. Falls `tsconfig.json` fehlt: `npm run build` reicht auch als Prüfung.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/scripts/hero-canvas.ts && git commit -m "feat: add hero canvas particle animation script"
```

---

## Task 3: Script — Scroll-Reveal

**Files:**
- Create: `src/scripts/scroll-reveal.ts`

- [ ] **Step 1: `src/scripts/scroll-reveal.ts` erstellen**

```typescript
export function initScrollReveal(): void {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!elements.length) return;

  // Set initial hidden state via inline style (prevents FOUC from class-based approach)
  elements.forEach((el) => {
    const delay = el.dataset.revealDelay ?? '0';
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/scripts/scroll-reveal.ts && git commit -m "feat: add scroll-reveal IntersectionObserver script"
```

---

## Task 4: Script — Counter-Animation

**Files:**
- Create: `src/scripts/counter.ts`

- [ ] **Step 1: `src/scripts/counter.ts` erstellen**

```typescript
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function initCounters(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!elements.length) return;

  const DURATION = 1200;
  // Use document lang for number formatting
  const locale = document.documentElement.lang === 'en' ? 'en-US' : 'de-DE';

  const animate = (el: HTMLElement): void => {
    const raw = el.dataset.counter ?? '0';

    // Non-animating special cases
    if (raw === '24/7') { el.textContent = '24/7'; return; }
    if (raw === '0') { el.textContent = '0'; return; }

    const hasSuffix = raw.endsWith('+');
    const numStr = raw.replace(/[^0-9]/g, '');
    const target = parseInt(numStr, 10);
    const useThousands = target >= 1000;

    const start = performance.now();

    function frame(now: number): void {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const current = Math.round(easeOutQuart(progress) * target);

      let display = useThousands
        ? current.toLocaleString(locale)
        : String(current);
      if (hasSuffix) display += '+';
      el.textContent = display;

      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  };

  // Respect prefers-reduced-motion: skip animation, show final value immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => {
      el.textContent = el.dataset.counter ?? '0';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  elements.forEach((el) => observer.observe(el));
}
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/scripts/counter.ts && git commit -m "feat: add counter animation script with IntersectionObserver"
```

---

## Task 5: Neue Komponente — BrandBar

**Files:**
- Create: `src/components/BrandBar.astro`

- [ ] **Step 1: `src/components/BrandBar.astro` erstellen**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}
const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const brands = [
  'Microsoft Azure',
  'Windows Server',
  'PowerShell',
  'Hyper-V',
  'Docker',
  'Cloudflare',
  'n8n',
  'Python',
  'Claude AI',
  'OpenAI',
  'Ollama',
  'Automic UC4',
];
---

<div class="border-y border-white/[0.06] bg-[#0c1322] py-4">
  <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 md:px-10 lg:px-12">
    <span class="mr-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
      {isEnglish ? 'Technologies' : 'Technologien'}
    </span>
    {brands.map((brand) => (
      <span class="rounded-full border border-white/[0.07] px-3 py-1 text-[11px] font-semibold text-white/[0.28]">
        {brand}
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler. (BrandBar ist noch nicht in den Seiten eingebunden — das kommt in Task 14.)

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/BrandBar.astro && git commit -m "feat: add BrandBar component with technology tags"
```

---

## Task 6: Neue Komponente — Numbers

**Files:**
- Create: `src/components/Numbers.astro`

- [ ] **Step 1: `src/components/Numbers.astro` erstellen**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}
const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const stats = isEnglish
  ? [
      { value: '10+', label: 'Years of enterprise automation' },
      { value: '1.000+', label: 'Virtual machines administered' },
      { value: '24/7', label: 'Infrastructure that actually runs' },
      { value: '0', label: 'Projects handed over without documentation' },
    ]
  : [
      { value: '10+', label: 'Jahre Enterprise-Automatisierung' },
      { value: '1.000+', label: 'Virtuelle Maschinen administriert' },
      { value: '24/7', label: 'Infrastruktur, die wirklich läuft' },
      { value: '0', label: 'Projekte ohne Dokumentation übergeben' },
    ];
---

<section
  class="bg-gradient-to-br from-teal to-sky-600 py-14"
  aria-label={isEnglish ? 'Key facts' : 'Kennzahlen'}
>
  <div class="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:px-10 lg:grid-cols-4 lg:px-12">
    {stats.map((stat) => (
      <div class="text-center" data-reveal>
        <span
          class="block text-[clamp(2rem,4vw,2.5rem)] font-black tracking-tight text-white"
          data-counter={stat.value}
        >
          {stat.value}
        </span>
        <span class="mt-1 block text-xs leading-snug text-white/70">
          {stat.label}
        </span>
      </div>
    ))}
  </div>
</section>

<script>
  import { initCounters } from '../scripts/counter';
  initCounters();
</script>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/Numbers.astro && git commit -m "feat: add Numbers band component with counter animation"
```

---

## Task 7: Hero — Kompletter Rewrite

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: `src/components/Hero.astro` komplett ersetzen**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const stats = isEnglish
  ? [
      { value: '10+', label: 'Years in Enterprise IT' },
      { value: '1,000+', label: 'VMs administered' },
      { value: '24/7', label: 'Infrastructure that runs' },
    ]
  : [
      { value: '10+', label: 'Jahre Enterprise-IT' },
      { value: '1.000+', label: 'VMs administriert' },
      { value: '24/7', label: 'Infrastruktur, die läuft' },
    ];

const content = isEnglish
  ? {
      eyebrow: 'Automation · AI Integration · IT Infrastructure',
      headline: 'Less effort.\nMore of what\nmatters.',
      subline: 'Every business wastes time — on tasks that could have been automated long ago. <strong>What large organisations take for granted</strong>, I bring to businesses of every size: precisely implemented, fully documented, built to last.',
      primaryCta: 'View Services',
      primaryHref: '#services',
      secondaryCta: 'Get in Touch',
      secondaryHref: '#contact',
      personRole: 'IT Automation & AI Integration',
    }
  : {
      eyebrow: 'Automatisierung · KI-Integration · IT-Infrastruktur',
      headline: 'Weniger Aufwand.\nMehr von dem,\nwas zählt.',
      subline: 'Jedes Unternehmen verschwendet Zeit — auf Aufgaben, die längst automatisiert sein könnten. <strong>Was in Großorganisationen Standard ist</strong>, bringe ich in Betriebe jeder Größe: präzise umgesetzt, vollständig dokumentiert, dauerhaft stabil.',
      primaryCta: 'Leistungen ansehen',
      primaryHref: '#leistungen',
      secondaryCta: 'Kontakt aufnehmen',
      secondaryHref: '#kontakt',
      personRole: 'IT-Automatisierung & KI-Integration',
    };
---

<section
  class="relative isolate min-h-screen overflow-hidden bg-navy text-white"
  aria-labelledby="hero-heading"
>
  <!-- Background layers -->
  <canvas
    id="hero-canvas"
    class="pointer-events-none absolute inset-0 h-full w-full"
    style="z-index:1"
    aria-hidden="true"
  ></canvas>
  <div
    class="animate-breathe pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal/[0.18] blur-3xl"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-24 -right-24 h-[300px] w-[300px] rounded-full bg-sky-400/10 blur-3xl"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle,_rgba(255,255,255,0.2)_1px,_transparent_1px)] [background-size:24px_24px]"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent"
    aria-hidden="true"
  ></div>

  <!-- Content -->
  <div class="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-32 md:px-10 lg:px-12" style="z-index:2">
    <div class="max-w-2xl">
      <!-- Eyebrow -->
      <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-teal motion-safe:animate-fade-in">
        {content.eyebrow}
      </p>

      <!-- Headline with gradient -->
      <h1
        id="hero-heading"
        class="mt-5 whitespace-pre-line text-[clamp(2.4rem,5vw,3.5rem)] font-black leading-[1.07] tracking-[-0.04em] motion-safe:animate-fade-up [animation-delay:60ms]"
        style="background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 55%, #7dd3fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
      >
        {content.headline}
      </h1>

      <!-- Subline -->
      <p
        class="mt-6 max-w-[560px] text-base leading-[1.78] text-white/55 motion-safe:animate-fade-up [animation-delay:120ms]"
        set:html={content.subline.replace(/<strong>/g, '<strong class="font-medium text-white/[0.82]">') }
      />

      <!-- CTAs -->
      <div class="mt-8 flex flex-wrap gap-3 motion-safe:animate-fade-up [animation-delay:180ms]">
        <a
          href={content.primaryHref}
          class="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-sky-500"
        >
          {content.primaryCta}
        </a>
        <a
          href={content.secondaryHref}
          class="inline-flex items-center justify-center rounded-full border border-white/[0.14] bg-transparent px-6 py-3 text-sm font-semibold text-white/65 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06]"
        >
          {content.secondaryCta}
        </a>
      </div>

      <!-- Stats row -->
      <div class="mt-10 flex flex-wrap gap-7 motion-safe:animate-fade-up [animation-delay:240ms]">
        {stats.map((stat) => (
          <div>
            <p class="text-2xl font-black tracking-tight text-teal">{stat.value}</p>
            <p class="mt-0.5 text-[10px] text-white/35">{stat.label}</p>
          </div>
        ))}
      </div>

      <!-- Signed Strip (Option B) -->
      <div class="mt-8 flex max-w-sm flex-wrap items-center gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-sm motion-safe:animate-fade-up [animation-delay:300ms]">
        <img
          src="/images/paul-scholz.jpg"
          alt="Paul Scholz"
          width="36"
          height="36"
          loading="eager"
          decoding="async"
          class="h-9 w-9 flex-shrink-0 rounded-full border border-teal/40 object-cover object-center"
        />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold leading-none text-slate-100">Paul Scholz</p>
          <p class="mt-1 text-[10px] leading-none text-slate-600">{content.personRole}</p>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/p-scholz/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] font-semibold text-blue-400 transition-colors hover:text-blue-300"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href="https://github.com/PiefkePaul"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] font-semibold text-white/40 transition-colors hover:text-white/70"
            aria-label="GitHub"
          >
            gh
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  import { initHeroCanvas } from '../scripts/hero-canvas';
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null;
  if (canvas) initHeroCanvas(canvas);
</script>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler. Hinweis: Das `set:html` Direktiv ist Astro-nativer Raw-HTML-Renderer für den Subline-Text.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/Hero.astro && git commit -m "feat: rewrite Hero with canvas particles, gradient headline, Signed Strip"
```

---

## Task 8: WhatISolve — Neue Texte + 6. CTA-Karte

**Files:**
- Modify: `src/components/WhatISolve.astro`

- [ ] **Step 1: `src/components/WhatISolve.astro` komplett ersetzen**

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
        problem: '"Our team clicks through the same 50 steps every single day — by hand."',
        solution: 'An automated workflow takes over completely. Done in seconds, not hours, without errors.',
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        problem: '"Our data sits in three different systems that never sync."',
        solution: 'Connected systems, one source of truth — no more manual data transfer.',
        icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
      },
      {
        problem: '"We want to use AI but don\'t know where to start or what it will cost."',
        solution: 'Honest feasibility analysis, clear proposal — only what actually delivers value.',
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        problem: '"Our server works somehow — but nobody really knows how."',
        solution: 'Clean, documented infrastructure that anyone can understand and maintain at any time.',
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        problem: '"We need a tool that simply doesn\'t exist yet."',
        solution: 'Custom software — built for exactly this problem, nothing more and nothing less.',
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ]
  : [
      {
        problem: '„Unsere Mitarbeiter erledigen täglich dieselben 50 Schritte — von Hand."',
        solution: 'Ein automatisierter Workflow übernimmt das vollständig. In Sekunden statt Stunden, ohne Fehler.',
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        problem: '„Unsere Daten stecken in drei Systemen, die sich nie synchronisieren."',
        solution: 'Verbundene Systeme, eine Quelle der Wahrheit — keine manuelle Datenübertragung mehr.',
        icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
      },
      {
        problem: '„Wir wollen KI einsetzen, wissen aber nicht wo und was es kostet."',
        solution: 'Ehrliche Machbarkeitsanalyse, klarer Vorschlag — nur was wirklich Mehrwert liefert.',
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        problem: '„Unser Server läuft irgendwie — aber niemand weiß wirklich wie."',
        solution: 'Saubere, dokumentierte Infrastruktur, die jeder versteht und jederzeit warten kann.',
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        problem: '„Wir brauchen ein Tool, das es so noch nicht gibt."',
        solution: 'Maßgeschneiderte Software — gebaut für genau dieses Problem, nicht für den allgemeinen Fall.',
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ];
---

<section
  id={isEnglish ? 'what-i-solve' : 'was-ich-loese'}
  class="bg-navy py-24 sm:py-28"
  aria-labelledby="solve-heading"
>
  <div class="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
    <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-teal" data-reveal>
      {isEnglish ? 'Problems I solve' : 'Einsatzgebiete'}
    </p>
    <h2
      id="solve-heading"
      class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl"
      data-reveal
      data-reveal-delay="60"
    >
      {isEnglish
        ? 'Most know the problem.\nFew know the solution.'
        : 'Das Problem kennen die meisten.\nDie Lösung nicht.'}
    </h2>
    <p
      class="mt-4 max-w-2xl text-base leading-7 text-white/55"
      data-reveal
      data-reveal-delay="120"
    >
      {isEnglish
        ? 'Employees click through the same workflows. Data sits scattered and won\'t connect. IT infrastructure that runs somehow — until it doesn\'t. None of these problems are unsolvable.'
        : 'Mitarbeiter klicken sich durch dieselben Abläufe. Daten liegen verteilt und lassen sich nicht zusammenführen. IT-Infrastruktur, die irgendwie läuft — bis sie es nicht mehr tut. Keines dieser Probleme ist unlösbar.'}
    </p>

    <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {scenarios.map((s, i) => (
        <div
          class="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-200 hover:border-teal/30 hover:bg-teal/[0.04]"
          data-reveal
          data-reveal-delay={String(i * 60)}
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d={s.icon}></path>
            </svg>
          </div>
          <p class="mt-5 text-sm font-semibold italic leading-6 text-slate-200">
            {s.problem}
          </p>
          <p class="mt-3 text-sm leading-6 text-white/45">
            {s.solution}
          </p>
        </div>
      ))}

      <!-- 6th card: CTA -->
      <div
        class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-transparent p-6 text-center opacity-60 transition-opacity hover:opacity-90"
        data-reveal
        data-reveal-delay="300"
      >
        <p class="text-sm text-white/50">
          {isEnglish ? 'Your situation is not listed?' : 'Ihre Situation ist nicht dabei?'}
        </p>
        <a
          href={isEnglish ? '#contact' : '#kontakt'}
          class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-sky-400 transition-colors"
        >
          {isEnglish ? 'Get in touch →' : 'Jetzt ansprechen →'}
        </a>
      </div>
    </div>

    <div class="mt-10" data-reveal>
      <a
        href={isEnglish ? '#contact' : '#kontakt'}
        class="inline-flex items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal/70"
      >
        {isEnglish ? 'Talk about your situation' : 'Über Ihre Situation sprechen'}
        <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/WhatISolve.astro && git commit -m "feat: update WhatISolve with Sog-Ton copy, dark scheme, 6th CTA card"
```

---

## Task 9: Services — Neue Prosatexte + Brand-Tags + Dark-Schema

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: `src/components/Services.astro` komplett ersetzen**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const services = isEnglish
  ? [
      {
        title: 'Process Automation',
        description: 'Recurring workflows cost more than you think — in time, errors and concentration. With <strong>Microsoft PowerShell</strong>, <strong>Python</strong> and intelligent workflow platforms like <strong>n8n</strong> or <strong>Automic UC4</strong>, processes emerge that run reliably without anyone needing to be there.',
        tags: ['PowerShell', 'Python', 'n8n', 'Automic UC4'],
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        title: 'AI & LLM Integration',
        description: 'Artificial intelligence is no longer a future topic — but meaningful deployment requires experience. From feasibility analysis to production with <strong>Claude AI</strong>, <strong>OpenAI</strong> or local models via <strong>Ollama</strong>: with clear benefit, without buzzwords.',
        tags: ['Claude AI', 'OpenAI', 'Ollama', 'RAG Pipelines'],
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        title: 'IT Infrastructure',
        description: 'Infrastructure you forget — because it simply runs. Containerised deployments with <strong>Docker</strong>, secured via <strong>Cloudflare</strong>, scalable from a single server to the cloud. On-premises, hybrid or fully cloud-based.',
        tags: ['Docker', 'Cloudflare', 'Microsoft Azure', 'Hyper-V'],
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        title: 'Software & Web',
        description: 'When no existing tool solves the problem, I build it. Fast websites, internal tools, automation dashboards — modern stack with <strong>Astro</strong> and <strong>Python</strong>, lean implementation, SEO fundamentals where it makes sense.',
        tags: ['Astro', 'Python', 'Tailwind', 'SEO'],
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ]
  : [
      {
        title: 'Prozessautomatisierung',
        description: 'Wiederkehrende Abläufe kosten mehr als man denkt — in Zeit, Fehlern und Konzentration. Mit <strong>Microsoft PowerShell</strong>, <strong>Python</strong> und intelligenten Workflow-Plattformen wie <strong>n8n</strong> oder <strong>Automic UC4</strong> entstehen Prozesse, die zuverlässig laufen, ohne dass jemand dabei sein muss.',
        tags: ['PowerShell', 'Python', 'n8n', 'Automic UC4'],
        icon: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906'
      },
      {
        title: 'KI- & LLM-Integration',
        description: 'Künstliche Intelligenz ist kein Zukunftsthema mehr — aber sinnvoller Einsatz erfordert Erfahrung. Von der Machbarkeitsanalyse bis zum Produktiveinsatz von <strong>Claude AI</strong>, <strong>OpenAI</strong> oder lokalen Modellen via <strong>Ollama</strong>: mit klarem Nutzen, ohne Buzzwords.',
        tags: ['Claude AI', 'OpenAI', 'Ollama', 'RAG-Pipelines'],
        icon: 'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
      },
      {
        title: 'IT-Infrastruktur',
        description: 'Infrastruktur, die man vergisst — weil sie einfach läuft. Containerisierte Deployments mit <strong>Docker</strong>, abgesichert über <strong>Cloudflare</strong>, skalierbar von einem Server bis in die Cloud. On-Premises, hybrid oder vollständig cloudbasiert.',
        tags: ['Docker', 'Cloudflare', 'Microsoft Azure', 'Hyper-V'],
        icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H3m16.5 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m6 0h1.5m-7.5-3V5.625'
      },
      {
        title: 'Software & Web',
        description: 'Wenn kein fertiges Tool das Problem löst, baue ich es. Schnelle Websites, interne Tools, Automatisierungs-Dashboards — moderner Stack mit <strong>Astro</strong> und <strong>Python</strong>, schlanke Umsetzung, SEO-Grundlagen inklusive wo es sinnvoll ist.',
        tags: ['Astro', 'Python', 'Tailwind', 'SEO'],
        icon: 'M6.75 7.5 3 12l3.75 4.5M17.25 7.5 21 12l-3.75 4.5M13.5 4.5l-3 15'
      },
    ];
---

<section
  id={isEnglish ? 'services' : 'leistungen'}
  class="bg-[#0c1322] py-24 sm:py-28"
  aria-labelledby="services-heading"
>
  <div class="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
    <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-teal" data-reveal>
      {isEnglish ? 'Services' : 'Leistungen'}
    </p>
    <h2
      id="services-heading"
      class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl"
      data-reveal
      data-reveal-delay="60"
    >
      {isEnglish ? 'What I build and deliver.' : 'Was ich baue und liefere.'}
    </h2>
    <p
      class="mt-4 max-w-2xl text-base leading-7 text-white/50"
      data-reveal
      data-reveal-delay="120"
    >
      {isEnglish
        ? 'No half-measures. No technology for technology\'s sake. Every project ends with a handover that still works a year later.'
        : 'Keine halben Lösungen. Keine Technologie um der Technologie willen. Jedes Projekt endet mit einer Übergabe, die auch in einem Jahr noch funktioniert.'}
    </p>

    <div class="mt-12 grid gap-5 sm:grid-cols-2">
      {services.map((service, i) => (
        <article
          class="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:bg-teal/[0.04]"
          data-reveal
          data-reveal-delay={String(i * 80)}
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d={service.icon}></path>
            </svg>
          </div>
          <h3 class="mt-5 text-lg font-bold text-white">
            {service.title}
          </h3>
          <p
            class="mt-3 flex-1 text-sm leading-7 text-white/45 [&_strong]:font-medium [&_strong]:text-white/70"
            set:html={service.description}
          />
          <div class="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
            {service.tags.map((tag) => (
              <span class="rounded-full border border-teal/20 bg-teal/[0.08] px-3 py-1 text-[10px] font-semibold text-teal/80">
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/Services.astro && git commit -m "feat: update Services with Sog-Ton prose, brand tags, dark scheme"
```

---

## Task 10: About — Dark-Schema + Prosa + Person-Card

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: `src/components/About.astro` komplett ersetzen**

```astro
---
interface Props {
  lang?: 'de' | 'en';
}

const { lang = 'de' } = Astro.props;
const isEnglish = lang === 'en';

const techTags = [
  'Enterprise IT', 'Hyper-V / SCVMM', 'PowerShell', 'Automic UC4',
  'Docker', 'Python', 'n8n', 'Claude AI', 'Cloudflare',
];

const content = isEnglish
  ? {
      id: 'about',
      label: 'Profile',
      heading: 'One person. Directly reachable.\nWith real experience.',
      para1: 'I\'m Paul Scholz — IT specialist, automation engineer and the person behind this website. No team, no agency, no middlemen. If you write, I read it. If I answer, it\'s my assessment.',
      para2: 'For over a decade, I was responsible for keeping critical automation infrastructure running at one of Germany\'s largest government agencies — hundreds of Hyper-V hosts, thousands of virtual machines, pipelines with <em>Automic UC4</em> and <em>Microsoft PowerShell</em> processing tens of thousands of jobs daily. Enterprise standard, under real operational pressure.',
      para3: 'I bring this experience to projects where it matters. <strong>Without enterprise overhead, but with enterprise quality.</strong> What I build is meant for production — not for presentation. It runs even when nobody is watching.',
      para4: 'Privately, I run an extensive homelab: Docker stacks, local AI models via Ollama, self-hosted services. Not as a hobby — but as a development environment. Everything I recommend, I\'ve had in use myself.',
      personRole: 'IT Automation & AI Integration',
      tagsTitle: 'Toolbox',
    }
  : {
      id: 'ueber-mich',
      label: 'Profil',
      heading: 'Eine Person. Direkt erreichbar.\nMit echter Erfahrung.',
      para1: 'Ich bin Paul Scholz — IT-Spezialist, Automatisierungsentwickler und der Ansprechpartner hinter dieser Website. Kein Team, keine Agentur, keine Zwischenhändler. Wenn Sie schreiben, lese ich es. Wenn ich antworte, ist es meine Einschätzung.',
      para2: 'Über ein Jahrzehnt lang habe ich in einer der größten deutschen Bundesbehörden verantwortet, dass kritische Automatisierungsinfrastruktur läuft — hunderte von <em>Hyper-V-Hosts</em>, tausende virtuelle Maschinen, Pipelines mit <em>Automic UC4</em> und <em>Microsoft PowerShell</em>, die täglich zehntausende Jobs verarbeiteten. Enterprise-Standard, unter echtem Betriebsdruck.',
      para3: 'Diese Erfahrung bringe ich heute in Projekte, wo es darauf ankommt. <strong>Ohne Enterprise-Overhead, aber mit Enterprise-Qualität.</strong> Was ich baue, ist für den Betrieb gedacht — nicht für die Präsentation. Es läuft auch dann, wenn niemand hinschaut.',
      para4: 'Privat betreibe ich ein umfangreiches Homelab: Docker-Stacks, lokale KI-Modelle via <em>Ollama</em>, selbst gehostete Dienste. Nicht als Hobby — sondern als Entwicklungsumgebung. Alles was ich empfehle, habe ich selbst im Einsatz gehabt.',
      personRole: 'IT-Automatisierung & KI-Integration',
      tagsTitle: 'Werkzeugkasten',
    };
---

<section
  id={content.id}
  class="bg-navy py-24 sm:py-28"
  aria-labelledby={`${content.id}-heading`}
>
  <div class="mx-auto grid max-w-6xl gap-12 px-6 md:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:px-12">

    <!-- Left: prose -->
    <div data-reveal>
      <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-teal">
        {content.label}
      </p>
      <h2
        id={`${content.id}-heading`}
        class="mt-4 whitespace-pre-line text-3xl font-black tracking-tight text-white sm:text-4xl"
      >
        {content.heading}
      </h2>
      <div class="mt-7 space-y-5 text-base leading-8 text-white/50 [&_strong]:font-medium [&_strong]:text-white/80 [&_em]:not-italic [&_em]:text-sky-300/80">
        <p>{content.para1}</p>
        <p set:html={content.para2} />
        <p set:html={content.para3} />
        <p set:html={content.para4} />
      </div>
    </div>

    <!-- Right: person card + tech tags -->
    <aside class="flex flex-col gap-5" data-reveal data-reveal-delay="120">

      <!-- Person card -->
      <div class="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-6 backdrop-blur-sm">
        <div class="flex items-center gap-4">
          <img
            src="/images/paul-scholz.jpg"
            alt="Paul Scholz"
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
            class="h-14 w-14 flex-shrink-0 rounded-full border-2 border-teal/35 object-cover object-center"
          />
          <div>
            <p class="text-base font-bold text-slate-100">Paul Scholz</p>
            <p class="mt-0.5 text-xs text-slate-600">{content.personRole}</p>
          </div>
        </div>
        <div class="mt-5 flex flex-col gap-2.5">
          <a
            href="https://www.linkedin.com/in/p-scholz/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-blue-400 transition-all hover:border-blue-400/30 hover:bg-blue-400/[0.06]"
          >
            <svg class="h-3.5 w-3.5 flex-shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
            linkedin.com/in/p-scholz
          </a>
          <a
            href="https://github.com/PiefkePaul"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-white/50 transition-all hover:border-white/20 hover:text-white/80"
          >
            <svg class="h-3.5 w-3.5 flex-shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            github.com/PiefkePaul
          </a>
        </div>
      </div>

      <!-- Tech tags -->
      <div class="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
        <h3 class="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-700">
          {content.tagsTitle}
        </h3>
        <div class="mt-4 flex flex-wrap gap-2">
          {techTags.map((tag) => (
            <span class="rounded-full border border-white/[0.09] px-3 py-1.5 text-[10px] font-medium text-white/45">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  </div>
</section>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/About.astro && git commit -m "feat: rewrite About with dark scheme, 4-para prose, person card, LinkedIn"
```

---

## Task 11: Portfolio — Dark-Schema

**Files:**
- Modify: `src/components/Portfolio.astro`

Nur die Farben ändern — Inhalt bleibt identisch.

- [ ] **Step 1: Background und Card-Farben auf Dark-Schema umstellen**

Ersetze in `src/components/Portfolio.astro`:

Zeile 75: `<section id="portfolio" class="bg-slate-50 py-24 sm:py-28" ...>`
→ `<section id="portfolio" class="bg-[#0c1322] py-24 sm:py-28" ...>`

Zeile 84: `class="mt-4 max-w-2xl text-base leading-7 text-slate-600"`
→ `class="mt-4 max-w-2xl text-base leading-7 text-white/50"`

Zeile 80 (h2): `class="mt-4 text-3xl font-semibold tracking-tight text-navy sm:text-4xl"`
→ `class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"`

Zeile 83 (eyebrow p): kein change needed (teal ist gut auf dark)

Zeile 85 (GitHub link): `class="font-semibold text-teal hover:text-sky-600"`
→ `class="font-semibold text-teal hover:text-sky-400"`

Zeile 98 (article): `class="flex h-full flex-col rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200"`
→ `class="flex h-full flex-col rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-8 transition-all hover:border-teal/30"`

Zeile 100 (icon container): `class="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white"`
→ `class="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal"`

Zeile 104 (h3): `class="mt-6 text-2xl font-semibold text-navy"`
→ `class="mt-6 text-2xl font-semibold text-white"`

Zeile 106 (name p): `(keine Klasse explizit)` → bleibt (text-slate-400 ist gut auf dark)

Zeile 108 (description p): `class="mt-4 flex-1 text-sm leading-7 text-slate-600"`
→ `class="mt-4 flex-1 text-sm leading-7 text-white/45"`

Zeile 113–120 (CTA link): `class="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"`
→ `class="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-teal hover:text-teal"`

Zeile 122–124 ("Coming soon" span): `class="mt-8 inline-flex w-fit items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500"`
→ `class="mt-8 inline-flex w-fit items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/40"`

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/Portfolio.astro && git commit -m "feat: update Portfolio to dark scheme"
```

---

## Task 12: Contact — LinkedIn + neutraler Text

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: LinkedIn-Link ergänzen und Help-Text neutralisieren**

In `src/components/Contact.astro`:

**1a) Content-Objekte erweitern** — zum EN-Content-Objekt (Zeile ~9) `linkedIn` und neutralen `helpMe` hinzufügen:

EN-Objekt (ab Zeile 9): `helpMe` ersetzen und `linkedIn` hinzufügen:
```
helpMe: 'Most helpful: a brief description of the situation, what is envisioned, and whether there is a timeline.',
linkedIn: 'https://www.linkedin.com/in/p-scholz/',
```

DE-Objekt (ab Zeile 28): `helpMe` ersetzen und `linkedIn` hinzufügen:
```
helpMe: 'Am hilfreichsten: eine kurze Beschreibung der Situation, was vorgestellt wird, und ob es einen Zeitrahmen gibt.',
linkedIn: 'https://www.linkedin.com/in/p-scholz/',
```

**1b) LinkedIn-Eintrag in der Kontaktinfo-Box ergänzen** — nach dem GitHub-`<div>` (Zeile ~98) einfügen:

```astro
<div>
  <dt class="font-semibold text-white">LinkedIn</dt>
  <dd class="mt-1">
    <a
      href={content.linkedIn}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
    >
      <svg aria-hidden="true" class="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
      linkedin.com/in/p-scholz
    </a>
  </dd>
</div>
```

- [ ] **Step 2: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler. Falls TypeScript über die neuen Properties meckert: Interface Props in Contact.astro hat kein explizites Interface für den content-Typ — das ist keine TS-Verletzung, da content ein Plain Object ist.

- [ ] **Step 3: Committen**

```bash
cd /w/Website && git add src/components/Contact.astro && git commit -m "feat: add LinkedIn to Contact, neutralize help text"
```

---

## Task 13: BaseLayout — personRole + LinkedIn sameAs + Scroll-Reveal init

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: personRole aktualisieren**

Ersetze Zeile 21–24:
```typescript
// ALT:
personRole = lang === 'de'
  ? 'IT-Systemadministrator und SEO-Berater'
  : 'IT systems administrator and SEO consultant',

// NEU:
personRole = lang === 'de'
  ? 'IT-Automatisierung, KI-Integration & Infrastruktur'
  : 'IT Automation, AI Integration & Infrastructure',
```

- [ ] **Step 2: LinkedIn zu sameAs hinzufügen**

Ersetze den `sameAs`-Array (Zeile ~52):
```typescript
sameAs: [
  'https://www.linkedin.com/in/p-scholz/',
  'https://github.com/PiefkePaul',
  'https://hub.docker.com/r/piefkepaul/',
  'https://www.instagram.com/lowfuel.dad/'
],
```

- [ ] **Step 3: Meta-Descriptions werden auf den Index-Seiten gesetzt — hier nichts ändern**

- [ ] **Step 4: Scroll-Reveal CSS in BaseLayout ergänzen (verhindert FOUC)**

Im `<style is:global>` Block von `BaseLayout.astro` — direkt nach der `::selection` Regel — einfügen:

```css
/* Scroll-reveal: hide elements before script runs (only when motion is allowed) */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    will-change: opacity, transform;
  }
}
```

- [ ] **Step 5: Scroll-Reveal Script in BaseLayout einbinden**

Direkt vor `</body>` (Zeile 141, nach dem `<style is:global>`) einfügen:

```astro
<script>
  import { initScrollReveal } from '../scripts/scroll-reveal';
  initScrollReveal();
</script>
```

- [ ] **Step 6: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler.

- [ ] **Step 7: Committen**

```bash
cd /w/Website && git add src/layouts/BaseLayout.astro && git commit -m "feat: update BaseLayout personRole, add LinkedIn to sameAs, init scroll-reveal"
```

---

## Task 14: Index-Seiten — Neue Komponenten einbinden, Process + TechStack entfernen

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Step 1: `src/pages/index.astro` komplett ersetzen**

```astro
---
import About from '../components/About.astro';
import BrandBar from '../components/BrandBar.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import Navigation from '../components/Navigation.astro';
import Numbers from '../components/Numbers.astro';
import Portfolio from '../components/Portfolio.astro';
import Services from '../components/Services.astro';
import WhatISolve from '../components/WhatISolve.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  lang="de"
  title="Paul Scholz | IT-Automatisierung, KI-Integration & Infrastruktur"
  description="Paul Scholz — IT-Automatisierung, KI-Integration und Infrastruktur für Unternehmen jeder Größe. Über 10 Jahre Enterprise-Erfahrung. Direkt, ohne Agentur."
>
  <Navigation lang="de" />
  <main>
    <Hero lang="de" />
    <BrandBar lang="de" />
    <WhatISolve lang="de" />
    <Services lang="de" />
    <Numbers lang="de" />
    <About lang="de" />
    <Portfolio lang="de" />
    <Contact lang="de" />
  </main>
  <Footer lang="de" />
</BaseLayout>
```

- [ ] **Step 2: `src/pages/en/index.astro` komplett ersetzen**

```astro
---
import About from '../../components/About.astro';
import BrandBar from '../../components/BrandBar.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';
import Hero from '../../components/Hero.astro';
import Navigation from '../../components/Navigation.astro';
import Numbers from '../../components/Numbers.astro';
import Portfolio from '../../components/Portfolio.astro';
import Services from '../../components/Services.astro';
import WhatISolve from '../../components/WhatISolve.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout
  lang="en"
  title="Paul Scholz | IT Automation, AI Integration & Infrastructure"
  description="Paul Scholz — IT automation, AI integration and infrastructure for businesses of all sizes. 10+ years enterprise experience. Direct, no agency."
>
  <Navigation lang="en" />
  <main>
    <Hero lang="en" />
    <BrandBar lang="en" />
    <WhatISolve lang="en" />
    <Services lang="en" />
    <Numbers lang="en" />
    <About lang="en" />
    <Portfolio lang="en" />
    <Contact lang="en" />
  </main>
  <Footer lang="en" />
</BaseLayout>
```

- [ ] **Step 3: Build prüfen**

```bash
cd /w/Website && npm run build
```

Erwartet: Build erfolgreich. Process.astro und TechStack.astro werden zwar nicht mehr importiert, aber die Dateien bleiben erhalten — kein Fehler.

- [ ] **Step 4: Dev-Server starten + Seite visuell prüfen**

```bash
cd /w/Website && npm run dev
```

Prüfliste im Browser (http://localhost:4321):
- [ ] Hero: Gradient-Headline sichtbar, Canvas-Partikel bewegen sich, Signed Strip mit Foto + LinkedIn/GitHub
- [ ] BrandBar: Technologie-Tags zwischen Hero und WhatISolve
- [ ] WhatISolve: Dark-Hintergrund, 6 Karten sichtbar, 6. Karte mit gestricheltem Border
- [ ] Services: Dark-Hintergrund, Brand-Tags als Teal-Pills unter jedem Card
- [ ] Numbers: Teal-Gradient-Band, Counter-Animation beim Scrollen
- [ ] About: Dark-Hintergrund, Person-Card mit Foto + LinkedIn/GitHub, Tech-Tags
- [ ] Portfolio: Dark-Hintergrund, Cards mit Dark-Scheme
- [ ] Contact: LinkedIn-Link in der linken Spalte sichtbar
- [ ] EN-Seite (/en): gleiche Prüfliste auf http://localhost:4321/en

- [ ] **Step 5: Finaler Build**

```bash
cd /w/Website && npm run build
```

Erwartet: Keine Fehler, keine Warnungen über fehlende Importe.

- [ ] **Step 6: Committen**

```bash
cd /w/Website && git add src/pages/index.astro src/pages/en/index.astro && git commit -m "feat: wire up BrandBar and Numbers, remove Process and TechStack from pages"
```

---

## Abschluss-Checkliste

Nach Task 14 folgendes überprüfen:

- [ ] `npm run build` läuft ohne Fehler durch
- [ ] Alle 14 Commits sind im Git-Log vorhanden
- [ ] DE-Seite (`/`) und EN-Seite (`/en`) funktionieren vollständig
- [ ] Formspree-Formular auf `/` ist functional (Testformular ausfüllen)
- [ ] Hero-Canvas-Partikel sind auf Mobile nicht zu performance-intensiv (auf 40 Partikel begrenzt)
- [ ] Scroll-Reveal funktioniert auf allen Sections
- [ ] Counter in Numbers zählt beim Scrollen hoch
- [ ] LinkedIn-Links auf https://www.linkedin.com/in/p-scholz/ (alle drei Stellen: Hero Signed Strip, About Person-Card, Contact)
