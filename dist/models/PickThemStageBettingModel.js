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
const moment_1 = __importDefault(require("moment"));
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const Logger_1 = require("../util/Logger");
const Model_1 = __importDefault(require("./classes/Model"));
class PickThemStageBettingModel extends Model_1.default {
    getBettingUserByAnswer(pickThemStageId, coinId, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
            SELECT 
                userId
            FROM
                PickThemStageBetting
            WHERE
                pickThemStageId = ${pickThemStageId} AND
                coinId = ${coinId} AND
                bettingType = ${answer};
            `;
                return yield this.connection.readerQuery(sql);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return undefined;
        });
    }
    updateIsHit(pickThemStageId, coinId, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
            UPDATE PickThemStageBetting
            SET isHit = 1
            WHERE
                pickThemStageId = ${pickThemStageId} AND
                coinId = ${coinId} AND
                bettingType = ${answer}
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
    getMailTargets(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
            SELECT
                userId,
                diff,
                email
            FROM
                (
                    SELECT
                        userId,
                        TRUNCATE((UNIX_TIMESTAMP(${(0, moment_1.default)().format('YYYY-MM-DD HH:MM:00')}) - UNIX_TIMESTAMP(MAX(PTSB.createdAt))) / 86400, 0) AS diff,
                        CAST(AES_DECRYPT(FROM_BASE64(email), SHA2(CONCAT(${process.env.DECRYPT_PREFIX}, ${process.env.DECRYPT_SUFFIX}), 256)) AS CHAR) AS email
                    FROM
                        PickThemStageBetting AS PTSB
                    LEFT JOIN 
                        User AS U ON PTSB.userId = U.id
                    WHERE
                        pickThemId = ${pickThemId}
                    GROUP BY userId
                ) AS T
            WHERE
                T.userId IS NOT NULL
            `;
                return yield this.connection.readerQuery(sql);
                ;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return [];
        });
    }
}
exports.default = PickThemStageBettingModel;
