import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePermissionDto } from 'src/permission/dto/create-permission.dto';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @ApiProperty({ type: [CreatePermissionDto] })
  permissions?: CreatePermissionDto[];
}
