---
title: "Docker On-Premises 2025: Mein Setup mit Nginx Proxy Manager und 12+ Self-Hosted Diensten"
titleEn: "Docker On-Premises 2025: My Setup with Nginx Proxy Manager & 12+ Self-Hosted Services"
description: "Wie ich Docker auf einem dedizierten Homeserver betreibe – mit echten docker-compose Dateien, Nginx Proxy Manager, Let's Encrypt SSL und der Erfahrung aus dem Enterprise-Umfeld."
descriptionEn: "How I run Docker on a dedicated homeserver – with real docker-compose files, Nginx Proxy Manager, Let's Encrypt SSL, and experience from enterprise IT."
pubDate: 2025-03-15
updatedDate: 2025-04-10
tags: ["Docker", "Self-Hosting", "Nginx Proxy Manager", "docker-compose", "On-Premises", "Homelab"]
---

Ich verwalte beruflich hunderte von Hyper-V-Hosts und tausende virtuelle Maschinen. Abends läuft mein privater Docker-Stack. Der Unterschied zwischen Enterprise und Homelab ist kleiner als die meisten denken – und genau das macht es interessant.

Dieser Beitrag ist keine Theorie. Es ist das Setup, das bei mir gerade wirklich läuft: mit konkreten `docker-compose`-Dateien, echten Fehlern die ich auf dem Weg gemacht habe, und ehrlichen Einschätzungen was sich lohnt und was nicht.

## Warum Docker statt klassischer Virtualisierung?

Als ich mein Homelab aufgebaut habe, war mein erster Gedanke Proxmox und VMs – ich kenne Virtualisierung schließlich aus dem Berufsalltag. Für zuhause hat sich Docker aber aus einem konkreten Grund durchgesetzt: **Verhältnis von Aufwand zu Nutzen**.

Eine VM für Jellyfin bedeutet volles Betriebssystem, Updates, Snapshot-Management, Speicherplatz. Ein Docker-Container für Jellyfin bedeutet eine `docker-compose.yml` – und wenn er kaputtgeht, sind es zwei Befehle bis er wieder läuft:

```bash
docker compose down && docker compose up -d
```

Für einen Stack, der nebenher laufen soll und nicht zum zweiten Job werden soll, ist das der entscheidende Vorteil.

> **Meine Faustregel:** Docker für Services die regelmäßig aktualisiert werden. VMs für Dinge die stateful, komplex sind oder Windows brauchen.

---

## Hardware: Dedizierter Homeserver als Docker-Plattform

Mein primärer Docker-Host ist ein kompakter Homeserver mit Intel N100 CPU, 16 GB RAM und einer schnellen SSD als System-Drive – ergänzt durch eine HDD für Mediendaten. Keine Hochleistungsmaschine – aber sie läuft 24/7, zieht unter Last weniger als 15 Watt und unterstützt Intel Quick Sync für Hardware-Transcoding.

Die Hardware-Wahl ist dabei weniger wichtig als das Prinzip dahinter: **Ein dediziertes Gerät mit Linux, SSH-Zugang und Docker CE.** Ob das ein gebrauchter Mini-PC, ein NAS mit Docker-Support oder ein alter Laptop ist, spielt für das grundlegende Setup keine Rolle.

**Wichtige Eigenschaften eines guten Docker-Hosts:**
- x86-64 Architektur (maximale Image-Kompatibilität)
- Mindestens 8 GB RAM für einen komfortablen Stack
- SSD für System und Konfigurationsdaten (Performance bei DB-Zugriffen)
- Separate HDD/NAS-Share für Mediendaten
- UPS (Unterbrechungsfreie Stromversorgung) empfohlen – ein harter Stromausfall kann Docker-Volumes beschädigen

---

## Ordnerstruktur: Das Fundament zuerst

Bevor der erste Container läuft, ist die Ordnerstruktur entscheidend. Mein früher Fehler: alles wild in `/docker` geworfen. Das rächt sich nach drei Monaten brutal.

Heute arbeite ich nach diesem Schema:

```
/opt/docker/
├── nginx-proxy-manager/
│   ├── docker-compose.yml
│   ├── data/
│   └── letsencrypt/
├── jellyfin/
│   ├── docker-compose.yml
│   ├── config/
│   └── cache/
├── n8n/
│   ├── docker-compose.yml
│   └── data/
└── portainer/
    ├── docker-compose.yml
    └── data/
```

Jeder Dienst bekommt seinen eigenen Ordner. Daten und Konfiguration liegen **immer** außerhalb des Containers – direkt auf dem Host-Dateisystem. Der Container ist austauschbar – die Daten nicht.

---

## Nginx Proxy Manager: Das wichtigste Tool im Stack

Wenn du nur einen Container aus diesem Artikel mitnimmst, nimm Nginx Proxy Manager. Er hat mein Setup von einem Port-Chaos (`192.168.1.100:8096`, `:9090`, `:3000`) in etwas Wartbares und Professionelles verwandelt.

### Was NPM konkret macht

- **Reverse Proxy** für alle Dienste hinter saubere Subdomains
- **Automatische SSL-Zertifikate** via Let's Encrypt oder eigene Certs
- **Webinterface** zum Konfigurieren – kein manuelles Nginx-Config-Editieren
- **Wildcard-Zertifikate** via DNS-Challenge möglich

### docker-compose.yml für Nginx Proxy Manager

```yaml
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "81:81"
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    environment:
      - TZ=Europe/Berlin
```

Nach dem Start: Admin-Interface unter `http://server-ip:81`. Standard-Login `admin@example.com` / `changeme` – **sofort ändern**.

### Subdomain in 60 Sekunden einrichten

1. **Proxy Hosts → Add Proxy Host**
2. Domain: `jellyfin.deinedomain.de`
3. Forward Hostname: `jellyfin` (Container-Name im gleichen Docker-Netzwerk)
4. Forward Port: `8096`
5. Reiter SSL → Let's Encrypt → Force SSL aktivieren

Jellyfin ist danach unter `https://jellyfin.deinedomain.de` erreichbar – mit gültigem Zertifikat, ohne Port im Browser.

> **Sicherheitshinweis:** NPM ist kein Sicherheitskonzept – nur ein Reverse Proxy. Ich veröffentliche nur Dienste ins Internet, die ich wirklich öffentlich brauche. Monitoring-Tools, Portainer und Admin-Interfaces bleiben intern oder hinter zusätzlicher Authentifizierung (NPM unterstützt auch HTTP Basic Auth).

---

## Meine laufenden Container – die ehrliche Liste

Keine Demo-Liste. Das sind die Dienste, die bei mir täglich wirklich laufen.

| Dienst | Zweck | Öffentlich erreichbar |
|--------|-------|----------------------|
| **Nginx Proxy Manager** | Reverse Proxy & SSL | Ports 80/443 |
| **Portainer** | Container-Verwaltung | Nein (intern) |
| **Jellyfin** | Medienserver | Ja (mit SSL) |
| **n8n** | Workflow-Automatisierung | Ja (mit Auth) |
| **Vaultwarden** | Passwort-Manager (Bitwarden-kompatibel) | Ja (mit SSL) |
| **Immich** | Foto-Backup & -Verwaltung | Ja (mit SSL) |
| **Uptime Kuma** | Monitoring & Alerting | Nein (intern) |
| **Watchtower** | Automatische Image-Updates | — |
| **Netdata** | System-Monitoring | Nein (intern) |
| **Gotify** | Push-Benachrichtigungen | Ja (mit SSL) |
| **Homepage** | Persönliches Dashboard | Nein (intern) |
| **Stirling PDF** | PDF-Werkzeuge | Nein (intern) |

### Beispiel: Jellyfin docker-compose.yml

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    network_mode: host
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /mnt/media:/media:ro
    environment:
      - TZ=Europe/Berlin
      - JELLYFIN_PublishedServerUrl=https://jellyfin.deinedomain.de
    devices:
      - /dev/dri:/dev/dri   # Intel Quick Sync / iGPU Transcoding
```

### Beispiel: n8n docker-compose.yml

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    volumes:
      - ./data:/home/node/.n8n
    environment:
      - TZ=Europe/Berlin
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=einSicheresPasswort
      - WEBHOOK_URL=https://n8n.deinedomain.de
      - N8N_HOST=n8n.deinedomain.de
      - N8N_PROTOCOL=https
```

---

## Vaultwarden: Eigener Passwort-Manager – lohnt es sich?

Das ist einer der Container, über den ich am meisten nachgedacht habe. Ein Passwort-Manager ist kritisch – wenn er ausfällt oder Daten verliert, ist das ein ernstes Problem.

**Warum ich es trotzdem self-hoste:**
- Keine Subscription (Bitwarden Premium kostet ~10 $/Jahr, Vaultwarden kostet Strom)
- Passwörter liegen auf meinem Server, nicht bei einem externen Anbieter
- Volle Kontrolle über Backups und Verfügbarkeit

```yaml
services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - ./data:/data
    environment:
      - SIGNUPS_ALLOWED=false
      - TZ=Europe/Berlin
```

> **Ehrlich gesagt:** Wer keine Zeit hat, Backups zu pflegen und Updates regelmäßig einzuspielen, sollte bei Bitwarden Cloud bleiben. Self-Hosting bedeutet Verantwortung – nicht nur Kontrolle.

---

## Watchtower: Automatische Updates richtig konfigurieren

Watchtower hält Container-Images automatisch aktuell. Die Grundkonfiguration:

```yaml
services:
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_SCHEDULE=0 0 4 * * *   # Täglich um 4 Uhr
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_NOTIFICATIONS=gotify
      - WATCHTOWER_NOTIFICATION_GOTIFY_URL=https://gotify.deinedomain.de
      - WATCHTOWER_NOTIFICATION_GOTIFY_TOKEN=deinToken
      - TZ=Europe/Berlin
```

**Was ich bei Watchtower beachte:**
- Updates nur nachts – niemand streamt Jellyfin um 4 Uhr
- Kritische Container (`vaultwarden`, n8n mit aktiven Workflows) pinne ich auf spezifische Image-Tags und update sie manuell nach Changelog-Check
- Benachrichtigungen immer aktivieren – sonst weiß man nicht, ob Updates durchlaufen sind

---

## Die 6 Fehler, die ich als Einsteiger gemacht habe

Diese Fehler kosten Zeit. Spare dir die Erfahrung:

1. **Volumes vergessen** — Container ohne explizite Volumes verlieren beim Neustart alle Daten. Passiert einmal, dann nie wieder.
2. **Alle Dienste auf eigenen Ports** — Ohne Reverse Proxy wird die Port-Verwaltung zum Chaos. NPM löst das elegant.
3. **Root-User in Containern** — Viele Images laufen standardmäßig als Root. Ein dedizierter Docker-User mit UID/GID ist besser für die Sicherheit.
4. **Kein Backup-Konzept** — Die erste Frage vor dem ersten Container: Wie sichere ich `/data` und `/config`? Meine Antwort: tägliches rsync auf ein NAS, wöchentliches Offsite-Backup.
5. **Admin-Interfaces veröffentlichen** — Portainer, Netdata, NPM-Admin gehören nicht ins öffentliche Internet.
6. **Updates ignorieren** — Veraltete Images sind Sicherheitsrisiken. Watchtower oder manuelle Routinen sind Pflicht, kein Luxus.

---

## Häufige Fragen

**Welche Hardware eignet sich am besten für einen Docker-Host?**
Für den Einstieg reicht jede x86-64 Maschine mit 8+ GB RAM und Linux. Intel N100/N305-Mini-PCs bieten 2025 das beste Verhältnis aus Stromverbrauch, Leistung und Quick-Sync-Support für unter 200 €. Alternativ: jeder günstige NAS mit Docker-Unterstützung (QNAP, Ugreen, Synology) funktioniert für leichte bis mittlere Workloads.

**Brauche ich eine eigene Domain?**
Für Let's Encrypt-Zertifikate ja. Alternativ kannst du intern mit selbst-signierten Certs oder einer `.local`-Domain arbeiten. Eine günstige `.de`-Domain kostet ca. 5–8 €/Jahr und ist eine sinnvolle Investition.

**Was passiert bei Stromausfall?**
`restart: unless-stopped` in jeder `docker-compose.yml` sorgt dafür, dass Container nach dem Neustart automatisch wieder hochkommen. Eine USV schützt vor korrupten Volumes bei hartem Abschalten.

**Wie viel RAM wird gebraucht?**
NPM + Portainer + Uptime Kuma + Vaultwarden: ca. 1,5 GB. Mit Jellyfin + n8n + Immich: 6–8 GB für komfortables Arbeiten empfohlen. 16 GB sind für einen vollständigen Stack mit Reserve ideal.

**Ist das sicher, wenn ich Dienste ins Internet exponiere?**
Mit NPM + Let's Encrypt, regelmäßigen Updates, keinen offenen Admin-Interfaces und optionaler Cloudflare-Vorschaltung: ja, auf einem vertretbaren Sicherheitsniveau. Für sensible Dienste (Vaultwarden, Immich) empfehle ich zusätzlich Fail2Ban oder Cloudflare Access.

---

## Fazit

Mein Docker-Stack ist kein Bastelprojekt, das mich nervt – es ist ein Netz aus Diensten, das meinen Alltag vereinfacht. Fotos werden automatisch gesichert, Medien sind überall verfügbar, Workflows laufen automatisch, Passwörter sind kontrolliert gespeichert.

Der Aufwand für die initiale Einrichtung war etwa 15–20 Stunden verteilt über mehrere Wochenenden. Die laufende Wartung: kaum messbar. Das Verhältnis passt.

Wenn du Fragen zu meinem Setup hast oder selbst einen Stack aufbauen möchtest, [schreib mir gern](#kontakt).

---
*Zuletzt aktualisiert: April 2025. Prüfe immer die aktuellen Changelogs der eingesetzten Projekte vor dem Update.*
