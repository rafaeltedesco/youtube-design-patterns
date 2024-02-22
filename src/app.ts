import http from 'http';
import HelloHandler from './handlers/HelloHandler';
import GetUsersHandler from './handlers/GetUsersHandler';
import PostUsersHandler from './handlers/PostUsersHandler';
import PageNotFoundHandler from './handlers/PageNotFoundHandler';
import Router from './router';
import LogHandler from './handlers/LogHandler';
import HttpErrorHandler from './handlers/HttpErrorHandler';
import GetGamesHandler from './handlers/GetGamesHandler';

const server = http.createServer((req, res) => {
  const handlers = [
    new LogHandler(),
    new HelloHandler(),
    new GetUsersHandler(),
    new GetGamesHandler(),
    new PostUsersHandler(),
    new HttpErrorHandler(),
    new PageNotFoundHandler(),
  ]
  const router = new Router(...handlers);
  router.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
})