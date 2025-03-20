import { randomUUID } from 'crypto';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @OneToMany(() => Comentario, (comentario) => comentario.publicacion)
  @JoinColumn()
  comentarios: Comentario[] | null;
}
