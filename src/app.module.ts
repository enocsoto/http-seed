import { join } from 'path'; //viene de node no hay que instalarlo solo importarlo
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')//se sirve la carpeta con el nombre public
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  exports: [AppModule]
})
export class AppModule { }
