import { IsString } from 'class-validator';

export class CreatePublicacionDto {
  //*TODO: Integrar swagger
  @IsString({
    message: 'EL campo de autor es requerido',
  })
  autor: string;
  @IsString()
  categoria: string;
  @IsString()
  contenido: string;
  @IsString()
  fechaPublicacion: string;
}
