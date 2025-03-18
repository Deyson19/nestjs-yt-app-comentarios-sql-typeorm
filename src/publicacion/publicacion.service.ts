import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository } from 'typeorm';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
  ) {}

  private request = new BehaviorSubject<string>('');
  public getMessage(): Observable<string> {
    return this.request.asObservable();
  }
  async create(model: CreatePublicacionDto): Promise<Publicacion> {
    try {
      const result = await this.publicacionRepository.create(model);
      await this.publicacionRepository.save(result);
      return result;
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('Error al crear la publicacion');
    } finally {
      this.request.next('Publicacion creada correctamente');
    }
  }

  async findAll(): Promise<Publicacion[]> {
    const result = await this.publicacionRepository.find();
    this.request.next(`Publicaciones encontradas: ${result.length}`);
    return result;
  }

  async findOne(id: string): Promise<Publicacion | null> {
    try {
      const publicacion = await this.getPost(id);
      return publicacion;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error al obtener la publicacion');
    }
  }

  async update(id: string, model: UpdatePublicacionDto) {
    try {
      let post = await this.getPost(id);

      if (!post) {
        return false;
      } else {
        post = { ...post, ...model };
        //    post = Object.assign(post, model);
        await this.publicacionRepository.save(post);
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error al actualizar la publicacion');
    }
  }

  async remove(id: string) {
    try {
      const post = await this.getPost(id);
      if (!post) {
        return false;
      } else {
        await this.publicacionRepository.remove(post);
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Error al eliminar la publicacion');
    }
  }
  private async getPost(
    id: string,
    relations: boolean = false,
  ): Promise<Publicacion> {
    if (relations) {
      return await this.publicacionRepository.findOne({
        where: { id },
        relations: ['comentarios'],
      });
    } else {
      return await this.publicacionRepository.findOneBy({ id });
    }
  }
}
