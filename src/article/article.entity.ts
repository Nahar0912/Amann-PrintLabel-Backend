import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ArticleInfo', schema: 'dbo' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Article_No: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Tex_No: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Length: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Cone_Round_Tex: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  No_of_Cones_inside_the_Carton: string;
}
