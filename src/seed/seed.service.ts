import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/proke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model, model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {  

  constructor(
    @InjectModel( Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {
  }


  async executeSeed() {

    this.pokemonModel.deleteMany({});

    let data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    let pokemonToInsert: { name: string, noPokemon: number }[] = [];

    data.results.forEach(({ name, url }) => {
      let segments = url.split('/')
      let noPokemon: number = +segments[ segments.length - 2 ];      

      //let pokemon = await this.pokemonModel.create( { name, noPokemon } );
      pokemonToInsert.push({ name, noPokemon });

    })

    this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }

}
