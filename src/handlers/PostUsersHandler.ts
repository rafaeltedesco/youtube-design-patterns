import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';
import HttpException from '../exceptions/HttpException';

export default class PostUsersHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage, err: HttpException): boolean {
    return req.method === 'POST' && req.url === '/users' && !err;
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