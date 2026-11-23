all4One-Hub.de

Ein Jailbreak-Host für die PlayStation 4 — gebaut auf Basis von WebKitty von ArabPixel.

Alles läuft im Browser der Konsole, ohne Installation, ohne PC. Firmware wird automatisch erkannt, die passende Exploit-Kette ausgewählt und der Jailbreak auf Knopfdruck gestartet.

Live: one4all-hub.de → erkennt PS3 / PS4 automatisch Direkt zum Hub: one4all-hub.de/ps4/

Inhaltsverzeichnis
Unterstützte Firmware
Benutzung
PS3 vorbereiten
Eigener Server
Danksagungen
Credits im Detail
Lizenz
Unterstützte Firmware
Userland-Exploit	Kernel-Exploit	Firmware
Bpf Double Free	Bpf Double Free	4.50 – 5.07
Bad Hoist	sleirsgoevy's 6.7x	6.70 – 6.72
PSFree	Lapse	7.00 – 9.60
CSSFontFace	Lapse	7.00 – 11.02
CSSFontFace	Netctrl	9.00 – 11.02
Wobkot (Slopkit)	Lapse	9.00 – 12.02
Slopkit	Lapse	10.00 – 12.02
Slopkit	Netctrl	12.50 – 13.00
Slopkit	Relapse	12.50 – 13.52
Slopkit	Afterglow	14.00 – 14.02
Nicht unterstützt: 5.50 – 6.51. Für diese Firmware gibt es derzeit keinen passenden Exploit.

GoldHEN-Versionen: v2.4b18.8, .9, .10, .12, .13, .14 — auf der Startseite wählbar.

Benutzung
PS4 einschalten
PS4 vorbereiten
Vor dem Jailbreak auf der PS4 diese Einstellungen ändern:

Einstellungen › System — Automatische Downloads: überall die Haken entfernen
Einstellungen › Netzwerk › Internetverbindung einrichten — LAN oder WLAN auswählen
Benutzerdefiniert — IP-Adresseinstellungen = Automatisch
DHCP — Nicht angeben
DNS manuell — Primärer DNS auf 62.210.38.117 ändern, weiter
Rest einfach weiter

Browser öffnen
one4all-hub.de aufrufen
Firmware und Kette werden automatisch erkannt
HEN-Variante wählen (GoldHEN / PS4HEN / nexHEN)
JAILBREAK drücken
Der Rand des Jailbreak-Knopfs zeigt den Status:

Farbe	Bedeutung
Blau	bereit
Gelb	läuft
Grün	jailbroken
Rot	Fehler — nochmal versuchen
Seiten-Reloads während des Jailbreaks sind normal. Die Relapse-Kette lädt die Seite bis zu viermal neu, um den Speicher sauber zu bekommen. Nicht abbrechen.

PS3

Bei der PS3 muss zwigned vor eine HFW 4.9311 geflasht werden

Zu erhalten hier : https://www.ps3xploit.me/firmware/hfw/HFW_4.93.1_PS3UPDAT.PUP


Eigener Server
git clone https://github.com/cojo11/ps4.git
cd ps4/ps4
python -m http.server 8080
Auf der Konsole dann http://<deine-ip>:8080 öffnen.

Der Hub cached sich selbst pro Firmware-Version. Nach Änderungen am Code muss der Cache in den Einstellungen geleert werden, sonst sieht die Konsole die alte Version.

Danksagungen
Dieser Hub wäre nicht möglich ohne die Arbeit vieler Menschen aus der PS4-Szene. Ganz besonderer Dank gilt:

Vorlage und Grundlage
ArabPixel — für WebKitty, den Host, auf dem dieses Projekt aufbaut. Ohne WebKitty gäbe es All4One Hub nicht. Live: webkitty.arabpixel.net · Mirror: arabpixel.gitlab.io/WebKitty
Exploits
abc und sleirsgoevy — PSFree (Userland) und Lapse (Kernel), dazu sleirsgoevy's 6.7x-Kernel-Exploit
qwertyoruiopz — BPF Double Free
Fire30 — Bad Hoist (Userland)
Nathan Fargo — CSSFontFace (Userland)
TheFlow — Netctrl (Kernel)
ufm42 — CSSFontFace Netctrl, Lapse und Wobkot Lapse
Jordy und Sonic-Iso — das originale Slopkit-Projekt
Egycnq — Portierung von Netctrl auf Slopkit
Raw Game — PS4-Port von Slopkit Lapse, Netctrl und Slopkit Relapse
m0zz — Slopkit Afterglow
Feyzee61 — PSFree Lapse Bundle (einzelne Datei) und 6.7x-Implementierung
Al-Azif — modulare PSFree-Lapse- und AIO-Workaround-Implementierung
HEN und Payloads
SiSTRo / GoldHEN — GoldHEN, der Homebrew Enabler
OpenOrbis — PS4-Toolchain, auf der das GoldHEN Plugin SDK aufsetzt
Nazky — der erste Host, der als Vorbild diente
Test und Sonstiges
Dr.Yenyen — umfangreiche Tests über viele Firmware-Versionen
GattoDev — das WebKitty-Logo
anonymous — PS4-Firmware-Kernel-Dumps
Alle Payload-Entwickler — für ihre Arbeit
Credits im Detail
Die vollständige Liste, wie sie in WebKitty steht — und damit auch hier gilt:

Person	Beitrag
abc	PSFree Userland- und Lapse Kernel-Exploits
Al-Azif	Modulare PSFree Lapse und AIO-Workaround
anonymous	PS4 Firmware Kernel-Dumps
Dr.Yenyen	Intensive Multi-Firmware-Tests
Egycnq	Portierung Netctrl zu Slopkit
Feyzee61	PSFree Lapse Bundle (Single-File), 6.7x-Implementierung
Fire30	Bad Hoist Userland-Exploit
GattoDev	WebKitty-Logo
Jordy, Sonic-Iso	Originales Slopkit-Projekt
m0zz	Slopkit Afterglow
Nathan Fargo, ufm42	CSSFontFace Userland-Exploit
Nazky	Erster Host als Vorbild
qwertyoruiopz	BPF Double Free
Raw Game	PS4-Port für Slopkit Lapse, Netctrl und Slopkit Relapse
sleirsgoevy	6.7x Kernel-Exploit
TheFlow	Netctrl Kernel-Exploit
ufm42	CSSFontFace Netctrl, Lapse und Wobkot Lapse
ArabPixel	WebKitty — die Vorlage für diesen Host
SiSTRo	GoldHEN
Sollte jemand fehlen: bitte ein Issue aufmachen, ich ergänze es sofort.

Lizenz
Dieses Projekt steht wie WebKitty unter der AGPL-3.0-or-later. Siehe LICENSE.

Teile des Codes gehören der Gruppe anonymous. Beiträge von anonymous werden ebenfalls als „anonymous" geführt.

<p align="center"> <strong>All4One Hub</strong> — gebaut mit Respekt vor der Szene.<br> Danke an <a href="https://github.com/ArabPixel/WebKitty">ArabPixel für WebKitty</a>. </p>
