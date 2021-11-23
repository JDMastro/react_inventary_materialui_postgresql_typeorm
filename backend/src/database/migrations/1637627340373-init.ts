import {MigrationInterface, QueryRunner} from "typeorm";

export class init1637627340373 implements MigrationInterface {
    name = 'init1637627340373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "kind_id" integer NOT NULL, "idnumber" integer NOT NULL, "name" character varying NOT NULL, "second_name" character varying NOT NULL, "first_surname" character varying NOT NULL, "second_surname" character varying NOT NULL, "fullname" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "contact" character varying NOT NULL, "vendors" boolean NOT NULL DEFAULT true, "status" boolean NOT NULL DEFAULT true, "iduser" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "idx_person" UNIQUE ("code", "phone", "idnumber"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kindidentity" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "code_admin" character varying, CONSTRAINT "idx_des_kind" UNIQUE ("description"), CONSTRAINT "PK_9148ef5308241359ff9d1bfcc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kind_movements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "iduser" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7690167c46ca89b0b5cb1ba6b52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "sku" character varying NOT NULL, "code" character varying NOT NULL, "code_bar" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "existence" integer NOT NULL, "reservedquantity" integer NOT NULL, "unit_id" integer NOT NULL, "status" boolean NOT NULL DEFAULT true, "iduser" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "idx_code" UNIQUE ("code"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_derivates" ("id" SERIAL NOT NULL, "sku" character varying NOT NULL, "code" character varying NOT NULL, "code_bar" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "existence" integer NOT NULL, "reservedquantity" integer NOT NULL, "unit_id" integer NOT NULL, "status" boolean NOT NULL DEFAULT true, "iduser" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" integer NOT NULL, "quantityunit" integer NOT NULL, CONSTRAINT "idx_code_pro_der" UNIQUE ("code"), CONSTRAINT "PK_159f9513ffa8ce140b3160b854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e" FOREIGN KEY ("kind_id") REFERENCES "kindidentity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0b97249dd9e17bbc604a5ba3d07" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_derivates" ADD CONSTRAINT "FK_336f560d9ebfc0df988d4379956" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_derivates" ADD CONSTRAINT "FK_8edfa4994504f65faf53ddd62d3" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_derivates" DROP CONSTRAINT "FK_8edfa4994504f65faf53ddd62d3"`);
        await queryRunner.query(`ALTER TABLE "products_derivates" DROP CONSTRAINT "FK_336f560d9ebfc0df988d4379956"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0b97249dd9e17bbc604a5ba3d07"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e"`);
        await queryRunner.query(`DROP TABLE "products_derivates"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "kind_movements"`);
        await queryRunner.query(`DROP TABLE "kindidentity"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
