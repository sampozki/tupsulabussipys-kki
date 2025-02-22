const http = require('http');

const server = http.createServer((req, res) => {
  // Serve our Bootstrap-based HTML
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tupsulan bussipysäkit</title>
        <!-- Bootstrap CSS (CDN) -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        >
        <!-- Disable pointer events on iframes -->
        <style>
          iframe {
            pointer-events: none;
          }
        </style>
      </head>
      <body class="bg-light">
        <div class="container py-4">
          <!-- First row: just text -->
          <div class="row mb-3">
            <div class="col-12">
              <div class="card">
                <div class="card-body text-center">
                  <h1 class="card-title">Tupsulan bussipysäkit :3</h1>
                  <p> Minuutteja bussiin -> livenä kartalla</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Second row: two iframes side by side -->
          <div class="row g-4">
            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body p-0">
                  <iframe
                    src="https://tremonitori.digitransit.fi/view?cont=OegRrZntBRck8KebSxJC8w=="
                    width="100%"
                    height="600"
                    style="border: none;"
                  ></iframe>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card h-100">
                <div class="card-body p-0">
                  <iframe
                    src="https://tremonitori.digitransit.fi/view?cont=R0cybxFsZRC-uy2zCdbUdg=="
                    width="100%"
                    height="600"
                    style="border: none;"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Start the server on port 3000
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running at http://localhost:3000');
});