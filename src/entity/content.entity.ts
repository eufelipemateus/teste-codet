import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contents' })
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
  file_type:string;

  @Column('text')
  public_url: string;
}
