import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientBindingsTable1737275030788
  implements MigrationInterface
{
  name = 'CreateClientBindingsTable1737275030788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`DROP INDEX "IDX_client_first_name"`);
    await queryRunner.query(`DROP INDEX "IDX_client_last_name"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "is_demo"`);
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "verified_at"`);

    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "email_verified_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "mobile_verified_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "email_verified_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "mobile_verified_at"`,
    );

    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "first_name" VARCHAR(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "last_name" VARCHAR(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "image" VARCHAR(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "is_demo" BOOLEAN`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD COLUMN "verified_at" TIMESTAMP DEFAULT NULL`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_client_first_name" ON "clients" ("first_name")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_client_last_name" ON "clients" ("last_name")`,
    );
  }
}
