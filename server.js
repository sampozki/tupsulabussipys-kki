const express = require('express');
const path = require('path');

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
function createIframeCard(url, comment) {
  return `
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-body p-0">
          <!-- ${comment} -->
          <iframe src="${url}" width="100%" height="600" style="border: none; pointer-events: none;"> </iframe>
        </div>
      </div>
    </div>`;
}

// Create footer with repo url
function createFooter() {
  return `
    <footer class="text-center mt-5">
      <hr />
      <p>
        <a href="https://github.com/sampozki/tupsulabussipys-kki" target="_blank" rel="noopener noreferrer">Repositorio</a>
      </p>
    </footer>`;
}

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(
`<!DOCTYPE html>
<html lang="fi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tupsulan bussipysäkit</title>

    <!-- local version of https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/vapor/bootstrap.min.css --> 
    <link rel="stylesheet" href="/bootstrap.min.css">
    
    <link rel="icon" href="/favicon.ico">
  </head>
  <body>
    <div class="container py-4">
      ${createHeadingCard()}

      <div class="row g-4">
        ${createIframeCard('https://tremonitori.digitransit.fi/view?cont=OegRrZntBRck8KebSxJC8w==', 'Bus stop to keskusta')}
        ${createIframeCard('https://tremonitori.digitransit.fi/view?cont=R0cybxFsZRC-uy2zCdbUdg==', 'Bus stop to Hervanta')}
      </div>
        ${createFooter()}
    </div>
  </body>
</html>`);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});