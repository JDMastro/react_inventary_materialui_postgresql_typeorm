import {MigrationInterface, QueryRunner} from "typeorm";

export class init1637849235853 implements MigrationInterface {
    name = 'init1637849235853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "kind_id" integer NOT NULL, "idnumber" integer NOT NULL, "name" character varying NOT NULL, "second_name" character varying NOT NULL, "first_surname" character varying NOT NULL, "second_surname" character varying NOT NULL, "fullname" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "contact" character varying NOT NULL, "provider" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "idx_person" UNIQUE ("code", "phone", "idnumber"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kindidentity" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "code_admin" character varying, CONSTRAINT "idx_des_kind" UNIQUE ("description"), CONSTRAINT "PK_9148ef5308241359ff9d1bfcc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kind_movements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "user_id" integer NOT NULL, "provider" boolean NOT NULL DEFAULT false, "entry" boolean NOT NULL DEFAULT false, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7690167c46ca89b0b5cb1ba6b52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "sku" character varying NOT NULL, "code_bar" character varying, "current_existence" double precision NOT NULL, "reserved_quantity" double precision NOT NULL, "purchase_unit_id" integer NOT NULL, "sale_unit_id" integer NOT NULL, "product_parent_id" integer, "isdererivado" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "idx_products_" UNIQUE ("sku", "name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e" FOREIGN KEY ("kind_id") REFERENCES "kindidentity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b" FOREIGN KEY ("purchase_unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584" FOREIGN KEY ("sale_unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "kind_movements"`);
        await queryRunner.query(`DROP TABLE "kindidentity"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
