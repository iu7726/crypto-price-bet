"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const Logger_1 = require("../util/Logger");
const Model_1 = __importDefault(require("./classes/Model"));
class PickThemUserElixirModel extends Model_1.default {
    createUserElixir(userIds, pickThemId, pickThemElixirId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      INSERT INTO PickThemUserElixir 
        (userId, pickThemId, pickThemElixirId)
      VALUES
      `;
                userIds.map((userId, idx) => {
                    sql.append((0, sql_template_strings_1.default) `(${userId}, ${pickThemId}, ${pickThemElixirId})`);
                    if (idx < userIds.length - 1) {
                        sql.append((0, sql_template_strings_1.default) `,`);
                    }
                });
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows > 0;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return false;
        });
    }
}
exports.default = PickThemUserElixirModel;
