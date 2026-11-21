# All4One Hub

Schlanker PS4-Jailbreak-Host für den Raspberry Pi. Nur das Nötige: Firmware erkennen,
Exploit-Kette starten, GoldHEN laden. Kein FTP, keine Tools, keine Homebrew-Payloads.

## Was drin ist

- Jailbreak für PS4-Firmware 4.50 - 5.07 und 6.70 - 14.02
- GoldHEN-Auswahl (2.4b18.7 - 2.4b18.14), PS4HEN und nexHEN
- Exploit-Ketten: Relapse, Slopkit, Slopkit Afterglow, CSSFontFace, Bad Hoist, PSFree
- Offline-Cache auf Knopfdruck
- Ein Look: Anthrazit

## Auf den Pi bringen

1. Ordner in den Webroot des Pi kopieren, z. B. nach `/www/ps4/`
2. Auf der PS4 im Browser `http://<pi-ip>/ps4/` öffnen

Der Hub braucht kein Internet. Nur der Pi muss im gleichen Netz erreichbar sein.

## Bedienung

- `Run Jailbreak` startet die Kette, `Stop` bricht ab
- Der Log läuft auf der Startseite mit
- `i` zeigt die Version, das Zahnrad den Rest

## Danke

Basiert auf WebKitty von ArabPixel und den Exploits von ufm42, Nathan Fargo und der Szene.
