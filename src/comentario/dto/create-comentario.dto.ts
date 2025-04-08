import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateComentarioDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  nombrePersona: string;
  @ApiProperty({ type: String, required: true })
  @IsString()
  texto: string;
  @ApiProperty({ type: String, required: true })
  @IsString()
  publicacionId: string;
}
