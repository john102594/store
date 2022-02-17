import {MigrationInterface, QueryRunner} from "typeorm";

export class editproducentity1642895125291 implements MigrationInterface {
    name = 'editproducentity1642895125291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name")`);
    }

}
