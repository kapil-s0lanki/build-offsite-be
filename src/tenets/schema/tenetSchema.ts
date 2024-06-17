import { EntitySchema } from 'typeorm';
import { Tenet } from '../entities/tenet.entity';

export const TenetSchema = new EntitySchema<Tenet>({
  name: 'Tenet',
  target: Tenet,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    company_name: {
      type: 'varchar',
    },
    website: {
      type: 'varchar',
    },
    client_secret: {
      type: 'varchar',
      nullable: true,
    },
    contact_person_name: {
      type: 'varchar',
    },
    contact_no: {
      type: 'varchar',
    },
    subscription_detail: {
      type: 'varchar',
      default: 'tier1',
    },
    contact_person_no: {
      type: 'varchar',
    },
    contact_email: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    created_by: {
      type: 'varchar',
      nullable: true,
    },
    updated_by: {
      type: 'varchar',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: 'timestamp',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP',
      updateDate: true,
    },
    is_deleted: {
      type: 'boolean',
      nullable: true,
      default: false,
    },
  },
});
