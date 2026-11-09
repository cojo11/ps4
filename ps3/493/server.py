import http.server
import socketserver

PORT = 8080

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Erzwingt den korrekten MIME-Typ fuer die P3T-Datei
        if self.path.endswith('.P3T'):
            self.send_header('Content-Type', 'application/octet-stream')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Server laeuft auf Port {PORT}.")
    httpd.serve_forever()
