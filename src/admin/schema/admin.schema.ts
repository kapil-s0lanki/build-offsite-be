import { EntitySchema } from 'typeorm';
import { Admin } from '../entities/admin.entity';

export const AdminSchema = new EntitySchema<Admin>({
  name: 'Admin',
  target: Admin,
  columns: {
    id: {
      type: String,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    password_salt: {
      type: String,
    },
    refresh_token_hash: {
      type: String,
    },
    created_at: {
      type: Boolean,
      default: true,
    },
    updated_at: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: true,
    },
  },
});
