import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';
import url from 'url';
import { ParsedUrlQuery } from 'querystring';
import ViaCEPAddressFetcher from '../services/ViaCEPAddressFetcher';

export default class GetUserAddressHandler extends BaseHandler {

  private ws: ViaCEPAddressFetcher;

  constructor() {
    super();
    this.ws = new ViaCEPAddressFetcher();
  }

  private query: ParsedUrlQuery | undefined;

  protected canHandle(req: IncomingMessage): boolean {
    const parsedUrl = url.parse(req.url!, true)
    this.query = parsedUrl.query;
    return req.method === 'GET' && parsedUrl.pathname === '/users/address';
  }

  protected async handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    if (!this.query || !this.query['cep']) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'CEP is required'}))
      return;
    }
    const cep = this.query['cep'];
    try {
      const result = await this.ws.fetch(cep as string);
      res.end(JSON.stringify({ message: result }));
      return;
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: err.message }))
    }
  }
}