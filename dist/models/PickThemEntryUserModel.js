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
class PickThemEntryUserModel extends Model_1.default {
    getAllEntryUsers(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT
        userId
      FROM
        PickThemEntryUser
      WHERE
        pickThemId = ${pickThemId}
      `;
                return yield this.connection.readerQuery(sql);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return [];
        });
    }
    updateNotJoinUserStreak(pickThemId, pickThemStageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemEntryUser AS T
      SET
        T.streak = 0
      WHERE
        id IN (
          SELECT id
          FROM (
            SELECT
              PTEU.id
            FROM
              PickThemEntryUser AS PTEU
            LEFT JOIN
              PickThemStageBetting AS PTSB ON PTEU.userId = PTSB.userId AND PTEU.pickThemId = PTSB.pickThemId AND PTSB.pickThemStageId = ${pickThemStageId}
            LEFT JOIN
              PickThemStage AS PTS ON PTS.id = ${pickThemStageId}
            WHERE
              PTEU.pickThemId = ${pickThemId} AND 
              PTSB.id IS NULL AND 
              PTEU.createdAt < PTS.bettingEndDate
          ) T2
        ) AND
        pickThemId = ${pickThemId}
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return 0;
        });
    }
    updateWrongUserStreak(pickThemId, pickThemStageId, coinId, answer, goalStreak) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemEntryUser AS PTEU
      SET
        PTEU.streak = 0
      WHERE
        PTEU.userId IN (
          SELECT
            userId
          FROM
            PickThemStageBetting AS PTSB
          WHERE
            PTSB.pickThemId = ${pickThemId} AND
            PTSB.pickThemStageId = ${pickThemStageId} AND
            PTSB.bettingType != ${answer} AND
            PTSB.coinId = ${coinId} AND
            PTEU.streak < ${goalStreak}
        ) AND
        pickThemId = ${pickThemId}
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return 0;
        });
    }
    updateUserStreakByAnswer(pickThemId, pickThemStageId, coinId, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemEntryUser AS WEU
      SET 
        WEU.streak = 
        CASE
        	WHEN WEU.isStreak = 0 THEN WEU.streak + 1
        	WHEN WEU.isStreak = 1 THEN WEU.streak
        END,
        WEU.count = WEU.count + 1
      WHERE
        WEU.userId IN (
          SELECT
            userId
          FROM
            PickThemStageBetting AS PTSB
          WHERE
            PTSB.pickThemId = ${pickThemId} AND
            PTSB.pickThemStageId = ${pickThemStageId} AND
            PTSB.bettingType = ${answer} AND
            PTSB.coinId = ${coinId}
        ) AND
        pickThemId = ${pickThemId}
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return 0;
        });
    }
    updateUserIsStreak(pickThemId, goal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE PickThemEntryUser AS PTEU
      SET
        isStreak = 1
      WHERE
        streak = ${goal} AND
        pickThemId = ${pickThemId}
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return 0;
        });
    }
}
exports.default = PickThemEntryUserModel;
