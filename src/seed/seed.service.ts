import { Injectable } from '@nestjs/common';
import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { axiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
    constructor( 
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: axiosAdapter,
      ) { }
    
   
    async executeSeed() {
        await this.pokemonModel.deleteMany({})// delete * from pokemons;
        const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=40')

        const pokemonToInsert: { name:string, no:number}[] = [];
        data.results.forEach(async ({ name, url }) => {
            const segments = url.split('/');
            const no = +segments[segments.length - 2];
           // const pokemon = await this.pokemonModel.create({name, no})
            pokemonToInsert.push({name, no})
        })
        await this.pokemonModel.insertMany(pokemonToInsert);
        return 'Seed Executed';
    }
}
