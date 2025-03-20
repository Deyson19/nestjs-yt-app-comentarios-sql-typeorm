import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { PublicacionModule } from 'src/publicacion/publicacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';

@Module({
  imports: [PublicacionModule, TypeOrmModule.forFeature([Comentario])],
  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule {}
