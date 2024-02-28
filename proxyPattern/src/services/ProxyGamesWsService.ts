import GamesWsService, { GamesResponse } from './GamesWsService';
import { WsService } from './WsService';

type CacheType = {
  cachedAt: number
} & GamesResponse;

export default class ProxyGamesWsService implements WsService {

  private cache: Record<string, CacheType> = {}
  private cacheDuration = 1000 * 60 * 5;
  
  constructor(private gamesWsService = new GamesWsService()) {}
  
  
  async fetch(method: 'get', path: string): Promise<GamesResponse> {
    const now = Date.now();
    if (this.cache[path] && now - this.cache[path].cachedAt < this.cacheDuration) {
      return this.cache[path];
    }

    console.log('Registering cache for ', path);
    const response = await this.gamesWsService.fetch(method, path);
    this.cache[path] = {
      cachedAt: now,
      ...response
    }
    return response;
  }

}