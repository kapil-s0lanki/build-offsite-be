import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Module1718604949077 implements MigrationInterface {
  private table = new Table({
    name: 'module',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      },
      {
        name: 'module',
        type: 'varchar',
      },
      {
        name: 'is_main',
        type: 'boolean',
        default: false,
      },
      {
        name: 'main_module_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'is_active',
        type: 'boolean',
        default: true,
      },
      {
        name: 'is_deleted',
        type: 'boolean',
        default: false,
      },
      {
        name: 'created_by',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'updated_by',
        type: 'uuid',
        isNullable: true,
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

  private mainModuleForeignKey = new TableForeignKey({
    columnNames: ['main_module_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'module',
    onDelete: 'SET NULL',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('module', this.mainModuleForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('module', this.mainModuleForeignKey);
    await queryRunner.dropTable(this.table);
  }
}
