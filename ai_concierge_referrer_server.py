from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os


ROOT = Path(
    "/Users/park.yang/Downloads/Charter Parimi - Concierge AI/"
    "Charter Parimi - Consumer AI Concierge 2 Codex"
)


class ReferrerPolicyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", 8787), ReferrerPolicyHandler)
    print("Serving AI concierge at http://127.0.0.1:8787/index.html")
    server.serve_forever()
