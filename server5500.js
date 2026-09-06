// G12 测试用静态服务器：服务 tavern_helper_template 根目录（含 dist/）
// 用法：node server5500.js  （保持运行，酒馆状态栏从 http://localhost:5500 拉取页面）
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};
http
  .createServer((req, res) => {
    let f = '/index.html';
    try {
      f = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
      res.writeHead(400);
      res.end();
      return;
    }
    if (f === '/') f = '/index.html';
    const p = path.join(root, f);
    if (!p.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(p, (e, d) => {
      if (e) {
        res.writeHead(404);
        res.end('404');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' });
      res.end(d);
    });
  })
  .listen(5500, () => console.log('dist server up on 5500 (root=tavern_helper_template)'));
