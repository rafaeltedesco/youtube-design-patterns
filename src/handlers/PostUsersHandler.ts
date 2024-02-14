import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';

export default class PostUsersHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage): boolean {
    return req.method === 'POST' && req.url === '/users';
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      res.statusCode = 201;
      res.end(body);
    });
  }
}