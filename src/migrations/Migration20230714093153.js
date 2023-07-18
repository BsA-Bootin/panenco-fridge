'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230714093153 extends Migration {

  async up() {
    this.addSql('alter table "user" add column "password" varchar(255) not null;');
  }

  async down() {
    this.addSql('alter table "user" drop column "password";');
  }

}
exports.Migration20230714093153 = Migration20230714093153;
