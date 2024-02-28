import { GamesResponse } from './GamesWsService';

export interface WsService {
  fetch(method: 'get', path: string): Promise<GamesResponse>
}