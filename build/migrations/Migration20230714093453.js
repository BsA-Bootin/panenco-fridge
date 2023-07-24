'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');
class Migration20230714093453 extends Migration {
    async up() {
        this.addSql('alter table "user" add column "role" varchar(255) not null;');
    }
    async down() {
        this.addSql('alter table "user" drop column "role";');
    }
}
exports.Migration20230714093453 = Migration20230714093453;
//# sourceMappingURL=Migration20230714093453.js.map