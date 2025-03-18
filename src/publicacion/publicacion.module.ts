import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { Publicacion } from './entities/publicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
  exports: [PublicacionService],
})
export class PublicacionModule {}
