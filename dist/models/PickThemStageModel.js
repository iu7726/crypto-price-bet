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
class PickThemStageModel extends Model_1.default {
    getWaitPickThemStage(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT
        id as pickThemStageId,
        pickThemId,
        state,
        bettingStartDate,
        bettingEndDate,
        targetDate
      FROM
        PickThemStage
      WHERE
        state = 'wait' AND
        pickThemId = ${pickThemId} AND
        targetDate <= NOW() AND 
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
    updateStageStateWaitToEnd(stageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemStage
      SET state = 'end'
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
    updateStageStateBeforeToGoing(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemStage
      SET state = 'ongoing'
      WHERE
        pickThemId = ${pickThemId} AND
        state = 'before' AND
        bettingStartDate <= NOW() AND
        bettingEndDate >= NOW()
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.changedRows > 0;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return false;
        });
    }
    updateStageStateOngoinToWait(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemStage
      SET state = 'wait'
      WHERE
        pickThemId = ${pickThemId} AND
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
    getOnGoingPickThem(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT
        id as pickThemStageId,
        pickThemId,
        state,
        bettingStartDate,
        bettingEndDate,
        targetDate
      FROM
        PickThemStage
      WHERE
        pickThemId = ${pickThemId} AND
        bettingStartDate <= NOW() AND
        bettingEndDate >= NOW()
      `;
                return yield this.connection.readerQuerySingle(sql);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return undefined;
        });
    }
}
exports.default = PickThemStageModel;
