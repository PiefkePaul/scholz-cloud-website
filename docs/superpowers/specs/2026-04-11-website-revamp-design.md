# Website Revamp Design Spec
**Date:** 2026-04-11  
**Project:** scholz-cloud.de  
**Stack:** Astro 4.16 + Tailwind 3.4 + TypeScript, DE/EN i18n

---

## 1. Positioning & Audience

**Primary value proposition:** Paul Scholz automatisiert manuelle Prozesse, baut KI-Workflows und liefert Infrastruktur — für Kleinunternehmen, Selbstständige und Privatpersonen.

**Target priority:** Kleinunternehmer > Selbstständige/Freelancer > Technikaffine Private

**Core pillars (in order):**
1. Prozessautomatisierung (RPA, PowerShell, Automic/UC4, n8n)
2. KI/AI-Integration (LLMs, Agenten, RAG, Workflow-Orchestrierung)
3. Infrastruktur (Homelab, On-Prem, Cloud, Hybrid, Docker)
4. Maßgeschneiderte Software-Lösungen
5. SEO (Unterpunkt, nicht Hauptsäule)

**Proof anchor:** 10+ Jahre Enterprise-IT, davon mehrere Jahre in einer der größten deutschen Sozialversicherungsträger (reguliertes Großorganisationsumfeld) — Automatisierung im industriellen Maßstab mit Automic (UC4) und PowerShell.

**Contact:** kontakt@wichtige.email — Formular (Formspree), kein Telefon.

---

## 2. Page Structure (Problem-First Approach)

```
Hero
  └─ Value Prop + Proof-Zahlen + 2 CTAs
Was ich löse (Problem Scenarios)
  └─ 5 outcome-basierte Szenarien
Leistungen
  └─ 4 Karten: Automation / KI & AI / Infrastruktur / Software & Web
Vorgehen
  └─ 4 Schritte: Discovery → Konzept → Umsetzung → Betrieb
Über mich
  └─ Kurzprofil + Tech-Stack-Tags
Projekte & Proof
  └─ GitHub + Docker Hub + "Mehr folgt"
Blog
  └─ 3 neue Posts (alte offline)
Kontakt
  └─ Formular + E-Mail-Direktlink + Erwartungsmanagement
Footer
```

---

## 3. Section Designs

### 3.1 Hero
- **Eyebrow:** `Automatisierung · KI-Integration · Infrastruktur`
- **Headline DE:** `Weniger Handarbeit. Mehr Ergebnis.`
- **Headline EN:** `Less manual work. More results.`
- **Subline DE:** `Ich automatisiere Prozesse, baue KI-Workflows und schaffe Infrastruktur, die läuft — für Kleinunternehmen, Selbstständige und alle, die mehr aus ihrer Zeit machen wollen.`
- **Subline EN:** `I automate processes, build AI workflows, and deliver infrastructure that stays running — for small businesses, freelancers, and anyone who wants to spend time on what actually matters.`
- **Proof-Zahlen:** `10+ Jahre Enterprise-IT` | `1.000+ VMs betrieben` | `Großorganisations-Erfahrung`
- **CTA 1 (primär):** `Mein Angebot ansehen` → #leistungen
- **CTA 2 (sekundär):** `Kontakt aufnehmen` → #kontakt
- **Background:** Dezente animierte Dot-Grid-Animation (SVG radial gradient, `prefers-reduced-motion` beachten)
- **Foto:** Paul Scholz bleibt rechts im Hero

### 3.2 Was ich löse (neu — Problem Scenarios)
5 Karten, outcome-basiert, kurz & konkret:

1. **„Meine Mitarbeiter klicken täglich dieselben 50 Schritte durch"**  
   → Automatisierter Workflow, der das in Sekunden erledigt. Kein Klicken mehr.

2. **„Ich habe Daten in 3 Systemen, die sich nie synchronisieren"**  
   → Integration aller relevanten Quellen — eine Quelle der Wahrheit.

3. **„Ich will KI nutzen, weiß aber nicht wie und was das kostet"**  
   → Ehrliche Analyse, klarer Vorschlag, kein Overkill — nur was wirklich hilft.

4. **„Mein Server läuft irgendwie, aber niemand weiß wie genau"**  
   → Saubere Infrastruktur, dokumentiert, stabil, reproduzierbar.

5. **„Ich brauche ein Tool / eine App, die es noch nicht gibt"**  
   → Maßgeschneiderte Softwarelösung — genau für dein Problem, nicht mehr.

### 3.3 Leistungen (4 Karten, neu strukturiert)
Karte 1: **Prozessautomatisierung**  
- PowerShell, Automic/UC4, n8n, Python  
- Bullets: Analyse bestehender Abläufe, Skript-/Workflow-Entwicklung, Dokumentation & Übergabe

Karte 2: **KI & AI-Integration**  
- LLMs (Claude, GPT, lokale Modelle), RAG, Agenten, Workflow-Orchestrierung  
- Bullets: Use-Case-Analyse, Implementierung & Testing, Betriebsübergabe

Karte 3: **Infrastruktur**  
- Homelab, Docker, On-Prem, Cloud, Hybrid  
- Bullets: Planung & Aufbau, Containerisierung, Monitoring & Stabilität

Karte 4: **Software & Web**  
- Astro, Python, maßgeschneiderte Lösungen, SEO  
- Bullets: Webprojekte, Custom-Tools, SEO-Grundlagen

### 3.4 Vorgehen (4 Schritte)
1. **Discovery** — Erstgespräch, Problem verstehen, Ziele klären
2. **Konzept** — Lösungsansatz, Zeitplan, transparente Kalkulation
3. **Umsetzung** — Entwicklung in Iterationen, regelmäßige Updates
4. **Betrieb & Übergabe** — Dokumentation, Einweisung, optional: laufender Support

### 3.5 Über mich
- Lead: Enterprise-IT seit 10+ Jahren, Automatisierung in regulierten Großorganisationen (DRV-Bund-Kontext → anonym als "einer der größten deutschen Sozialversicherungsträger")
- Body: Privat: Homelab, Docker, n8n, Self-Hosting, KI-Experimente. Ich schreibe über das, was ich wirklich tue.
- Aside: Track Record + Tags (Enterprise IT, Hyper-V, PowerShell, Automic, KI/AI, Docker, Python, n8n, Cloud)

### 3.6 Kontakt
- Formular (Formspree, existing): Name, E-Mail, Betreff, Nachricht
- Direktlink: `kontakt@wichtige.email`
- Erwartungsmanagement: „Ich antworte in der Regel innerhalb von 1–2 Werktagen."
- Hilf mir dir zu helfen: „Am hilfreichsten sind: eine kurze Beschreibung deines Problems, was du dir vorstellst, und ob es einen Zeitrahmen gibt."

---

## 4. Design System (no changes to tech stack)

- **Colors:** Navy (#0f172a) + Teal (#0ea5e9) bleiben — clean, professionell
- **Typography:** Bleibt (Tailwind defaults + @tailwindcss/typography)
- **Animation:** Dot-Grid Hero-Background (prefers-reduced-motion: none), float-soft für Foto bleibt
- **New section background alternation:** white → slate-50 → white → slate-50 → navy (Kontakt)
- **Card style:** rounded-[2rem], shadow-lg, ring-1 ring-slate-200 — bleibt

---

## 5. Blog (3 neue Posts, alle alten auf draft: true)

### Post 1: Prozessautomatisierung mit PowerShell
- **Slug:** powershell-prozessautomatisierung-praxis
- **Keywords:** PowerShell Automatisierung, Windows Prozesse automatisieren, Skripte Unternehmen
- **Intent:** Tutorial + Erfahrungsbericht (People-first)

### Post 2: KI im Unternehmensalltag — was wirklich funktioniert
- **Slug:** ki-integration-unternehmen-praxis-2025
- **Keywords:** KI Integration Unternehmen, LLM Workflow, AI automatisierung KMU
- **Intent:** Erfahrungsbericht + Entscheidungshilfe

### Post 3: Homelab als Infrastruktur-Lernumgebung
- **Slug:** homelab-docker-infrastruktur-lernen
- **Keywords:** Homelab aufbauen, Docker Self-Hosting, On-Premises Server
- **Intent:** How-to + Inspiration

---

## 6. SEO

- **Meta Title DE:** `Paul Scholz | Automatisierung, KI-Integration & IT-Infrastruktur`
- **Meta Title EN:** `Paul Scholz | Process Automation, AI Integration & IT Infrastructure`
- **Meta Description DE:** `Ich automatisiere manuelle Prozesse, baue KI-Workflows und liefere stabile IT-Infrastruktur — für Kleinunternehmen, Selbstständige und Privatpersonen.`
- Hreflang bleibt, Sitemap bleibt
- Structured Data: LocalBusiness + Person beibehalten

---

## 7. Implementation Order

1. [ ] Meta-Titles + Descriptions (index.astro + en/index.astro)
2. [ ] Hero.astro — neues Copywriting + Eyebrow
3. [ ] Services.astro — 4 neue Karten (Automation/KI/Infra/Software)
4. [ ] Neue Sektion: WhatISolve.astro (5 Problem-Szenarien)
5. [ ] Neue Sektion: Process.astro (4-Schritte-Vorgehen)
6. [ ] About.astro — neues Copywriting (Enterprise-Referenz anonym)
7. [ ] Contact.astro — E-Mail + Erwartungsmanagement hinzufügen
8. [ ] Blog: 3 alte Posts → draft: true; 3 neue Posts schreiben
9. [ ] Navigation: neue Anker-Links (leistungen, vorgehen, ueber-mich, kontakt)
10. [ ] Build + Test + Commit + Push
