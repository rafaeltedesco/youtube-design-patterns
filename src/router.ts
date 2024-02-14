import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './handlers/BaseHandler';

export default class Router {
  private handlers: BaseHandler[] = [];

  constructor(...handlers: BaseHandler[]) {
    this.handlers = handlers;
    this.registerHandlers();
  }

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    this.handlers[0].handleRequest(req, res);
  }

  private registerHandlers() {
    for (let i = 0; i < this.handlers.length -1; i++) {
      this.handlers[i].setNext(this.handlers[i + 1]);
    }
  }
}