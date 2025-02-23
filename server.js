const html = require("./html.js")
const express = require('express');
const path = require('path');

const app = express();

// Log events 
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`[${new Date().toISOString()}] ${ip} requested: ${req.method} ${req.url}`);
  next();
});

// Serve content from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve html.htmlPage()
app.get('/', (req, res) => {
  res.send(html.htmlPage());
});

app.use((req, res) => {
  res.status(404).send('404 - Resource Not Found');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});