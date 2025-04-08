import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publicaciones')
@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  async create(@Body() createPublicacionDto: CreatePublicacionDto) {
    const result = await this.publicacionService.create(createPublicacionDto);
    if (result) {
      return {
        statusCode: 201,
        message: 'Publicación creada correctamente',
      };
    } else {
      throw new BadRequestException('No se pudo crear la publicación');
    }
  }

  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.publicacionService.findOne(id);
    if (result) {
      return {
        statusCode: 200,
        message: 'Publicación encontrada',
        publicacion: result,
      };
    } else {
      throw new NotFoundException('Publicación no encontrada');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePublicacionDto: UpdatePublicacionDto,
  ) {
    const result = await this.publicacionService.update(
      id,
      updatePublicacionDto,
    );

    if (result) {
      return {
        statusCode: 200,
        message: 'Publicación actualizada correctamente',
      };
    } else {
      throw new BadRequestException('No se pudo actualizar la publicación');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = this.publicacionService.remove(id);
    if (result) {
      return {
        statusCode: 200,
        message: 'Publicación eliminada correctamente',
      };
    } else {
      throw new NotFoundException('Publicación no encontrada');
    }
  }
}
