import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1743584386570 implements MigrationInterface {
  name = 'Init1743584386570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_participants_entity" ("id" SERIAL NOT NULL, "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "chat_id" integer, CONSTRAINT "PK_be633b8e4882f2b20c7d72d5fd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_entity" ("created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_group" boolean NOT NULL DEFAULT false, "created_by_id" integer, CONSTRAINT "PK_07e65670b36d025a69930ae6f2e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message_entity" ("created_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_on" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "text" character varying NOT NULL, "author_id" integer, "chat_id" integer, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_participants_entity" ADD CONSTRAINT "FK_4ff8a736b3269d451483ca01091" FOREIGN KEY ("user_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_participants_entity" ADD CONSTRAINT "FK_5bdf5a685349b16004795082948" FOREIGN KEY ("chat_id") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity" ADD CONSTRAINT "FK_93973451d7f8971c653087282b5" FOREIGN KEY ("created_by_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" ADD CONSTRAINT "FK_cb865e968b8373506f193d57f71" FOREIGN KEY ("author_id") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" ADD CONSTRAINT "FK_1b783a70cb56e92226ab19984e4" FOREIGN KEY ("chat_id") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message_entity" DROP CONSTRAINT "FK_1b783a70cb56e92226ab19984e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_entity" DROP CONSTRAINT "FK_cb865e968b8373506f193d57f71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_entity" DROP CONSTRAINT "FK_93973451d7f8971c653087282b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_participants_entity" DROP CONSTRAINT "FK_5bdf5a685349b16004795082948"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_participants_entity" DROP CONSTRAINT "FK_4ff8a736b3269d451483ca01091"`,
    );
    await queryRunner.query(`DROP TABLE "message_entity"`);
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "chat_entity"`);
    await queryRunner.query(`DROP TABLE "chat_participants_entity"`);
  }
}
