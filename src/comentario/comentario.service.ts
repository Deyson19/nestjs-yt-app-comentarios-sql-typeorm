import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PublicacionService } from 'src/publicacion/publicacion.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';

@Injectable()
export class ComentarioService {
  constructor(
    private readonly publicacionService: PublicacionService,
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
  ) {}
  async create(model: CreateComentarioDto) {
    try {
      const publicacion = await this.publicacionService.findOne(
        model.publicacionId,
      );
      if (!publicacion) {
        return false;
      } else {
        const comentario = this.comentarioRepository.create(model);
        console.log('comentario', comentario);
        await this.comentarioRepository.save(comentario);
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el comentario');
    }
  }

  async findAll() {
    try {
      const comentarios = await this.comentarioRepository.find();
      return comentarios;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al obtener los comentarios',
      );
    }
  }

  async findOne(id: string) {
    try {
      const comentario = await this.getOne(id);
      return comentario;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al obtener el comentario');
    }
  }

  async update(id: string, model: UpdateComentarioDto) {
    try {
      const comentario = await this.getOne(id);
      if (!comentario) {
        return false;
      } else {
        const update = Object.assign(comentario, model);
        await this.comentarioRepository.save(update);
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al actualizar el comentario',
      );
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const comentario = await this.getOne(id);
      if (!comentario) {
        return false;
      } else {
        await this.comentarioRepository.remove(comentario);
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar el comentario');
    }
  }

  private async getOne(id: string, relations: boolean = false) {
    if (relations) {
      return await this.comentarioRepository.findOne({
        where: { id },
        relations: ['publicacion'],
      });
    } else {
      return await this.comentarioRepository.findOneBy({ id: id });
    }
  }
}
