---
title: "Docker für Einsteiger: Mein Homelab-Setup erklärt"
titleEn: "Docker for Beginners: My Homelab Setup Explained"
description: "Wie ich mit Docker, einer Synology NAS und Nginx Proxy Manager ein professionelles Homelab aufgebaut habe – Schritt für Schritt erklärt."
descriptionEn: "How I built a professional homelab using Docker, a Synology NAS, and Nginx Proxy Manager – explained step by step."
pubDate: 2025-03-15
tags: ["Docker", "Homelab", "Synology", "Self-Hosting", "NAS"]
---

## Warum Docker für mich der sinnvollste Einstieg war

Als ich mein Homelab aufgebaut habe, wollte ich zuerst eigentlich nur ein paar Dienste sauber zuhause betreiben. Medienserver, Monitoring, kleine Automatisierungen, vielleicht noch ein Reverse Proxy. Mein erster Gedanke war klassisch: einzelne VMs aufsetzen, Software manuell installieren und dann schon irgendwie dokumentieren. Das hat kurzfristig funktioniert, aber es war schnell unübersichtlich. Updates waren nervig, Tests riskant und jeder neue Dienst fühlte sich an wie ein kleiner Sonderfall.

Docker hat das für mich komplett verändert. Statt Anwendungen direkt auf dem Host-System zu installieren, laufen sie in klar getrennten Containern. Für mich war das der entscheidende Vorteil: ein Dienst bleibt ein Dienst. Er bringt seine Laufzeitumgebung mit, kollidiert weniger mit anderen Anwendungen und lässt sich viel leichter neu aufsetzen oder verschieben.

Gerade Einsteiger fragen oft: "Warum soll ich Docker überhaupt benutzen?" Meine ehrliche Antwort ist: weil man damit schneller zu reproduzierbaren Ergebnissen kommt. Wenn ein Container kaputtgeht, baue ich ihn sauber neu. Wenn ich einen Dienst auf ein anderes System umziehen will, nehme ich meine Compose-Datei und die persistenten Daten mit. Wenn ich ein Update testen will, mache ich das kontrolliert statt auf gut Glück. Genau diese Mischung aus Ordnung und Flexibilität macht Docker für ein Homelab so stark.

## Mein Setup: Synology NAS plus Docker als stabile Basis

Mein Homelab läuft auf einer Synology NAS. Für meinen Alltag ist das eine sehr praktische Plattform, weil sie wenig Strom zieht, zuverlässig läuft und sich trotzdem gut erweitern lässt. Die NAS ist bei mir nicht nur Datenspeicher, sondern auch die zentrale Laufzeitumgebung für mehrere Services.

Was ich an einer Synology in Verbindung mit Docker mag: Der Einstieg ist angenehm niedrig, aber man kann trotzdem technisch sauber arbeiten. Viele starten dort mit der Paket-Oberfläche und merken später, dass sich mit Docker Compose deutlich strukturierter arbeiten lässt. Genau diesen Weg bin ich auch gegangen.

Ich halte mein Setup bewusst einfach. Für jeden Stack gibt es einen eigenen Ordner mit:

- einer `docker-compose.yml`,
- optional einer `.env`,
- klar benannten Datenverzeichnissen,
- einer kleinen Notiz, wofür der Stack gedacht ist.

Das klingt banal, ist aber extrem wichtig. Ein Homelab wird schneller unübersichtlich, als man denkt. Wer nach drei Monaten nicht mehr weiß, wo Volumes liegen, welche Ports belegt sind oder welcher Container zu welchem Dienst gehört, verliert den größten Vorteil von Docker direkt wieder.

Außerdem trenne ich konsequent zwischen Container und Daten. Die eigentliche Anwendung darf austauschbar sein, die Daten nicht. Medien, Konfigurationen, Datenbanken und Uploads liegen deshalb sauber auf der NAS. So kann ich Container neu erstellen, ohne jedes Mal Angst um Inhalte oder Einstellungen haben zu müssen.

## Nginx Proxy Manager für SSL und Reverse Proxy

Ein Werkzeug, das ich fast jedem Einsteiger empfehlen würde, ist Nginx Proxy Manager. Anfangs sind viele Homelabs ein Sammelsurium aus Ports: `:8096`, `:9443`, `:5678`, `:3000`. Intern funktioniert das, aber auf Dauer ist es weder schön noch wartbar.

Mit Nginx Proxy Manager habe ich meine Dienste hinter saubere Subdomains gelegt. Aus kryptischen Ports wurden erreichbare Adressen wie `jellyfin.meinedomain.de` oder `n8n.meinedomain.de`. Der zweite große Vorteil ist SSL. Let's-Encrypt-Zertifikate lassen sich sehr bequem einrichten und automatisch erneuern. Gerade wenn man mehrere Dienste betreibt, spart das enorm Zeit.

Für mich war Nginx Proxy Manager deshalb mehr als nur ein Komfort-Tool. Er hat mein Homelab deutlich professioneller gemacht. Ich habe eine zentrale Stelle für Routing, Zertifikate und Weiterleitungen, statt das Thema für jeden Dienst neu zu lösen.

Wichtig ist aber auch hier: Ein Reverse Proxy ist kein Sicherheitskonzept. Ich veröffentliche nicht jeden Container stumpf ins Internet. Einige Dienste bleiben intern, andere laufen nur mit zusätzlicher Authentifizierung. Genau diese Entscheidung sollte man bewusst treffen und nicht erst dann, wenn der erste Scan aus dem Internet auftaucht.

## Welche Container bei mir wirklich Mehrwert bringen

Ich betreibe mein Homelab nicht nach dem Motto "je mehr Container, desto besser". Jeder Dienst muss für mich einen echten Nutzen haben. Ein paar Container haben sich dabei besonders bewährt.

### Portainer

Portainer ist für mich die Verwaltungsebene. Ja, ich arbeite gern mit Compose-Dateien, aber Portainer ist praktisch, um Logs, Container-Zustände, Netzwerke und Volumes schnell im Blick zu haben. Besonders für Einsteiger ist das hilfreich, weil man ein besseres Gefühl dafür bekommt, was auf dem Host gerade wirklich passiert.

### Jellyfin und Plex

Beide laufen bei mir, aber aus unterschiedlichen Gründen. Plex ist bei Clients und Komfort immer noch stark. Jellyfin gefällt mir wegen der Offenheit und weil ich mich nicht in ein kommerzielles Modell drängen lasse. Ich teste beide bewusst parallel, weil sie unterschiedliche Stärken haben und man dadurch viel über Anforderungen, Transcoding und Nutzerkomfort lernt.

### n8n

n8n ist einer meiner Lieblingscontainer, weil er die Brücke zwischen Infrastruktur und Automatisierung schlägt. Ich nutze ihn für kleine Workflows, Benachrichtigungen, API-Abfragen und teilweise auch für KI-gestützte Prozesse. Gerade wenn man repetitive Aufgaben reduzieren will, ist n8n im Homelab ein sehr dankbarer Dienst.

### Portainer, Uptime Kuma und kleine Helfer

Neben den "großen" Diensten laufen bei mir immer auch ein paar Helfer. Uptime Kuma überwacht Erreichbarkeit und Ausfälle. Kleine DNS- oder Netzwerktools helfen beim Testen. Manchmal starte ich temporäre Container, um etwas auszuprobieren und danach wieder zu entfernen. Genau für solche Experimente ist Docker ideal, weil das Basissystem sauber bleibt.

## Meine wichtigsten Tipps für Einsteiger

Wenn ich heute noch einmal von vorn anfangen würde, würde ich ein paar Dinge bewusst früher richtig machen:

1. Nicht mit zehn Diensten gleichzeitig starten. Zwei oder drei Container reichen, um die Grundlagen wirklich zu verstehen.
2. Docker Compose früh lernen. Wer nur über Oberflächen klickt, verliert schnell die Nachvollziehbarkeit.
3. Daten immer persistent und getrennt speichern. Sonst wird der erste Neuaufbau unnötig schmerzhaft.
4. Logs lesen. Sehr viele Probleme sind keine Docker-Probleme, sondern Konfigurations- oder Berechtigungsprobleme.
5. Backups von Anfang an mitdenken. Ein Homelab ist keine Ausrede, Datensicherung auf später zu verschieben.
6. Dienste nicht unüberlegt veröffentlichen. Nicht alles, was praktisch erreichbar wäre, sollte auch öffentlich erreichbar sein.

Außerdem hilft sauberes Benennen enorm. Ein Container namens `app1` ist nach kurzer Zeit wertlos. Ein Stack wie `n8n-prod`, `jellyfin-media` oder `npm-proxy` spart später sehr viel Sucherei.

## Fazit und Ausblick

Für mich war Docker der Schritt vom gelegentlichen Basteln hin zu einem Homelab, das sich strukturiert und zuverlässig anfühlt. Die Kombination aus Synology NAS, Docker und Nginx Proxy Manager hat sich im Alltag bewährt, weil sie genug Komfort für schnelles Arbeiten bietet und gleichzeitig technisch sauber genug ist, um daraus wirklich etwas zu lernen.

Ich betreibe mein Homelab nicht nur aus Spaß. Es ist für mich auch eine Lern- und Testumgebung für Themen, die später produktiv relevant werden: saubere Service-Trennung, Reverse Proxies, Zertifikate, Monitoring und Automatisierung. Genau deshalb finde ich Docker so wertvoll. Man lernt nicht nur, wie man einen Container startet, sondern wie man Infrastruktur systematischer denkt.

Wenn du gerade anfängst, musst du kein perfektes Setup bauen. Viel wichtiger ist eine saubere Basis, die du später erweitern kannst. Genau dabei hilft Docker enorm. In einem nächsten Beitrag möchte ich tiefer auf Compose-Strukturen, Backup-Strategien und Sicherheitsmaßnahmen im Homelab eingehen, denn dort trennt sich die nette Demo von einem Setup, das langfristig wirklich Freude macht.
