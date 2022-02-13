import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserRemoveColumnAge1641739516447
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "age");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "age",
        type: "numeric",
        isNullable: true,
      })
    );
  }
}
