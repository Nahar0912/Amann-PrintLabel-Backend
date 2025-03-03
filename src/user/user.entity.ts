import { Exclude, Transform } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'UserInfo' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Username: string;

  @Column({ type: 'varchar', length: 200 })
  Email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 200 })
  PasswordHash: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  Role: string;

  @CreateDateColumn()
  @Transform(({ value }) => value.toLocaleString())
  Created: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => value.toLocaleString())
  Modified: Date;

  @Column({ type: 'bit', default: true, nullable: true })
  isActive: boolean;
}
