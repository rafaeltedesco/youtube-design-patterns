import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';
import HttpException from '../exceptions/HttpException';

export default class GetUsersHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage, err: HttpException): boolean {
    return req.method === 'GET' && req.url === '/users' && !err;
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.end(JSON.stringify({ message: 'Hello, Users!'}));
  }

}