import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';
import HttpException from '../exceptions/HttpException';

export default class HelloHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage): boolean {
    return req.method === 'GET' && req.url === '/';
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.end(JSON.stringify({ message: 'Hello, World!' }));
  }

}