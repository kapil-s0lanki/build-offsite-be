import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Module } from 'src/module/entities/module.entity';
import { Role } from 'src/role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Permission {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Define one-to-one relationship with the Module entity
  @OneToOne(() => Module, { nullable: false })
  @JoinColumn({ name: 'module_id' })
  @ApiProperty({ type: Module })
  module: Module;

  @ApiProperty()
  @Column({ default: true })
  can_read: boolean;

  @ApiProperty()
  @Column({ default: true })
  can_add: boolean;

  @ApiProperty()
  @Column({ default: true })
  can_edit: boolean;

  @ApiProperty()
  @Column({ default: true })
  can_delete: boolean;

  @ManyToOne(() => Role, (role) => role.permissions, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date; // Automatically managed by TypeORM

  @UpdateDateColumn()
  updated_at: Date; // Automatically managed by TypeORM
}
