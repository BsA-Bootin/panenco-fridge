'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230713145938 extends Migration {

  async up() {
    this.addSql('alter table "product" add column "name" varchar(255) not null;');
  }

  async down() {
    this.addSql('alter table "product" drop column "name";');
  }

}
exports.Migration20230713145938 = Migration20230713145938;
