'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230719102214 extends Migration {
    async up() {
        this.addSql('create table "fridge_product" ("id" uuid not null, "product_id" uuid not null, "fridge_id" uuid not null, "user_id" uuid not null, constraint "fridge_product_pkey" primary key ("id"));');
        this.addSql('alter table "fridge_product" add constraint "fridge_product_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
        this.addSql('alter table "fridge_product" add constraint "fridge_product_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade;');
        this.addSql('alter table "fridge_product" add constraint "fridge_product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
        this.addSql('alter table "product" drop constraint "product_user_id_foreign";');
        this.addSql('alter table "product" drop constraint "product_fridge_id_foreign";');
        this.addSql('alter table "product" drop column "user_id";');
        this.addSql('alter table "product" drop column "fridge_id";');
        this.addSql('alter table "ingredient" add column "amount" varchar(255) not null;');
    }
    async down() {
        this.addSql('drop table if exists "fridge_product" cascade;');
        this.addSql('alter table "product" add column "user_id" uuid not null, add column "fridge_id" uuid not null;');
        this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
        this.addSql('alter table "product" add constraint "product_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade;');
        this.addSql('alter table "ingredient" drop column "amount";');
    }
}
exports.Migration20230719102214 = Migration20230719102214;
//# sourceMappingURL=Migration20230719102214.js.map