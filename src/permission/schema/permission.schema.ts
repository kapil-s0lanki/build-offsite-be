import { EntitySchema } from 'typeorm';
import { Permission } from '../entities/permission.entity';

export const PermissionSchema = new EntitySchema<Permission>({
  name: 'Permission',
  target: Permission,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      default: () => 'uuid_generate_v4()',
    },
    can_read: {
      type: 'boolean',
      default: true,
    },
    can_add: {
      type: 'boolean',
      default: true,
    },
    can_edit: {
      type: 'boolean',
      default: true,
    },
    can_delete: {
      type: 'boolean',
      default: true,
    },
    is_active: {
      type: 'boolean',
      default: false,
    },
    is_deleted: {
      type: 'boolean',
      default: false,
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
    module: {
      type: 'one-to-one',
      target: 'Module',
      joinColumn: { name: 'module_id' },
      nullable: false,
    },
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: { name: 'role_id' },
      inverseSide: 'permissions',
      nullable: false,
    },
  },
});
