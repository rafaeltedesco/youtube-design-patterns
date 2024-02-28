import { IncomingMessage, ServerResponse } from 'http';
import HttpException from '../exceptions/HttpException';

export default abstract class BaseHandler {
  constructor(protected nextHandler?: BaseHandler) {}

  setNext(nextHandler: BaseHandler) {
    this.nextHandler = nextHandler;
  }

  handleRequest(req: IncomingMessage, res: ServerResponse, err?: HttpException): void {
    if (!this.canHandle(req, err)) {
      if (this.nextHandler) {
        return this.nextHandler.handleRequest(req, res, err);
      }
    }
    res.setHeader('Content-Type', 'application/json');
    return this.handle(req, res, err);
  }
  protected abstract canHandle(req: IncomingMessage, err?: HttpException): boolean;
  protected abstract handle(req: IncomingMessage, res: ServerResponse, err?: HttpException): void;
}


