import http from 'http';

const server = http.createServer((req, res) => {
  const { method, url } = req;
  switch (url) {
    case '/':
      if (method === 'GET') {
        res.end(JSON.stringify({ message: 'Hello, World!' }));
      }
      break;
    case '/users':
      if (method === 'GET') {
        res.end(JSON.stringify({ message: 'Hello, Users!'}));
      } else if (method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          res.statusCode = 201;
          res.end(body);
        });
      }
      break;
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
})