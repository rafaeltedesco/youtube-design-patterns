import { IncomingMessage, ServerResponse } from 'http';

export default abstract class BaseHandler {
  constructor(protected nextHandler?: BaseHandler) {}

  setNext(nextHandler: BaseHandler) {
    this.nextHandler = nextHandler;
  }

  handleRequest(req: IncomingMessage, res: ServerResponse): void {
    if (!this.canHandle(req)) {
      if (this.nextHandler) {
        return this.nextHandler.handleRequest(req, res);
      }
    }
    res.setHeader('Content-Type', 'application/json');
    return this.handle(req, res);
  }

  protected abstract canHandle(req: IncomingMessage): boolean;
  protected abstract handle(req: IncomingMessage, res: ServerResponse): void;
}


