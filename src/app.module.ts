import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacionModule } from './publicacion/publicacion.module';
import { Publicacion } from './publicacion/entities/publicacion.entity';

@Module({
  imports: [
    //*Leer variables de entorno en NESTJS
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.SERVER,
      port: parseInt(process.env.DB_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      extra: {
        trustServerCertificate: true,
      },
      entities: [
        //*Importar entidades
        Publicacion,
      ],
    }),
    PublicacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
