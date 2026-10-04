const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'app');
const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.mp3':'audio/mpeg','.ogg':'audio/ogg','.json':'application/json'};
http.createServer((req, res) => {
  const url = req.url === '/' ? '/app.html' : req.url;
  const f = path.join(root, url.split('?')[0]);
  const ext = path.extname(f);
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': mime[ext] || 'text/plain', 'Access-Control-Allow-Origin': '*'});
    res.end(data);
  });
}).listen(4321, () => console.log('Serving on http://localhost:4321'));
