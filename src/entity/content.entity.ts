import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('int')
  year: number;

  @Column('int')
  duration: number;

  @Column('text')
  file: string;

  @Column('text')
  public_url: string;
}
