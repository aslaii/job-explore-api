import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1737274424119 implements MigrationInterface {
  name = 'CreateClientsTable1737274424119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "clients" (
            "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
            "email" character varying(100) NOT NULL UNIQUE,
            "password" character varying(255),
            "remember_token" character varying(250),
            "first_name" character varying(25) NOT NULL,
            "last_name" character varying(25) NOT NULL,
            "mobile_number" character varying(25),
            "image" character varying(300),
            "type" character varying(25) NOT NULL,
            "is_demo" BOOLEAN,
            "verified_at" TIMESTAMP DEFAULT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP DEFAULT NULL,
            CONSTRAINT "PK_client_id" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_client_first_name" ON "clients" ("first_name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_client_last_name" ON "clients" ("last_name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_client_deleted_at" ON "clients" ("deleted_at") WHERE deleted_at IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_client_first_name"`);
    await queryRunner.query(`DROP INDEX "IDX_client_last_name"`);
    await queryRunner.query(`DROP INDEX "IDX_client_deleted_at"`);
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
