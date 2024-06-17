import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from 'src/permission/permission.service';
import { PermissionSchema } from 'src/permission/schema/permission.schema';
import { ModuleSchema } from 'src/module/schema/module.schema';
import { RolesService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSchema } from './schema/role.schema';

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema, PermissionSchema, ModuleSchema])],
  controllers: [RoleController],
  providers: [RolesService, PermissionService],
})
export class RoleModule {}
