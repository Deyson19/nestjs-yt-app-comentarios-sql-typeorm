import { IsString } from 'class-validator';

export class CreateComentarioDto {
  //*TODO: Agrear decorador para para Swagger
  @IsString()
  nombrePersona: string;
  @IsString()
  texto: string;
  @IsString()
  publicacionId: string;
}
