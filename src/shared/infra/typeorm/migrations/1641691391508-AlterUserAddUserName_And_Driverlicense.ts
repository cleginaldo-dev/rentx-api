import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddUserNameAndDriverlicense1641691391508
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "username",
        type: "varchar",
        isUnique: true,
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "driver_license",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", ["username", "driver_license"]);
  }
}
