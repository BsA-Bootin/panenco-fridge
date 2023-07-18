'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230717121617 extends Migration {

  async up() {
    this.addSql('create table "recipe" ("id" uuid not null, "user_id" uuid not null, constraint "recipe_pkey" primary key ("id"));');

    this.addSql('alter table "recipe" add constraint "recipe_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down() {
    this.addSql('drop table if exists "recipe" cascade;');
  }

}
exports.Migration20230717121617 = Migration20230717121617;
