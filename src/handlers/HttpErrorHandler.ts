import { IncomingMessage, ServerResponse } from 'http';
import HttpException from '../exceptions/HttpException';
import BaseHandler from './BaseHandler';

export default class HttpErrorHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage, err: HttpException): boolean {
    return !!err;
  }
  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>, err: HttpException): void {
      res.statusCode = err.statusCode;
      res.end(JSON.stringify({ error: err.message }));
  }

}