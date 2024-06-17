import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionSchema } from './schema/permission.schema';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(PermissionSchema) private permissionRepository: Repository<any>) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const { moduleId, roleId, can_read, can_add, can_edit, can_delete } = createPermissionDto;

    // Create a new Permission entity
    const newPermission = this.permissionRepository.create({
      module: {
        id: moduleId,
      },
      role: {
        id: roleId,
      },
      can_read,
      can_add,
      can_edit,
      can_delete,
    });

    // Save the Permission entity to the database
    return this.permissionRepository.save(newPermission);
  }

  findAll() {
    return this.permissionRepository.find({
      where: { is_deleted: false },
      relations: ['module', 'role'],
    });
  }

  findOne(id: string) {
    return this.permissionRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionRepository.update(
      { id },
      {
        is_deleted: updatePermissionDto.is_deleted,
      },
    );
  }

  remove(id: string) {
    return this.permissionRepository.update(
      { id },
      {
        is_deleted: true,
      },
    );
  }
}
