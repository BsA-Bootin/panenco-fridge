'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230712140423 extends Migration {
    async up() {
        this.addSql('create table "user" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "attempts" int not null, constraint "user_pkey" primary key ("id"));');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20230712140423 = Migration20230712140423;
//# sourceMappingURL=Migration20230712140423.js.map