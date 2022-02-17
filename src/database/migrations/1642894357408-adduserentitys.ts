import {MigrationInterface, QueryRunner} from "typeorm";

export class adduserentitys1642894357408 implements MigrationInterface {
    name = 'adduserentitys1642894357408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "sku" text NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "UQ_34f6ca1cd897cc926bdcca1ca39" UNIQUE ("sku"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_order_detail" ADD CONSTRAINT "FK_d3dc106ebea0664e37d78d730d3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_transaction" ADD CONSTRAINT "FK_448b12087240191aa13de760831" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_transaction" DROP CONSTRAINT "FK_448b12087240191aa13de760831"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835"`);
        await queryRunner.query(`ALTER TABLE "purchase_order_detail" DROP CONSTRAINT "FK_d3dc106ebea0664e37d78d730d3"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
