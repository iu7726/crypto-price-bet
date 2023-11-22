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
class WhispererStageModel extends Model_1.default {
    getWhispererStage(whispererId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT
        id as whispererStageId,
        whispererId,
        state,
        bettingStartDate,
        bettingEndDate,
        targetDate
      FROM
        WhispererStage
      WHERE
        state = 'wait' AND
        whispererId = ${whispererId} AND
        deletedAt IS NULL
      `;
                return yield this.connection.readerQuerySingle(sql);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return undefined;
        });
    }
    updateStageStateToEnd(stageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE WhispererStage
      SET stae = 'end'
      WHERE
        id = ${stageId};
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows > 0;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return false;
        });
    }
    updateStageStateBeforeToGoing(whispererId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE WhispererStage
      SET state = 'ongoing'
      WHERE
        whispererId = ${whispererId} AND
        state = 'before' AND
        bettingStartDate <= NOW() AND
        bettingEndDate >= NOW()
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows > 0;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return false;
        });
    }
    updateStageStateOngoinToWait(whispererId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE WhispererStage
      SET state = 'wait'
      WHERE
        whispererId = ${whispererId} AND
        state = 'ongoing' AND
        bettingEndDate <= NOW()
      `;
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
exports.default = WhispererStageModel;
