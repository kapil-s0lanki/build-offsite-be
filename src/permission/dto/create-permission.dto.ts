import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
  // UUID of the associated Module
  @ApiProperty()
  @IsUUID()
  moduleId: string;

  // UUID of the associated Role
  @ApiProperty()
  @IsUUID()
  roleId: string;

  // Permission flags
  @ApiProperty()
  @IsBoolean()
  can_read: boolean;

  @ApiProperty()
  @IsBoolean()
  can_add: boolean;

  @ApiProperty()
  @IsBoolean()
  can_edit: boolean;

  @ApiProperty()
  @IsBoolean()
  can_delete: boolean;
}
