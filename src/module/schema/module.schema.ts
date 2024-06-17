import { Module } from 'src/module/entities/module.entity';
import { EntitySchema } from 'typeorm';

export const ModuleSchema = new EntitySchema<Module>({
  name: 'Module',
  target: Module,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    main_module_id: {
      type: 'uuid',
      nullable: true,
    },
    module: {
      type: String,
      unique: true,
    },
    is_main: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    created_by: {
      type: 'uuid',
      nullable: true,
    },
    updated_by: {
      type: 'uuid',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    main_module: {
      type: 'many-to-one',
      target: 'Module',
      joinColumn: { name: 'main_module_id' },
      nullable: true,
      inverseSide: 'subModules',
    },
  },
});
