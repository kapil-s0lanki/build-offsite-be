import { EntitySchema } from 'typeorm';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from '../entities/role.entity';

export const RoleSchema = new EntitySchema<Role>({
  name: 'Role',
  target: Role,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      default: () => 'uuid_generate_v4()',
    },
    role: {
      type: 'varchar',
      unique: true,
    },
    is_active: {
      type: 'boolean',
      default: true,
    },
    is_deleted: {
      type: 'boolean',
      default: false,
    },
    created_by: {
      type: 'uuid',
    },
    updated_by: {
      type: 'uuid',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'now()',
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      default: () => 'now()',
    },
  },
  relations: {
    permissions: {
      type: 'one-to-many',
      target: Permission,
      inverseSide: 'role',
    },
  },
});
