import {MigrationInterface, QueryRunner} from "typeorm";

export class anagram1645719881106 implements MigrationInterface {
    name = 'anagram1645719881106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anagram" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "anagram_map" character varying NOT NULL, CONSTRAINT "UQ_3976856edf6fdb3562d7eea0e52" UNIQUE ("user_id"), CONSTRAINT "PK_7924d8c6bd52ede14772c7880a1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "anagram"`);
    }

}
