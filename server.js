const http = require('http');

// Helper to create the top "heading" card with title and subtitle
function createHeadingCard(title, subtext, imgURL) {
  // We use Bootstrap’s flex utilities to position the image next to the title
  // Adjust classes or inline styles as desired for sizing/alignment
  return `
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-column flex-sm-row align-items-center">
          <img 
            src="${imgURL}" 
            alt="Logo" 
            class="img-fluid mb-3 mb-sm-0 me-sm-3" 
            style="max-height:60px;"
          />
          <div>
            <h1 class="card-title mb-0">${title}</h1>
            <p class="text-muted mb-0">${subtext}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper to create an iframe card (single column)
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

// Create the server
const server = http.createServer((req, res) => {
  // Build the HTML step by step
  let html = '';

  // Basic HTML boilerplate
  html += `
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
    </head>
    <body class="bg-light">
      <div class="container py-4">
  `;

  // First row: Single column with heading card
  html += createHeadingCard(
    'Tupsulan bussipysäkit :3',
    'Minuutteja bussiin -> livenä kartalla',
    'https://bus.sampozki.fi/tupsbus.png'
    //'https://via.placeholder.com/150' 
    // Example image URL
  );

  // Second row: Two columns with iframes
  html += `
        <div class="row g-4">
          ${createIframeCard('https://tremonitori.digitransit.fi/view?cont=3I-hT7HPFBjJkjeEeNLMMQ==')}
          ${createIframeCard('https://tremonitori.digitransit.fi/view?cont=6+yg0k--KpkTYhDCw3zWGg==')}
        </div>
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