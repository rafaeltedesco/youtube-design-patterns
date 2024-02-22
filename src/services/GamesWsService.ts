import axios, { AxiosInstance } from 'axios';

export default class GamesWsService {
  
  private api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3333'
    })
  }

  async fetch(method: 'get' | 'post', path = '/games') {
    const { data } = await this.api[method](path);
    return data;
  }
}