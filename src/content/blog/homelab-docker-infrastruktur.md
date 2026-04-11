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
