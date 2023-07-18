'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230713073342 extends Migration {

  async up() {
    this.addSql('create table "fridge" ("id" uuid not null, "location" int not null, "capacity" int not null, constraint "fridge_pkey" primary key ("id"));');

    this.addSql('create table "product" ("name" varchar(255) not null, "size" int not null, "user_id" uuid not null, "fridge_id" uuid not null, constraint "product_pkey" primary key ("name"));');

    this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "product" add constraint "product_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade;');

    this.addSql('alter table "user" add column "last_name" varchar(255) not null, add column "first_name" varchar(255) not null;');
    this.addSql('alter table "user" drop column "name";');
    this.addSql('alter table "user" drop column "password";');
    this.addSql('alter table "user" drop column "attempts";');
  }

  async down() {
    this.addSql('alter table "product" drop constraint "product_fridge_id_foreign";');

    this.addSql('drop table if exists "fridge" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('alter table "user" add column "name" varchar(255) not null, add column "password" varchar(255) not null, add column "attempts" int not null;');
    this.addSql('alter table "user" drop column "last_name";');
    this.addSql('alter table "user" drop column "first_name";');
  }

}
exports.Migration20230713073342 = Migration20230713073342;
