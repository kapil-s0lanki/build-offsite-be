import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSchema } from 'src/role/schema/role.schema';
import { ModuleSchema } from 'src/module/schema/module.schema';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionSchema } from './schema/permission.schema';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionSchema, RoleSchema, ModuleSchema])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
