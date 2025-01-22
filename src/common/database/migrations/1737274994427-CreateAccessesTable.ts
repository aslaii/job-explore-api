import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccessesTable1737274994427 implements MigrationInterface {
  name = 'CreateAccessesTable1737274994427';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "client_accesses" (
                "id" BIGSERIAL PRIMARY KEY,
                "client_id" UUID NOT NULL,
                "device_uuid" character varying(150),
                "device_os" character varying(50),
                "access_token" character varying(1000) NOT NULL,
                "fcm_token" character varying(250),
                "ip_address" character varying(50),
                "last_logged_in" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP,
                CONSTRAINT "client_accesses_client_id_foreign" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "client_accesses"`);
  }
}
