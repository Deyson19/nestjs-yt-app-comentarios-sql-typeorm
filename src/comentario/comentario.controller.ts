import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { STATUS_CODES } from 'http';
import { Response } from 'express';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    const result = await this.comentarioService.create(createComentarioDto);
    if (result) {
      return {
        statusCode: STATUS_CODES[201],
        message: 'Comentario creado correctamente',
      };
    } else {
      return {
        message: 'No se pudo crear el comentario',
        statusCode: STATUS_CODES[400],
      };
    }
  }

  @Get()
  async findAll() {
    const result = await this.comentarioService.findAll();
    return {
      statusCode: STATUS_CODES[200],
      data: result,
      message:
        result.length > 0 ? 'Comentarios encontrados' : 'No hay comentarios',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, resp: Response) {
    const result = await this.comentarioService.findOne(id);
    if (result) {
      return {
        statusCode: STATUS_CODES[200],
        message: 'Comentario encontrado',
        data: result,
      };
    } else {
      throw new NotFoundException('Comentario no encontrado');
      //     return resp.status(404).send('Comentario no encontrado');
      //  return {
      //    statusCode: STATUS_CODES[404],
      //    message: 'Comentario no encontrado',
      //  };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComentarioDto: UpdateComentarioDto,
  ) {
    const result = await this.comentarioService.update(id, updateComentarioDto);
    if (result) {
      return {
        statusCode: STATUS_CODES[200],
        data: result,
        message: 'Comentario actualizado',
      };
    }
    return {
      statusCode: STATUS_CODES[404],
      message: 'Comentario no encontrado',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.comentarioService.remove(id);
    if (result) {
      return { statusCode: STATUS_CODES[200], message: 'Comentario eliminado' };
    } else {
      return {
        statusCode: STATUS_CODES[404],
        message: 'Comentario no encontrado',
      };
    }
  }
}
