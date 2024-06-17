import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTenetDto {
  @ApiProperty()
  @IsString()
  company_name: string;

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  client_secret?: string;

  @ApiProperty()
  @IsString()
  contact_person_name: string;

  @ApiProperty()
  @IsString()
  contact_no: string;

  @IsOptional()
  @IsString()
  subscription_detail?: string;

  @ApiProperty()
  @IsString()
  contact_person_no: string;

  @ApiProperty()
  @IsEmail()
  contact_email: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
