import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';

export default class GetUsersHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage): boolean {
    return req.method === 'GET' && req.url === '/users';
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.end(JSON.stringify({ message: 'Hello, Users!'}));
  }

}