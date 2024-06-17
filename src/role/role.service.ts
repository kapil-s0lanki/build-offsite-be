import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionService } from 'src/permission/permission.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleSchema } from './schema/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleSchema) private rolesRepository: Repository<any>,
    private readonly permissionService: PermissionService,
  ) {}

  async create(createdBy: string, createRoleDto: CreateRoleDto) {
    const { permissions, ...info } = createRoleDto;

    const roleData = this.rolesRepository.create({
      ...info,
      created_by: createdBy,
    });

    const role = await this.rolesRepository.save(roleData);

    if (permissions) {
      // Use Promise.all to handle all permission creations concurrently
      await Promise.all(
        permissions.map(async (data) => {
          await this.permissionService.create({
            ...data,
            roleId: role.id,
          });
        }),
      );
    }

    return role;
  }

  findAll() {
    return this.rolesRepository.find({
      relations: ['permissions', 'permissions.module'],
    });
  }

  findOne(id: string) {
    return this.rolesRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepository.update(
      { id },
      {
        is_deleted: updateRoleDto.is_deleted,
      },
    );
  }

  remove(id: string) {
    return this.rolesRepository.update(
      { id },
      {
        is_deleted: true,
      },
    );
  }
}
