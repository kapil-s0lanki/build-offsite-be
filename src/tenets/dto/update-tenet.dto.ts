import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTenetDto } from './create-tenet.dto';

export class UpdateTenetDto extends PartialType(CreateTenetDto) {
  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;
}
