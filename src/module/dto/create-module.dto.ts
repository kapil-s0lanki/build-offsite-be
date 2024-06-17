import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the Module' })
  module: string;

  @ApiProperty({
    description: 'Is master table',
    nullable: true,
  })
  is_main?: boolean;

  @ApiProperty({
    description: 'does this module have any master table',
    nullable: true,
  })
  main_module?: string;
}
