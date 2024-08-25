import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  descricao: string;

  @Column()
  data: Date;
}
