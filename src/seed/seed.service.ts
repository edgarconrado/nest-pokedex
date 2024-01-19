import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/proke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;


  async executeSeed() {
    let { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    data.results.forEach(({ name, url }) => {
      let segments = url.split('/')
      let noPokemon: number = +segments[ segments.length - 2 ];
      console.log({ name, noPokemon });
      
    })

    return data.results;
  }

}
