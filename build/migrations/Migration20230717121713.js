'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230717121713 extends Migration {
    async up() {
        this.addSql('alter table "recipe" add column "name" varchar(255) not null, add column "ingredients" text[] not null;');
    }
    async down() {
        this.addSql('alter table "recipe" drop column "name";');
        this.addSql('alter table "recipe" drop column "ingredients";');
    }
}
exports.Migration20230717121713 = Migration20230717121713;
//# sourceMappingURL=Migration20230717121713.js.map