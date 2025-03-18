export class CreatePublicacionDto {
  //*TODO: Agrear decorador para validaciones y para swagger
  autor: string;
  categoria: string;
  contenido: string;
  fechaPublicacion: string;
}
