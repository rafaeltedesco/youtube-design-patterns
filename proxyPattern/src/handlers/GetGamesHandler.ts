import { IncomingMessage, ServerResponse } from 'http';
import BaseHandler from './BaseHandler';
import HttpException from '../exceptions/HttpException';
import GamesWsService, { GamesResponse } from '../services/GamesWsService';
import { AxiosError } from 'axios';
import { WsService } from '../services/WsService';

export default class GetGamesHandler extends BaseHandler {

  constructor(private readonly gamesWs: WsService = new GamesWsService()) {
    super();
  }
  
  protected canHandle(req: IncomingMessage, err: HttpException): boolean {
    return req.method === 'GET' && req.url!.includes('/games') && !err;
  }

  protected handle(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    this.gamesWs.fetch('get', req.url!)
      .then((result) => {
        return res.end(JSON.stringify(result));
      })
      .catch((err) => {
        if (err instanceof AxiosError && err.code === 'ECONNREFUSED') {
          const error = new HttpException('Service Unavailable', 503)
          return this.nextHandler?.handleRequest(req, res, error);
        }
        this.nextHandler?.handleRequest(req, res, new HttpException((err as Error).message, 500));        
      });
    
  }

}