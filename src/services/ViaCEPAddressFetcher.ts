import axios, { AxiosInstance } from 'axios';

export default class ViaCEPAddressFetcher {

  private wsURL = 'https://viacep.com.br/ws'
  private format = 'json';

  async fetch(cep: string) {
    const url = `${this.wsURL}/${cep}/${this.format}`;
    const { data } = await axios.get(url); 
    return data;
  }
}