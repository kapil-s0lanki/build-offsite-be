import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Role1718606177287 implements MigrationInterface {
  private table = new Table({
    name: 'role',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: `uuid_generate_v4()`,
      },
      {
        name: 'role',
        type: 'varchar',
        isUnique: true,
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
