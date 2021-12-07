import {MigrationInterface, QueryRunner} from "typeorm";

export class init1638806157716 implements MigrationInterface {
    name = 'init1638806157716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kindidentity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "idx_des_kind" UNIQUE ("name"), CONSTRAINT "PK_9148ef5308241359ff9d1bfcc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "kind_id" integer NOT NULL, "idnumber" integer NOT NULL, "name" character varying NOT NULL, "second_name" character varying, "first_surname" character varying NOT NULL, "second_surname" character varying NOT NULL, "fullname" character varying NOT NULL, "address" character varying NOT NULL, "phone" numeric NOT NULL, "contact" character varying NOT NULL, "provider" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "idx_person" UNIQUE ("phone", "idnumber"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "sku" character varying NOT NULL, "code_bar" character varying, "current_existence" double precision NOT NULL, "reserved_quantity" double precision NOT NULL, "purchase_unit_id" integer NOT NULL, "sale_unit_id" integer NOT NULL, "product_parent_id" integer, "isdererivado" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "movementsId" integer, CONSTRAINT "idx_products_" UNIQUE ("sku", "name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kind_movements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "user_id" integer NOT NULL, "provider" boolean NOT NULL DEFAULT false, "input" boolean NOT NULL DEFAULT false, "output" boolean NOT NULL DEFAULT false, "return" boolean NOT NULL DEFAULT false, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "movementsId" integer, CONSTRAINT "PK_7690167c46ca89b0b5cb1ba6b52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movements" ("id" SERIAL NOT NULL, "kindMovements_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" double precision NOT NULL, "totalPurchasePrice" double precision NOT NULL, "unitPrice" double precision NOT NULL, "header_id" integer NOT NULL, CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "header" ("id" SERIAL NOT NULL, "person_id" integer NOT NULL, "number_order" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_007a885cf40484eb750d0355339" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(3) NOT NULL DEFAULT ('now'::text)::timestamp(3) with time zone, "delete_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "idx_users" UNIQUE ("email", "code"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e" FOREIGN KEY ("kind_id") REFERENCES "kindidentity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b" FOREIGN KEY ("purchase_unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584" FOREIGN KEY ("sale_unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_0681e70e1a9569a4220a4a9b556" FOREIGN KEY ("movementsId") REFERENCES "movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kind_movements" ADD CONSTRAINT "FK_a0ffa863b8be5062238f2dec7fc" FOREIGN KEY ("movementsId") REFERENCES "movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_962b431bce0072f0a24c71751dc" FOREIGN KEY ("kindMovements_id") REFERENCES "kind_movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_994e65eae8b497472663826feb0" FOREIGN KEY ("header_id") REFERENCES "header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "header" ADD CONSTRAINT "FK_a7ec5da323ac67b3f93588f1a3d" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "header" DROP CONSTRAINT "FK_a7ec5da323ac67b3f93588f1a3d"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_994e65eae8b497472663826feb0"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_962b431bce0072f0a24c71751dc"`);
        await queryRunner.query(`ALTER TABLE "kind_movements" DROP CONSTRAINT "FK_a0ffa863b8be5062238f2dec7fc"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0681e70e1a9569a4220a4a9b556"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_0ea8e23207f42911bb85ef0a584"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_774f5a086ca962dfe78c62aa10b"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_0e4c050597bca13d5c70a79ff6e"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "header"`);
        await queryRunner.query(`DROP TABLE "movements"`);
        await queryRunner.query(`DROP TABLE "kind_movements"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "kindidentity"`);
    }

}
