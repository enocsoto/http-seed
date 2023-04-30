import { join } from 'path'; //viene de node no hay que instalarlo solo importarlo
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
   
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')//se sirve la carpeta con el nombre public
    }),
    
  
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
  
    PokemonModule,
  
    CommonModule,
  ],
})
export class AppModule {}
