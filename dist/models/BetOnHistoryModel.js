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
const Model_1 = __importDefault(require("./classes/Model"));
class BetOnHistoryModel extends Model_1.default {
    createBetOnHistory(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      INSERT INTO BetOnHistory 
        (betOnId, userId, amount) 
      VALUES 

      `;
                dto.map((item, idx) => {
                    sql.append((0, sql_template_strings_1.default) `(${item.betOnId}, ${item.userId}, ${item.reward})`);
                    if (idx < dto.length - 1) {
                        sql.append((0, sql_template_strings_1.default) `,`);
                    }
                });
                yield this.connection.writerQuery(sql);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.default = BetOnHistoryModel;
