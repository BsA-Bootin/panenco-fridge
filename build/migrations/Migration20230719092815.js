'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230719092815 extends Migration {
    async up() {
        this.addSql('alter table "ingredient" drop column "amount";');
    }
    async down() {
        this.addSql('alter table "ingredient" add column "amount" varchar(255) not null;');
    }
}
exports.Migration20230719092815 = Migration20230719092815;
//# sourceMappingURL=Migration20230719092815.js.map