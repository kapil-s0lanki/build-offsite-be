import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Tenet1718603913525 implements MigrationInterface {
  private table = new Table({
    name: 'tenet', // Name of the table
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()', // PostgreSQL-specific UUID generation
      },
      {
        name: 'company_name',
        type: 'varchar',
      },
      {
        name: 'website',
        type: 'varchar',
      },
      {
        name: 'client_secret',
        type: 'varchar',
        isNullable: true, // Optional field
      },
      {
        name: 'contact_person_name',
        type: 'varchar',
      },
      {
        name: 'contact_no',
        type: 'varchar',
      },
      {
        name: 'subscription_detail',
        type: 'varchar',
        default: "'tier1'", // Default value
      },
      {
        name: 'contact_person_no',
        type: 'varchar',
      },
      {
        name: 'contact_email',
        type: 'varchar',
      },
      {
        name: 'email',
        type: 'varchar',
      },
      {
        name: 'password',
        type: 'varchar',
      },
      {
        name: 'created_by',
        type: 'varchar',
      },
      {
        name: 'updated_by',
        type: 'varchar',
        isNullable: true, // Optional field
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP', // Auto-set current timestamp on create
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP', // Auto-set current timestamp on update
        onUpdate: 'CURRENT_TIMESTAMP', // Automatically update timestamp on row update
        isNullable: true, // Optional field
      },
      {
        name: 'is_deleted',
        type: 'boolean',
        default: false, // Default value
        isNullable: true, // Optional field
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenet');
  }
}
