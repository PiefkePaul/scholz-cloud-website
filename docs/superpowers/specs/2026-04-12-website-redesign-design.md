# Website Redesign — Design Spec

> **Approved visual spec for scholz-cloud.de full redesign.**
> Alle Design-Entscheidungen wurden interaktiv mit dem Auftraggeber abgestimmt.

---

## 1. Rahmenbedingungen

| Punkt | Entscheidung |
|---|---|
| Stack | Astro 4.16 + Tailwind CSS 3.4 + TypeScript (unverändert) |
| Farben | Navy `#0f172a` + Teal `#0ea5e9` (unverändert) |
| Schrift | Inter (Google Fonts, unverändert) |
| Sprachen | DE (primär) + EN via `lang` prop pattern |
| Formspree ID | `xykbqngy` (bestehend, behalten) |
| LinkedIn | https://www.linkedin.com/in/p-scholz/ |
| GitHub | https://github.com/PiefkePaul |
| Foto | `/images/paul-scholz.jpg` (vorhanden) |

---

## 2. Design-Richtung: Precision Dark

**Entschieden:** Option A — Precision Dark.

- Tiefer Navy-Hintergrund `#0f172a` als Basis
- Teal-Gradient-Text auf Haupt-Headlines (`linear-gradient(135deg, #fff, #e0f2fe, #7dd3fc)`)
- Glassmorphismus-Elemente (border `rgba(255,255,255,0.09)`, bg `rgba(255,255,255,0.04)`, `backdrop-filter: blur`)
- Subtile Dot-Pattern-Backgrounds (`radial-gradient` 1px Punkte, 24px Grid, opacity 0.1)
- Radiale Glow-Blobs in Teal hinter Hero + Abschnitten

---

## 3. Animations-Strategie (kein GSAP, kein Three.js)

**Entschieden:** Mix B+C ohne Cursor-Glow.

| Animation | Umsetzung | Einsatzort |
|---|---|---|
| Staggered Scroll-Reveal | `IntersectionObserver` + CSS `fade-in-up` Klasse, `animation-delay` per Index | Alle Sections außer Hero |
| Breathing Gradient | CSS `@keyframes breathe` — `background-position` + leichte scale | Hero-Hintergrund |
| Canvas Particles | Vanilla JS Canvas, ~40 Partikel, langsame Drift, Teal/Weiß, opacity 0.15–0.4 | Hero (hinter Content) |
| Counter Animation | Vanilla JS, `IntersectionObserver` auslösen, easeOutQuart, 1.2s | Numbers-Band (Stat-Werte) |
| Hover-Lift | `transition-transform`, `hover:-translate-y-1.5` | Service-Cards, Solve-Cards |

**Performance-Garantie:** Canvas wird mit `requestAnimationFrame` gesteuert, pausiert bei `document.hidden`. Partikel-Array bleibt fix bei 40. Kein GSAP, kein Three.js, kein Cursor-Glow.

---

## 4. Prose-Richtung: Sog-Ton

**Entschieden:** Richtung B — Sog-Ton.

- Problem des Lesers zuerst — dann Lösung
- Fließtext mit echten Markennamen (PowerShell, Docker, n8n, Cloudflare, Automic UC4, Claude AI, Ollama, etc.)
- **Kein "du/dir"** für Besucher — neutral oder "Sie" im formellen Kontext
- "ich" / "Paul Scholz" für die Person — kein "wir", kein Unternehmensduktus
- Selbstbewusst aber nicht überheblich

---

## 5. Seitenstruktur (8 Sections, keine Process-Section)

```
1. Hero           — navy bg, Gradient-Headline, Canvas-Partikel, Signed Strip
2. Brand-Bar      — Technologie-Logos/Tags, navy-dunkel bg
3. WhatISolve     — 5+1 Problem-Karten (navy bg)
4. Services       — 4 Service-Cards mit Brand-Tags (dunkleres navy)
5. Numbers        — Teal-Band, 4 Counter-Stats
6. About          — Persönlicher Fließtext + Person-Card + Tech-Tags (navy bg)
7. Portfolio      — 3 Cards: GitHub, Docker Hub, Coming Soon (dunkleres navy)
8. Contact        — Formspree-Formular + direkte Kontaktinfos (tiefstes navy)
```

**Keine Navigation-Änderung** — Navigation.astro bleibt wie sie ist.

---

## 6. Section-Specs

### 6.1 Hero (`src/components/Hero.astro`)

**Struktur:** Einspaltiges Layout (Text-Kolonne), Signed Strip darunter. Kein rechter Foto-Column mehr.

**Hintergrund:**
- Radiale Glow-Blobs (2×, Teal)
- Dot Pattern (wie bisher)
- Canvas-Partikel-Layer (`<canvas id="hero-canvas">`, absolute, z-index 1)

**Text-Kolonne (z-index 2):**
```
Eyebrow:    Automatisierung · KI-Integration · IT-Infrastruktur
Headline:   Weniger Aufwand.
            Mehr von dem,
            was zählt.
            → Gradient text: linear-gradient(135deg, #fff 0%, #e0f2fe 55%, #7dd3fc 100%)
            → font-size: clamp(2.5rem, 5vw, 3.5rem), font-weight: 900, letter-spacing: -0.04em

Subline:    "Jedes Unternehmen verschwendet Zeit — auf Aufgaben, die längst automatisiert
            sein könnten. Was in Großorganisationen Standard ist, bringe ich in Betriebe
            jeder Größe: präzise umgesetzt, vollständig dokumentiert, dauerhaft stabil."
            → max-w: 560px, color: rgba(255,255,255,0.55), strong: rgba(255,255,255,0.82)

CTAs:       [Leistungen ansehen →]  (teal pill-button, shadow)
            [Kontakt aufnehmen]     (ghost pill-button)
```

**Stats (unter CTAs):**
```
10+   — Jahre Enterprise-IT
1.000+ — VMs administriert
24/7  — Infrastruktur, die läuft
→ Teal Zahlenwerte, opacity-50 Labels
```

**Signed Strip (Option B — gewählt):**
```
┌──────────────────────────────────────────────────────┐
│ [Foto 36px]  Paul Scholz             [LinkedIn] [gh] │
│              IT-Automatisierung & KI-Integration     │
└──────────────────────────────────────────────────────┘
→ padding: 10px 14px, border-radius: 14px
→ background: rgba(255,255,255,0.04), border: 1px solid rgba(255,255,255,0.08)
→ Foto: /images/paul-scholz.jpg, 36×36px, border-radius 50%, border teal/40
→ Name: font-weight 700, color #f1f5f9
→ Rolle: font-size 10px, color #475569
→ LinkedIn: color #60a5fa (blau), href https://www.linkedin.com/in/p-scholz/
→ GitHub: color rgba(255,255,255,0.45), href https://github.com/PiefkePaul
→ Mobile: Signed Strip bleibt in einer Zeile bis 360px, danach umbrechend
```

**EN-Variante:**
```
Eyebrow:  Automation · AI Integration · IT Infrastructure
Headline: Less effort.
          More of what
          matters.
Subline:  "Every business wastes time — on tasks that could have been automated long ago.
           What large organisations take for granted, I bring to businesses of every size:
           precisely implemented, fully documented, built to last."
```

---

### 6.2 Brand-Bar (neu: `src/components/BrandBar.astro`)

Neue Komponente. Horizontale Scrollbar mit Technologie-Namen als Pill-Tags.

```
bg: #0c1322 (zwischen navy und dunkel)
border-top + border-bottom: 1px solid rgba(255,255,255,0.06)
padding: 16px 0

Label: "Technologien" (uppercase, tracking, color #334155)
Brands (als <span>-Tags, color rgba(255,255,255,0.28), border rgba(255,255,255,0.07)):
  Microsoft Azure · Windows Server · PowerShell · Hyper-V
  Docker · Cloudflare · n8n · Python · Claude AI · OpenAI · Ollama · Automic UC4

Mobile: flex-wrap, justify-content center
```

---

### 6.3 WhatISolve (`src/components/WhatISolve.astro`)

**Überschrift-Update:**
```
Label:   Einsatzgebiete
H2:      Das Problem kennen die meisten. Die Lösung nicht.
Lead:    "Mitarbeiter klicken sich durch dieselben Abläufe. Daten liegen verteilt und
          lassen sich nicht zusammenführen. IT-Infrastruktur, die irgendwie läuft —
          bis sie es nicht mehr tut. Keines dieser Probleme ist unlösbar."
```

**Problem-Karten (DE) — neue Texte:**
1. Problem: `„Unsere Mitarbeiter erledigen täglich dieselben 50 Schritte — von Hand."` → Lösung: `Ein automatisierter Workflow übernimmt das vollständig. In Sekunden statt Stunden, ohne Fehler.`
2. Problem: `„Unsere Daten stecken in drei Systemen, die sich nie synchronisieren."` → Lösung: `Verbundene Systeme, eine Quelle der Wahrheit — keine manuelle Datenübertragung mehr.`
3. Problem: `„Wir wollen KI einsetzen, wissen aber nicht wo und was es kostet."` → Lösung: `Ehrliche Machbarkeitsanalyse, klarer Vorschlag — nur was wirklich Mehrwert liefert.`
4. Problem: `„Unser Server läuft irgendwie — aber niemand weiß wirklich wie."` → Lösung: `Saubere, dokumentierte Infrastruktur, die jeder versteht und jederzeit warten kann.`
5. Problem: `„Wir brauchen ein Tool, das es so noch nicht gibt."` → Lösung: `Maßgeschneiderte Software — gebaut für genau dieses Problem, nicht für den allgemeinen Fall.`
6. Karte 6: Dashed border, opacity 0.45: `"Ihre Situation ist nicht dabei? Jetzt ansprechen →"`

**EN-Variante:** Angepasste Übersetzungen ohne "du/dir".

**CTA-Link am Ende:** `"Über Ihre Situation sprechen →"` (DE) / `"Talk about your situation →"` (EN)

---

### 6.4 Services (`src/components/Services.astro`)

**Abschnitt-Header:**
```
H2: Was ich baue und liefere.
Lead: "Keine halben Lösungen. Keine Technologie um der Technologie willen.
       Jedes Projekt endet mit einer Übergabe, die auch in einem Jahr noch funktioniert."
```

**Service-Card-Texte (DE) — neue Prosa:**

**Prozessautomatisierung:**
> Wiederkehrende Abläufe kosten mehr als man denkt — in Zeit, Fehlern und Konzentration. Mit **Microsoft PowerShell**, **Python** und intelligenten Workflow-Plattformen wie **n8n** oder **Automic UC4** entstehen Prozesse, die zuverlässig laufen, ohne dass jemand dabei sein muss.
> Tags: PowerShell · Python · n8n · Automic UC4

**KI- & LLM-Integration:**
> Künstliche Intelligenz ist kein Zukunftsthema mehr — aber sinnvoller Einsatz erfordert Erfahrung. Von der Machbarkeitsanalyse bis zum Produktiveinsatz von **Claude AI**, **OpenAI** oder lokalen Modellen via **Ollama**: mit klarem Nutzen, ohne Buzzwords.
> Tags: Claude AI · OpenAI · Ollama · RAG-Pipelines

**IT-Infrastruktur:**
> Infrastruktur, die man vergisst — weil sie einfach läuft. Containerisierte Deployments mit **Docker**, abgesichert über **Cloudflare**, skalierbar von einem Server bis in die Cloud. On-Premises, hybrid oder vollständig cloudbasiert.
> Tags: Docker · Cloudflare · Microsoft Azure · Hyper-V

**Software & Web:**
> Wenn kein fertiges Tool das Problem löst, baue ich es. Schnelle Websites, interne Tools, Automatisierungs-Dashboards — moderner Stack mit **Astro** und **Python**, schlanke Umsetzung, SEO-Grundlagen inklusive wo es sinnvoll ist.
> Tags: Astro · Python · Tailwind · SEO

**Visuelles:** Brand-Tags als Teal-Pills unter jedem Card. Cards behalten Hover-Lift.

---

### 6.5 Numbers (neu: `src/components/Numbers.astro`)

Neue Komponente. Kurzes Teal-Band zwischen Services und About.

```
bg: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)
padding: 56px 0

4 Stats (DE):
  10+    — Jahre Enterprise-Automatisierung
  1.000+ — Virtuelle Maschinen administriert
  24/7   — Infrastruktur, die wirklich läuft
  0      — Projekte ohne Dokumentation übergeben

→ Zahlenwerte: font-size clamp(2rem, 4vw, 2.5rem), font-weight 900, color #fff
→ Labels: font-size 12px, color rgba(255,255,255,0.7)
→ Counter-Animation: auf IntersectionObserver, easeOutQuart, 1200ms
→ "0" zählt nicht hoch (schon bei 0), "24/7" und "10+" spezielle Behandlung
```

---

### 6.6 About (`src/components/About.astro`)

**Komplette Textüberarbeitung auf Sog-Ton + erste Person + LinkedIn:**

```
Label: Profil (DE: Über mich)
H2:    Eine Person. Direkt erreichbar. Mit echter Erfahrung.
```

**4-Absatz-Prosa (DE):**
1. *"Ich bin Paul Scholz — IT-Spezialist, Automatisierungsentwickler und der Ansprechpartner hinter dieser Website. Kein Team, keine Agentur, keine Zwischenhändler. Wenn Sie schreiben, lese ich es. Wenn ich antworte, ist es meine Einschätzung."*
2. *"Über ein Jahrzehnt lang habe ich in einer der größten deutschen Bundesbehörden verantwortet, dass kritische Automatisierungsinfrastruktur läuft — hunderte von Hyper-V-Hosts, tausende virtuelle Maschinen, Pipelines mit Automic UC4 und Microsoft PowerShell, die täglich zehntausende Jobs verarbeiteten. Enterprise-Standard, unter echtem Betriebsdruck."*
3. *"Diese Erfahrung bringe ich heute in Projekte, wo es darauf ankommt. Ohne Enterprise-Overhead, aber mit Enterprise-Qualität. Was ich baue, ist für den Betrieb gedacht — nicht für die Präsentation. Es läuft auch dann, wenn niemand hinschaut."*
4. *"Privat betreibe ich ein umfangreiches Homelab: Docker-Stacks, lokale KI-Modelle via Ollama, selbst gehostete Dienste. Nicht als Hobby — sondern als Entwicklungsumgebung. Alles was ich empfehle, habe ich selbst im Einsatz."*

**Aside (rechts):** Person-Card mit Foto + LinkedIn/GitHub + Tech-Tags:
```
Person-Card (glassmorphism, border rgba(255,255,255,0.09)):
  Foto: /images/paul-scholz.jpg (56×56px, border-radius 50%, border teal/35)
  Name: Paul Scholz
  Titel: IT-Automatisierung & KI-Integration

  Links:
  [LinkedIn-Icon] linkedin.com/in/p-scholz   (color #60a5fa)
  [GitHub-Icon]   github.com/PiefkePaul       (color rgba(255,255,255,0.5))

Tech-Tags (separate Box darunter):
  Heading: "Werkzeugkasten" (uppercase, opacity 0.35)
  Tags: Enterprise IT · Hyper-V · SCVMM · PowerShell · Automic UC4
        Docker · Python · n8n · Claude AI · Cloudflare
```

**EN-Variante:** Übersetzte Version der 4 Absätze.

---

### 6.7 Portfolio (`src/components/Portfolio.astro`)

Keine inhaltlichen Änderungen — nur visuelles Update auf neues Dark-Schema:
- bg: `#0c1322`
- Cards: gleiche Glassmorphism-Optik wie andere Cards

---

### 6.8 Contact (`src/components/Contact.astro`)

**LinkedIn-Link hinzufügen** in der linken Kontaktinfo-Spalte:
```
E-Mail:   kontakt@wichtige.email
LinkedIn: linkedin.com/in/p-scholz  (color #60a5fa)
GitHub:   github.com/PiefkePaul

Response-Text: "Ich antworte in der Regel innerhalb von 1–2 Werktagen."
Help-Text:     "Am hilfreichsten: eine kurze Beschreibung der Situation,
                was vorgestellt wird, und ob es einen Zeitrahmen gibt."
                → kein "du/dir" → neutral umformuliert
```

**Formular bleibt:** Formspree `xykbqngy`, alle Felder, Submit-Button + Spinner-Logik.

---

## 7. Neue Dateien

| Datei | Zweck |
|---|---|
| `src/components/BrandBar.astro` | Neue Technologie-Bar zwischen Hero und WhatISolve |
| `src/components/Numbers.astro` | Neues Counter-Band zwischen Services und About |
| `src/scripts/hero-canvas.ts` | Canvas-Partikel für Hero (export: `initHeroCanvas(canvas)`) |
| `src/scripts/scroll-reveal.ts` | IntersectionObserver Scroll-Reveal (export: `initScrollReveal()`) |
| `src/scripts/counter.ts` | Counter-Animation für Numbers-Band (export: `initCounters()`) |

---

## 8. Änderungen bestehende Dateien

| Datei | Was ändert sich |
|---|---|
| `src/components/Hero.astro` | Komplett neu: Layout, Texte, Signed Strip, Canvas-Integration |
| `src/components/WhatISolve.astro` | Texte neu (Sog-Ton), 6. Karte (CTA), Überschrift |
| `src/components/Services.astro` | Texte neu (Prosa + Brand-Tags), Brand-Tag Komponente |
| `src/components/About.astro` | Texte komplett neu, Person-Card, LinkedIn/GitHub-Links, Dark-Schema |
| `src/components/Portfolio.astro` | Dark-Schema anpassen (bg, Card-Farben) |
| `src/components/Contact.astro` | LinkedIn ergänzen, Help-Text "du" → neutral, Glassmorphism-Form |
| `src/layouts/BaseLayout.astro` | `personRole` aktualisieren, LinkedIn zu `sameAs` hinzufügen |
| `tailwind.config.mjs` | Neue Keyframes: `breathe`, `fade-in-up` |
| `src/pages/index.astro` | `BrandBar` + `Numbers` importieren und einbinden |
| `src/pages/en/index.astro` | Dasselbe für EN-Seite |

---

## 9. Animations-Implementierungsdetails

### Canvas Partikel (`src/scripts/hero-canvas.ts`)
```typescript
export function initHeroCanvas(canvas: HTMLCanvasElement): void
// - 40 Partikel, zufällige Startpositionen
// - Jedes Partikel: radius 1–2px, opacity 0.15–0.4, Farbe #0ea5e9 oder #ffffff
// - Drift: vx/vy ±0.15 px/frame, leichte Richtungskorrektur alle 120 Frames
// - Kein Verbindungs-Netz (zu schwer)
// - pausiert wenn document.hidden = true
// - canvas: position absolute, inset 0, z-index 1, pointer-events none
```

### Scroll-Reveal (`src/scripts/scroll-reveal.ts`)
```typescript
export function initScrollReveal(): void
// - Selektiert alle [data-reveal] Elemente
// - CSS-Klasse '.revealed' hinzufügen → opacity 1, translateY 0
// - Ohne Klasse: opacity 0, translateY 24px
// - threshold: 0.12, staggered per data-reveal-delay="0ms" Attribut
// - Respektiert prefers-reduced-motion
```

### Counter (`src/scripts/counter.ts`)
```typescript
export function initCounters(): void
// - Selektiert [data-counter] Attribute mit Zielwert
// - Sonderfälle: "10+" → zählt 0→10, appended "+"
//               "1.000+" → zählt 0→1000, formatiert mit Punkt
//               "24/7" → kein Zählen, direkt anzeigen
//               "0" → direkt 0 anzeigen (kein Hochzählen)
// - easeOutQuart, 1200ms
// - IntersectionObserver, einmalig
```

---

## 10. SEO-Anpassungen

### `BaseLayout.astro`
```typescript
personRole = lang === 'de'
  ? 'IT-Automatisierung, KI-Integration & Infrastruktur'
  : 'IT Automation, AI Integration & Infrastructure'

// sameAs: LinkedIn hinzufügen
sameAs: [
  'https://www.linkedin.com/in/p-scholz/',
  'https://github.com/PiefkePaul',
  'https://hub.docker.com/r/piefkepaul/',
]
```

### Meta-Descriptions (DE/EN)
```
DE: "Paul Scholz — IT-Automatisierung, KI-Integration und Infrastruktur für
     Unternehmen jeder Größe. Über 10 Jahre Enterprise-Erfahrung. Direkt, ohne Agentur."

EN: "Paul Scholz — IT automation, AI integration and infrastructure for businesses
     of all sizes. 10+ years enterprise experience. Direct, no agency."
```

---

## 11. Tailwind-Erweiterungen (`tailwind.config.mjs`)

```javascript
keyframes: {
  // bestehend
  'fade-up':  { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  'fade-in':  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
  'float-soft': { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } },
  // neu
  'breathe': {
    '0%,100%': { backgroundPosition: '0% 50%', transform: 'scale(1)' },
    '50%': { backgroundPosition: '100% 50%', transform: 'scale(1.04)' },
  },
  'fade-in-up': {
    '0%': { opacity: '0', transform: 'translateY(24px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
},
animation: {
  // bestehend
  'fade-up': 'fade-up 0.5s ease-out forwards',
  'fade-in': 'fade-in 0.4s ease-out forwards',
  'float-soft': 'float-soft 4s ease-in-out infinite',
  // neu
  'breathe': 'breathe 8s ease-in-out infinite',
},
```

---

## 12. Index-Seiten (`src/pages/index.astro` + `src/pages/en/index.astro`)

Neue Komponenten in der richtigen Reihenfolge einbinden:
```
Navigation
Hero
BrandBar     ← neu
WhatISolve
Services
Numbers      ← neu
About
Portfolio
Contact
Footer (falls vorhanden)
```

---

## 13. Was sich NICHT ändert

- `Navigation.astro` — bleibt unverändert
- Blog-Posts — 3 neue Posts behalten (`powershell`, `ki-integration`, `homelab`), alte auf `draft: true`
- Formspree-Logik in `Contact.astro` — bleibt exakt so
- `tailwind.config.mjs` bestehende Einträge — werden nur ergänzt, nicht ersetzt
- URL-Struktur und Routing — unverändert
