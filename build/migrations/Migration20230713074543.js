'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230713074543 extends Migration {
    async up() {
        this.addSql('alter table "product" drop constraint "product_user_id_foreign";');
        this.addSql('alter table "product" drop column "user_id";');
    }
    async down() {
        this.addSql('alter table "product" add column "user_id" uuid not null;');
        this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    }
}
exports.Migration20230713074543 = Migration20230713074543;
//# sourceMappingURL=Migration20230713074543.js.map