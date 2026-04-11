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
