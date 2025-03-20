import { randomUUID } from 'crypto';
import { Publicacion } from 'src/publicacion/entities/publicacion.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Comentarios', { schema: 'dbo' })
export class Comentario {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();
  @Column()
  nombrePersona: string;
  @Column()
  texto: string;
  @ManyToOne(() => Publicacion, (publicacion) => publicacion.comentarios, {
    onDelete: 'CASCADE',
  })
  publicacion: Publicacion | null;
  @Column()
  publicacionId: string;
  @Column()
  fechaPublicacion: string = new Date().toISOString();
}
