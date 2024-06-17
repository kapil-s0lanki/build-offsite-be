import { forwardRef, Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/permission/entities/permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  role: string;

  @ApiProperty()
  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @ApiProperty()
  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // One-to-many relationship with the Permission entity
  @OneToMany(() => Permission, (permission) => permission.role)
  @ApiProperty({ type: [Permission] })
  @Inject(forwardRef(() => Permission))
  permissions: Permission[];
}
