const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Create heading card
function createHeadingCard() {
  return `
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-column flex-sm-row justify-content-center">
          <img src="/tupsbus.png" alt="Logo" class="img-fluid mb-2 mb-sm-0 me-sm-2 ratio ratio-1x1" style="width: 80px;"/>
          <div>
            <h1 class="card-title mb-0">Tupsulan bussipysäkit :3</h1>
            <p class="text-muted mb-0">Minuutteja bussiin -> livenä kartalla</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Create bus timetable iframe
function createIframeCard(url) {
  return `
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body p-0">
          <iframe
            src="${url}"
            width="100%"
            height="600"
            style="border: none; pointer-events: none;"
          >
          </iframe>
        </div>
      </div>
    </div>
  `;
}

// Create footer with repo url
function createFooter() {
  return `
    <footer class="text-center mt-5">
      <hr />
      <p>
        <a href="https://github.com/sampozki/tupsulabussipys-kki" target="_blank" rel="noopener noreferrer">
          Repositorio
        </a>
      </p>
    </footer>
  `;
}

// Create basic HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  // Serve favicon.ico
  if (parsedUrl.pathname === '/favicon.ico') {
    const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
    fs.access(faviconPath, fs.constants.F_OK, (err) => {
      if (err) {
        // Fallback: no favicon
        res.writeHead(404);
        return res.end();
      }
      // Serve the .ico file
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      fs.createReadStream(faviconPath).pipe(res);
    });
    return;
  }

  // Serve tupsbus.png image
  if (parsedUrl.pathname === '/tupsbus.png') {
    const logoPath = path.join(__dirname, 'public', 'tupsbus.png');
    fs.access(logoPath, fs.constants.F_OK, (err) => {
      if (err) {
        // 404 if image can't be found
        res.writeHead(404);
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(logoPath).pipe(res);
    });
    return;
  }

  // Basic HTML boilerplate
  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tupsulan bussipysäkit</title>
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/vapor/bootstrap.min.css">
        
        <link rel="icon" href="/favicon.ico">
      </head>
      <body>
        <div class="container py-4">
          <!-- Heading card -->
          ${createHeadingCard()}

          <!-- Second row with two iframes -->
          <div class="row g-4">
            <!-- Shows the bus stop to keskusta -->
            ${createIframeCard('https://tremonitori.digitransit.fi/view?cont=OegRrZntBRck8KebSxJC8w==')}
            <!-- Shows the bus stop to Hervanta -->
            ${createIframeCard('https://tremonitori.digitransit.fi/view?cont=R0cybxFsZRC-uy2zCdbUdg==')}
          </div>

            ${createFooter()}

        </div>
      </body>
    </html>
  `;

  // Send the response
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

// Start server on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});