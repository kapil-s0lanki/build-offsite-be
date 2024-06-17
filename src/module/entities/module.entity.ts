import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  module: string;

  @Column({ default: false })
  @ApiProperty()
  is_main: boolean;

  @Column({ type: 'uuid', nullable: true })
  main_module_id: string | null;

  // Self-referencing one-to-one relationship
  @OneToOne(() => Module, { nullable: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'main_module_id' })
  // eslint-disable-next-line no-use-before-define
  main_module: Module | null;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  created_by: string; // UUID of the user who created this module

  @Column({ type: 'uuid', nullable: true })
  updated_by: string; // UUID of the user who last updated this module

  @CreateDateColumn()
  created_at: Date; // Automatically managed by TypeORM

  @UpdateDateColumn()
  updated_at: Date; // Automatically managed by TypeORM
}
