import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Permission1718606228987 implements MigrationInterface {
  private table = new Table({
    name: 'permission',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: `uuid_generate_v4()`,
      },
      {
        name: 'module_id',
        type: 'uuid',
      },
      {
        name: 'can_read',
        type: 'boolean',
        default: true,
      },
      {
        name: 'can_add',
        type: 'boolean',
        default: true,
      },
      {
        name: 'can_edit',
        type: 'boolean',
        default: true,
      },
      {
        name: 'can_delete',
        type: 'boolean',
        default: true,
      },
      {
        name: 'role_id',
        type: 'uuid',
      },
      {
        name: 'is_active',
        type: 'boolean',
        default: false,
      },
      {
        name: 'is_deleted',
        type: 'boolean',
        default: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  private moduleForeignKey = new TableForeignKey({
    columnNames: ['module_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'module',
    onDelete: 'CASCADE',
  });

  private roleForeignKey = new TableForeignKey({
    columnNames: ['role_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'role',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('permission', this.moduleForeignKey);
    await queryRunner.createForeignKey('permission', this.roleForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('permission', this.moduleForeignKey);
    await queryRunner.dropForeignKey('permission', this.roleForeignKey);
    await queryRunner.dropTable(this.table);
  }
}
