import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';
import HttpException from '../exceptions/HttpException';

export class LogHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage): boolean {
    return true;
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>, err: HttpException): void {
    console.log('LOG: ' + new Date() + ' - ' + req.method + ' - ' + req.url);
    this.nextHandler?.handleRequest(req, res, err);
  }

}