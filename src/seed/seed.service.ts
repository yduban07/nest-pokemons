import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,
  ) {}


  async executeSeed() {
    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=700`);

    // const insertPromisesArray = [];
    const pokemonToInsert:{name:string, no:number}[] = [];

    data.results.forEach( ({name, url}) => {

      const no:number = +url.split('/').at(-2);
      // const pokemon =  this.pokemonModel.create({name, no});
      // insertPromisesArray.push(this.pokemonModel.create({name, no}));

      pokemonToInsert.push({name, no});

    });

    await this.pokemonModel.insertMany(pokemonToInsert)
    // await Promise.all(insertPromisesArray);
    return 'Seed executed'

  
  }

}
