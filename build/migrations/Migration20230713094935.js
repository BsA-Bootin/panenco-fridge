'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230713094935 extends Migration {
    async up() {
        this.addSql('alter table "product" add column "id" uuid not null;');
        this.addSql('alter table "product" drop constraint "product_pkey";');
        this.addSql('alter table "product" drop column "name";');
        this.addSql('alter table "product" add constraint "product_pkey" primary key ("id");');
    }
    async down() {
        this.addSql('alter table "product" add column "name" varchar(255) not null;');
        this.addSql('alter table "product" drop constraint "product_pkey";');
        this.addSql('alter table "product" drop column "id";');
        this.addSql('alter table "product" add constraint "product_pkey" primary key ("name");');
    }
}
exports.Migration20230713094935 = Migration20230713094935;
//# sourceMappingURL=Migration20230713094935.js.map