import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';

export default class PageNotFoundHandler extends BaseHandler {
  protected canHandle(req: IncomingMessage): boolean {
    return true;
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    res.end(JSON.stringify({ message: 'Page Not Found!'}));
  }

}