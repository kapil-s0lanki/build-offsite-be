import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenet {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  company_name: string; // Fixed typo: "comapny_name" to "company_name"

  @ApiProperty()
  @Column()
  website: string;

  @ApiProperty()
  @Column({ nullable: true })
  client_secret: string;

  @ApiProperty()
  @Column()
  contact_person_name: string;

  @ApiProperty()
  @Column()
  contact_no: string;

  @ApiProperty()
  @Column({ default: 'tier1' })
  subscription_detail: string;

  @ApiProperty()
  @Column()
  contact_person_no: string;

  @ApiProperty()
  @Column()
  contact_email: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string; // Fixed typo: "passowrd" to "password"

  @ApiProperty()
  @Column({ nullable: true })
  created_by: string;

  @ApiProperty()
  @Column({ nullable: true })
  updated_by: string;

  @ApiProperty()
  @CreateDateColumn({ default: Date.now })
  created_at: Date;

  @ApiProperty()
  @CreateDateColumn({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true, default: false })
  is_deleted: boolean;
}
