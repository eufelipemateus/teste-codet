import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class content1638546087988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'content',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'int',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'file',
            type: 'text',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('content');
  }
}
