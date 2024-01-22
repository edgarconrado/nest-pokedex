import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';


@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot( process.env.MONGODB ),

    PokemonModule,

    SeedModule
  ],
})
export class AppModule {}
