import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddAge1641738736059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "age",
        type: "numeric",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "age");
  }
}
