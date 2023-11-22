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
class WillGoPostingModel extends Model_1.default {
    getPriceCoins(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.readerQuerySingle((0, sql_template_strings_1.default) `SELECT * FROM ChartDataId WHERE symbol = ${symbol}`);
        });
    }
    createPostForEvent(topicId, title, thumbnail, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.writerQuery((0, sql_template_strings_1.default) `
    INSERT INTO 
      	Post (dataType, userId, userName, userProfilePath, topicId, title, thumbnail, contents, isNSFW, pinedAt, deletedAt) 
    VALUES 
      ('normal', 101, 'OG', '6620d1156ac159aa9f6fdfba1ae3585441b5e6fa62fcb68027e1385a1f7d1814.png', ${topicId}, ${title}, ${thumbnail}, ${JSON.stringify(contents)}, 0, NOW(), NOW())`);
        });
    }
    updatePostForEventPrice(title, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.writerQuery((0, sql_template_strings_1.default) `
    UPDATE  
      	Post 
    SET 
      contents = ${JSON.stringify(contents)}, deletedAt = NULL, createdAt = NOW()
    WHERE title = ${title};`);
        });
    }
}
exports.default = WillGoPostingModel;
