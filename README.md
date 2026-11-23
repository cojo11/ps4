# One4All Hub

Ein Jailbreak-Host für die PlayStation 4 — gebaut auf **WebKitty** von **ArabPixel**.

Alles läuft im Browser der Konsole, ohne Installation, ohne PC. Firmware wird automatisch erkannt, die passende Exploit-Kette ausgewählt und der Jailbreak auf Knopfdruck gestartet.

**Live:** [one4all-hub.de](http://one4all-hub.de/) → erkennt PS3 / PS4 automatisch
**PS4:** [one4all-hub.de/ps4/](http://one4all-hub.de/ps4/)
**PS3 HEN:** [one4all-hub.de/hen/](http://one4all-hub.de/hen/)

---

## Inhaltsverzeichnis

- [Unterstützte Firmware](#unterstützte-firmware)
- [Benutzung](#benutzung)
- [PS3 vorbereiten](#ps3-vorbereiten)
- [Eigener Server](#eigener-server)
- [Danksagungen](#danksagungen)
- [Credits im Detail](#credits-im-detail)
- [Lizenz](#lizenz)

---

## Unterstützte Firmware

| Userland-Exploit | Kernel-Exploit | Firmware |
|---|---|---|
| Bpf Double Free | Bpf Double Free | 4.50 – 5.07 |
| Bad Hoist | sleirsgoevy's 6.7x | 6.70 – 6.72 |
| PSFree | Lapse | 7.00 – 9.60 |
| CSSFontFace | Lapse | 7.00 – 11.02 |
| CSSFontFace | Netctrl | 9.00 – 11.02 |
| Wobkot (Slopkit) | Lapse | 9.00 – 12.02 |
| Slopkit | Lapse | 10.00 – 12.02 |
| Slopkit | Netctrl | 12.50 – 13.00 |
| Slopkit | Relapse | 12.50 – 13.52 |
| Slopkit | Afterglow | 14.00 – 14.02 |

**Nicht unterstützt:** 5.50 – 6.51. Für diese Firmware gibt es derzeit keinen passenden Exploit.

**GoldHEN-Versionen:** v2.4b18.8, .9, .10, .12, .13, .14 — auf der Startseite wählbar.

---

## Benutzung

1. PS4 einschalten, Browser öffnen
2. `one4all-hub.de` aufrufen
3. Firmware und Kette werden automatisch erkannt
4. HEN-Variante wählen (GoldHEN / PS4HEN / nexHEN)
5. **JAILBREAK** drücken

Der Rand des Jailbreak-Knopfs zeigt den Status:

| Farbe | Bedeutung |
|---|---|
| Blau | bereit |
| Gelb | läuft |
| Grün | jailbroken |
| Rot | Fehler — nochmal versuchen |

**Seiten-Reloads während des Jailbreaks sind normal.** Die Relapse-Kette lädt die Seite bis zu viermal neu, um den Speicher sauber zu bekommen. Nicht abbrechen.

---

## PS3 vorbereiten

Vor dem Jailbreak auf der PS3 diese Einstellungen ändern:

1. **Einstellungen › System** — Automatische Downloads: überall die Haken entfernen
2. **Einstellungen › Netzwerk › Internetverbindung einrichten** — LAN oder WLAN auswählen
3. **Benutzerdefiniert** — IP-Adresseinstellungen = Automatisch
4. **DHCP** — Nicht angeben
5. **DNS manuell** — Primärer DNS auf `62.210.38.117` ändern, weiter
6. Rest einfach weiter

> **Hinweis:** Der PS3-Browser kann kein TLS 1.2. Er braucht eine HTTP-Verbindung ohne Zwangsumleitung. Bei GitHub Pages muss dafür **Enforce HTTPS aus** sein (Settings → Pages).

### PS3HEN installieren

Der HEN-Installer liegt unter **[/hen/](http://one4all-hub.de/hen/)** und deckt **4.80 – 4.93** ab (CEX 4.80–4.82, DEX 4.82–4.84, CEX 4.83–4.93 HFW).

1. PS3-Browser öffnen, `one4all-hub.de/hen/` aufrufen
2. Oben steht die erkannte Firmware
3. **Browser-Bestätigung beim Schließen ausschalten** (sonst bricht der Installer ab)
4. **Initialize HEN installer** drücken
5. Warten, bis „initialized successfully" erscheint
6. **Install HEN** drücken
7. Nach Erfolg neu starten

Die `.p3t`-Payloads liegen pro Firmware im Unterordner und werden beim Laden automatisch geladen. Kein Python, kein Server – reines HTML und JavaScript.

**Bekannter Fehler im Original, hier behoben:** Die Firmware-Liste im Installer hatte nur 35 Einträge, der Code fragte aber Index 35 für 4.93 ab. Dadurch meldete 4.93 fälschlich „nicht kompatibel". Ergänzt.

---

## Eigener Server

```bash
git clone https://github.com/cojo11/ps4.git
cd ps4/ps4
python -m http.server 8080
```

Auf der Konsole dann `http://<deine-ip>:8080` öffnen.

Der Hub cached sich selbst pro Firmware-Version. Nach Änderungen am Code muss der Cache in den Einstellungen geleert werden, sonst sieht die Konsole die alte Version.

---

## Danksagungen

Dieser Hub wäre nicht möglich ohne die Arbeit vieler Menschen aus der PS4-Szene. Ganz besonderer Dank gilt:

### Vorlage und Grundlage

- **[ArabPixel](https://github.com/ArabPixel)** — für **[WebKitty](https://github.com/ArabPixel/WebKitty)**, den Host, auf dem dieses Projekt aufbaut. Ohne WebKitty gäbe es One4All Hub nicht.
  Live: [webkitty.arabpixel.net](http://webkitty.arabpixel.net/) · Mirror: [arabpixel.gitlab.io/WebKitty](https://arabpixel.gitlab.io/WebKitty)

### Exploits

- **abc** und **[sleirsgoevy](https://github.com/sleirsgoevy)** — PSFree (Userland) und Lapse (Kernel), dazu sleirsgoevy's 6.7x-Kernel-Exploit
- **[qwertyoruiopz](https://github.com/qwertyoruiopz)** — BPF Double Free
- **[Fire30](https://github.com/Fire30)** — Bad Hoist (Userland)
- **Nathan Fargo** — CSSFontFace (Userland)
- **[TheFlow](https://github.com/theflow0)** — Netctrl (Kernel)
- **[ufm42](https://github.com/ufm42)** — CSSFontFace Netctrl, Lapse und Wobkot Lapse
- **[Jordy](https://github.com/jordy) und Sonic-Iso** — das originale Slopkit-Projekt
- **[Egycnq](https://github.com/Egycnq)** — Portierung von Netctrl auf Slopkit
- **[Raw Game](https://github.com/rawgame)** — PS4-Port von Slopkit Lapse, Netctrl und Slopkit Relapse
- **[m0zz](https://github.com/m0zz)** — Slopkit Afterglow
- **[Feyzee61](https://github.com/Feyzee61)** — PSFree Lapse Bundle (einzelne Datei) und 6.7x-Implementierung
- **[Al-Azif](https://github.com/Al-Azif)** — modulare PSFree-Lapse- und AIO-Workaround-Implementierung

### HEN und Payloads

- **[SiSTRo](https://github.com/SiSTR0) / [GoldHEN](https://github.com/GoldHEN/GoldHEN)** — GoldHEN, der Homebrew Enabler
- **[OpenOrbis](https://github.com/OpenOrbis)** — PS4-Toolchain, auf der das GoldHEN Plugin SDK aufsetzt
- **[Nazky](https://github.com/Nazky)** — der erste Host, der als Vorbild diente

### Test und Sonstiges

- **[Dr.Yenyen](https://github.com/DrYenyen)** — umfangreiche Tests über viele Firmware-Versionen
- **[GattoDev](https://github.com/GattoDev)** — das WebKitty-Logo
- **anonymous** — PS4-Firmware-Kernel-Dumps
- **Alle Payload-Entwickler** — für ihre Arbeit

---

## Credits im Detail

Die vollständige Liste, wie sie in WebKitty steht — und damit auch hier gilt:

| Person | Beitrag |
|---|---|
| abc | PSFree Userland- und Lapse Kernel-Exploits |
| Al-Azif | Modulare PSFree Lapse und AIO-Workaround |
| anonymous | PS4 Firmware Kernel-Dumps |
| Dr.Yenyen | Intensive Multi-Firmware-Tests |
| Egycnq | Portierung Netctrl zu Slopkit |
| Feyzee61 | PSFree Lapse Bundle (Single-File), 6.7x-Implementierung |
| Fire30 | Bad Hoist Userland-Exploit |
| GattoDev | WebKitty-Logo |
| Jordy, Sonic-Iso | Originales Slopkit-Projekt |
| m0zz | Slopkit Afterglow |
| Nathan Fargo, ufm42 | CSSFontFace Userland-Exploit |
| Nazky | Erster Host als Vorbild |
| qwertyoruiopz | BPF Double Free |
| Raw Game | PS4-Port für Slopkit Lapse, Netctrl und Slopkit Relapse |
| sleirsgoevy | 6.7x Kernel-Exploit |
| TheFlow | Netctrl Kernel-Exploit |
| ufm42 | CSSFontFace Netctrl, Lapse und Wobkot Lapse |
| ArabPixel | WebKitty — die Vorlage für diesen Host |
| SiSTRo | GoldHEN |

Sollte jemand fehlen: bitte ein Issue aufmachen, ich ergänze es sofort.

---

## Lizenz

Dieses Projekt steht wie WebKitty unter der **AGPL-3.0-or-later**. Siehe [LICENSE](LICENSE).

Teile des Codes gehören der Gruppe *anonymous*. Beiträge von *anonymous* werden ebenfalls als „anonymous" geführt.

---

<p align="center">
  <strong>One4All Hub</strong> — gebaut mit Respekt vor der Szene.<br>
  Danke an <a href="https://github.com/ArabPixel/WebKitty">ArabPixel für WebKitty</a>.
</p>
