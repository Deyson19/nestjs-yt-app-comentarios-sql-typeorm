import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Publicaciones', { schema: 'dbo' })
export class Publicacion {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();
  @Column()
  autor: string;
  @Column()
  categoria: string;
  @Column()
  contenido: string;
  @Column()
  fechaPublicacion: string = new Date().toISOString();
  //TODO: relación hacia comentarios
}
