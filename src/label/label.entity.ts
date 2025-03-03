import { Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'LabelInfo', schema: 'dbo' })
export class LabelEntity {
  @PrimaryGeneratedColumn('increment')
  ID: number;

  @Column({ type: 'varchar', length: 400})
  BAR_CODE: string;

  @Column({ type: 'varchar', length: 100})
  ORDER_QUANTITY: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  BATCH_LOT_NO: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  COLOR_CODE: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  ARTICLE_NO: string;

  @Column({ nullable: true })
  @Transform(({ value }) => value ? value.toLocaleString() : null) 
  DATE: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  CARTON_INSIDE_QUANTITY: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  TEX_NO: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  LENGTH: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  CONE_ROUND_TEX: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  NO_OF_STICKER_WITH_FULL_BOX: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  NO_OF_LOOSE_QUANTITY_IN_LAST_STICKER: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  PRINT_QUANTITY_FOR_LOOSE_STICKER: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  PRINT_QUANTITY_FOR_CONE_ROUND_STICKER: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  AMANN_COLOR_CODE: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  COMPETETOR_COLOR_CODE: string;

  @CreateDateColumn()
  @Transform(({ value }) => value ? value.toLocaleString() : null) 
  UPDATED_AT: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => value ? value.toLocaleString() : null) 
  CREATED_AT: Date;
}
