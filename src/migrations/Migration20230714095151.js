'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230714095151 extends Migration {

  async up() {
    this.addSql('alter table "user" add column "attempts" int not null default 0;');
    this.addSql('alter table "user" alter column "role" type varchar(255) using ("role"::varchar(255));');
    this.addSql('alter table "user" alter column "role" set default \'user\';');
  }

  async down() {
    this.addSql('alter table "user" alter column "role" drop default;');
    this.addSql('alter table "user" alter column "role" type varchar(255) using ("role"::varchar(255));');
    this.addSql('alter table "user" drop column "attempts";');
  }

}
exports.Migration20230714095151 = Migration20230714095151;
