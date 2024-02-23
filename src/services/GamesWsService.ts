import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type Game = {
  id: number,
  title: string,
  genre: string,
  platform: string,
  rating: string,
  releaseYear: number,
  salesInMillions: string
}
export type PaginatedResponse = { limit: number, page: number, remainingPages? : number, totalPages?: number };
export type GamesResponse = {
  data: Array<Game>
} & PaginatedResponse;

export default class GamesWsService {
  
  private api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3333'
    })
  }

  async fetch(method: 'get', path = '/games'): Promise<AxiosResponse<GamesResponse>> {
    const { data } = await this.api[method](path);
    return data;
  }
}