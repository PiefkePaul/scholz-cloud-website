---
title: "Docker Homelab 2025: Mein Setup mit Synology, Nginx Proxy Manager und 15+ Containern"
titleEn: "Docker Homelab 2025: My Setup with Synology, Nginx Proxy Manager & 15+ Containers"
description: "Mein komplettes Docker-Homelab-Setup mit echten docker-compose Dateien, Nginx Proxy Manager, SSL und 15+ Diensten auf einer Synology NAS – aus der Praxis eines Enterprise-IT-Admins."
descriptionEn: "My complete Docker homelab setup with real docker-compose files, Nginx Proxy Manager, SSL, and 15+ services on a Synology NAS – from an enterprise IT admin's perspective."
pubDate: 2025-03-15
updatedDate: 2025-04-10
tags: ["Docker", "Homelab", "Synology", "Self-Hosting", "Nginx Proxy Manager", "docker-compose"]
---

Ich verwalte beruflich hunderte von Hyper-V-Hosts und tausende virtuelle Maschinen. Abends läuft mein Homelab. Der Unterschied ist kleiner als die meisten denken – und genau das ist das Interessante daran.

Dieser Beitrag ist keine Theorie. Es ist das Setup, das bei mir gerade wirklich läuft: mit konkreten `docker-compose`-Dateien, echten Fehlern die ich auf dem Weg gemacht habe, und ehrlichen Einschätzungen was sich lohnt und was nicht.

## Warum Docker statt klassischer Virtualisierung?

Als ich mein Homelab aufgebaut habe, war mein erster Gedanke Proxmox und VMs – ich kenne Virtualisierung schließlich aus dem Berufsalltag. Für zuhause hat sich Docker aber aus einem konkreten Grund durchgesetzt: **Verhältnis von Aufwand zu Nutzen**.

Eine VM für Jellyfin bedeutet volles Betriebssystem, Updates, Snapshot-Management, Speicherplatz. Ein Docker-Container für Jellyfin bedeutet eine `docker-compose.yml` – und wenn er kaputtgeht, sind es zwei Befehle bis er wieder läuft:

```bash
docker compose down && docker compose up -d
```

Für ein Homelab, das nebenher funktionieren soll und nicht zum zweiten Job werden soll, ist das der entscheidende Vorteil.

> **Meine Faustregel:** Docker für Services die regelmäßig aktualisiert werden. VMs für Dinge die stateful, komplex sind oder Windows brauchen.

---

## Hardware: Synology NAS als Docker-Plattform

Mein primärer Docker-Host ist eine Synology NAS mit genug RAM und einer SSD als System-Drive. Keine Hochleistungsmaschine – aber sie läuft 24/7, zieht wenig Strom, hat einen RAID-Verbund für die Daten und unterstützt Docker nativ über den „Container Manager".

**Vorteile:**
- Nativer Docker-Support in DSM (kein separater Hypervisor)
- SSH-Zugang für `docker compose`-Befehle
- Integriertes NFS/SMB für Media-Shares
- Energiesparmodi und Wake-on-LAN

**Ehrliche Einschränkungen:**
- Docker-Updates kommen zeitverzögert gegenüber Docker CE
- ARM-Architektur (ältere Modelle) schließt manche Images aus
- Transcoding-Performance begrenzt ohne Hardware-Beschleunigung

Für Transcoding-intensive Workloads läuft bei mir parallel ein Intel-Mini-PC mit Quick-Sync-Support. Das Grundprinzip bleibt aber gleich.

---

## Ordnerstruktur: Das Fundament zuerst

Bevor der erste Container läuft, ist die Ordnerstruktur entscheidend. Mein früher Fehler: alles wild in `/docker` geworfen. Das rächt sich nach drei Monaten brutal.

Heute arbeite ich nach diesem Schema:

```
/volume1/docker/
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

Jeder Dienst bekommt seinen eigenen Ordner. Daten und Konfiguration liegen **immer** außerhalb des Containers auf der NAS. Der Container ist austauschbar – die Daten nicht.

---

## Nginx Proxy Manager: Das wichtigste Tool im Homelab

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

Nach dem Start: Admin-Interface unter `http://deine-nas-ip:81`. Standard-Login `admin@example.com` / `changeme` – **sofort ändern**.

### Subdomain in 60 Sekunden einrichten

1. **Proxy Hosts → Add Proxy Host**
2. Domain: `jellyfin.deinedomain.de`
3. Forward Hostname: `jellyfin` (Container-Name) oder die lokale IP
4. Forward Port: `8096`
5. Reiter SSL → Let's Encrypt → Force SSL aktivieren

Jellyfin ist danach unter `https://jellyfin.deinedomain.de` erreichbar.

> **Sicherheitshinweis:** NPM ist kein Sicherheitskonzept. Ich veröffentliche nur Dienste ins Internet, die ich wirklich öffentlich brauche. Monitoring-Tools, Portainer und Admin-Interfaces bleiben intern oder hinter zusätzlicher Authentifizierung (NPM unterstützt auch HTTP Basic Auth).

---

## Meine laufenden Container – die ehrliche Liste

Keine Demo-Liste: Das sind die Dienste, die bei mir täglich wirklich laufen.

| Dienst | Zweck | Öffentlich |
|--------|-------|-----------|
| **Nginx Proxy Manager** | Reverse Proxy & SSL | Ports 80/443 |
| **Portainer** | Container-Verwaltung | Nein (intern) |
| **Jellyfin** | Medienserver | Ja (mit SSL) |
| **Plex** | Alternativer Medienserver | Ja (mit SSL) |
| **n8n** | Workflow-Automatisierung | Ja (mit Auth) |
| **Vaultwarden** | Passwort-Manager | Ja (mit SSL) |
| **Immich** | Foto-Backup | Ja (mit SSL) |
| **Uptime Kuma** | Monitoring & Alerts | Nein (intern) |
| **Prowlarr** | Indexer-Management | Nein (intern) |
| **Tautulli** | Plex-Statistiken | Nein (intern) |
| **Watchtower** | Auto-Updates | — |
| **Netdata** | System-Monitoring | Nein (intern) |

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
      - /volume1/Media:/media:ro
    environment:
      - TZ=Europe/Berlin
      - JELLYFIN_PublishedServerUrl=https://jellyfin.deinedomain.de
    devices:
      - /dev/dri:/dev/dri
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

Das ist einer der Container, über den ich am meisten nachgedacht habe. Ein Passwort-Manager ist kritisch – wenn er ausfällt, ist das ein ernstes Problem.

**Warum ich es trotzdem self-hoste:**
- Keine Subscription (Bitwarden Premium kostet 10 $/Jahr, Vaultwarden kostet RAM)
- Meine Passwörter liegen auf meinem Server, nicht bei einem US-Unternehmen
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

Watchtower hält Container-Images automatisch aktuell. Die Grundkonfiguration ist simpel:

```yaml
services:
  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - WATCHTOWER_SCHEDULE=0 0 4 * * *
      - WATCHTOWER_CLEANUP=true
      - TZ=Europe/Berlin
```

**Was ich bei Watchtower beachte:**
- Updates nur nachts (niemand schaut Jellyfin um 4 Uhr)
- Kritische Container (`vaultwarden`, n8n mit aktiven Workflows) pinne ich auf spezifische Image-Tags und update sie manuell nach Changelog-Check
- Benachrichtigungen via Gotify oder Apprise aktiviert

---

## Die 6 Fehler, die ich als Einsteiger gemacht habe

Diese Fehler kosten Zeit. Spare dir die Erfahrung:

1. **Volumes vergessen** — Container ohne explizite Volumes verlieren beim Neustart alle Daten. Passiert einmal, dann nie wieder.
2. **Alle Dienste auf eigenen Ports** — Ohne Reverse Proxy wird die Port-Verwaltung zum Chaos.
3. **Root-User in Containern** — Viele Images laufen standardmäßig als Root. Ein dedizierter Docker-User mit UID/GID ist besser.
4. **Kein Backup-Konzept** — Die erste Frage vor dem ersten Container: Wie sichere ich `/config` und `/data`? Meine Antwort: Synology Hyper Backup auf externe HDD, täglich.
5. **Admin-Interfaces veröffentlichen** — Portainer, Netdata, NPM-Admin gehören nicht ins öffentliche Internet.
6. **Updates ignorieren** — Veraltete Images sind Sicherheitsrisiken. Watchtower oder manuelle Routinen sind Pflicht, kein Luxus.

---

## Häufige Fragen

**Welche Synology-Modelle eignen sich für Docker?**
Modelle mit Intel-CPU (x86-64) sind die erste Wahl – sie unterstützen alle Images und Hardware-Transcoding. ARM-Modelle (ältere Plus-Reihe) funktionieren, schränken die Image-Auswahl aber ein.

**Brauche ich eine eigene Domain?**
Für Let's Encrypt-Zertifikate ja. Alternativ kannst du intern auch mit selbst-signierten Certs oder einer `.local`-Domain arbeiten. Ich nutze eine günstige `.de`-Domain (~6 €/Jahr).

**Was passiert bei Stromausfall?**
`restart: unless-stopped` in jeder `docker-compose.yml` sorgt dafür, dass Container nach dem Neustart der NAS automatisch wieder hochkommen.

**Wie viel RAM wird gebraucht?**
NPM + Portainer + Uptime Kuma + Vaultwarden: ca. 1,5 GB. Mit Jellyfin + n8n + Immich: 6–8 GB für komfortables Arbeiten empfohlen.

---

## Fazit

Mein Homelab ist kein Bastelprojekt, das mich nervt – es ist ein Netz aus Diensten, das meinen Alltag vereinfacht. Fotos werden automatisch gesichert, Medien sind überall verfügbar, Workflows laufen automatisch, Passwörter sind kontrolliert gespeichert.

Der Aufwand für die initiale Einrichtung war etwa 15–20 Stunden. Die laufende Wartung: kaum messbar. Das Verhältnis passt.

Wenn du Fragen zu meinem Setup hast oder selbst ein Homelab aufbauen möchtest, [schreib mir gern](#kontakt).

---
*Zuletzt aktualisiert: April 2025. Prüfe immer die aktuellen Changelogs der eingesetzten Projekte vor dem Update.*
