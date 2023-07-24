'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230719091534 extends Migration {
    async up() {
        this.addSql('create table "ingredient" ("id" uuid not null, "amount" varchar(255) not null, "recipe_id" uuid not null, "product_id" uuid not null, constraint "ingredient_pkey" primary key ("id"));');
        this.addSql('alter table "ingredient" add constraint "ingredient_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');
        this.addSql('alter table "ingredient" add constraint "ingredient_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
        this.addSql('alter table "recipe" drop column "ingredients";');
    }
    async down() {
        this.addSql('drop table if exists "ingredient" cascade;');
        this.addSql('alter table "recipe" add column "ingredients" text[] not null;');
    }
}
exports.Migration20230719091534 = Migration20230719091534;
//# sourceMappingURL=Migration20230719091534.js.map