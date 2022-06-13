from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import cgi
import json

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        BaseHTTPRequestHandler.end_headers(self)


    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()


    def do_POST(self):
        ctype, _ = cgi.parse_header(self.headers.get('content-type'))
        
        # refuse to receive non-json content
        if ctype != 'application/json':
            self.send_response(400)
            self.end_headers()
            return

        # TODO: have this call the python clustering script,
        #  and send useful responses (i.e. errors if certain
        #  arguments were outside of acceptable ranges, etc.)
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        print(post_body)

        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        # TODO: useful responses (errors, etc.) will go here
        self.wfile.write(bytes("here's your response", "utf-8"))


if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")