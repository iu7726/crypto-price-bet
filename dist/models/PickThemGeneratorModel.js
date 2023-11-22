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
class PickThemGeneratorModel extends Model_1.default {
    createPickThem(name, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      INSERT INTO PickThem
        (name, description, startDate, endDate, maxCrystal, goalStreak)
      VALUES
        (${name}, 'Test Event', ${startDate}, ${endDate}, 999999999, 20)
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.insertId;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return undefined;
        });
    }
    createPickThemStage(startDate, endDate, period, pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hour = period * 3600;
                const insertCount = ((new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000) / hour;
                const sql = (0, sql_template_strings_1.default) `
      INSERT INTO PickThemStage
        (pickThemId, state, bettingStartDate, bettingEndDate, targetDate)
      VALUES
      `;
                for (let i = 0; i < insertCount; i++) {
                    sql.append((0, sql_template_strings_1.default) `
        (
          ${pickThemId}, 
          'before', 
          ${(0, moment_1.default)(startDate).add(i * period, 'hours').format('YYYY-MM-DD HH:mm:ss')},
          ${(0, moment_1.default)(startDate).add((i * period) + (period - 1), 'hours').format('YYYY-MM-DD HH:59:59')},
          ${(0, moment_1.default)(startDate).add((i * period) + (period * 2), 'hours').format('YYYY-MM-DD HH:mm:ss')}
        )
        `);
                    if (i < insertCount - 1) {
                        sql.append((0, sql_template_strings_1.default) `,`);
                    }
                }
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows;
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return 0;
        });
    }
    createPickThemStageCoin(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = (0, sql_template_strings_1.default) `
    SELECT * FROM PickThemStage WHERE pickThemId = ${pickThemId}
    `;
            const stages = yield this.connection.readerQuery(sql);
            for (let i = 0; i < stages.length; i++) {
                const coinSql = (0, sql_template_strings_1.default) `
      SELECT * FROM PickThemCoin WHERE pickThemId = ${pickThemId} ORDER BY RAND() LIMIT 3;
      `;
                const coins = yield this.connection.readerQuery(coinSql);
                const stage = stages[i];
                const insertSql = (0, sql_template_strings_1.default) `
      INSERT INTO PickThemStageCoin 
        (pickThemStageId, coinId)
      VALUES
        (${stage.id}, ${coins[0].coinId}),
        (${stage.id}, ${coins[1].coinId}),
        (${stage.id}, ${coins[2].coinId})
      `;
                yield this.connection.writerQuery(insertSql);
            }
            return true;
        });
    }
    autoBetting() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stateSql = (0, sql_template_strings_1.default) `
      SELECT
        PT.id AS pickThemId,
        PTS.id AS pickThemStageId,
        MAX(PTSC.coinId) AS coinId 
      FROM
        PickThem AS PT
      LEFT JOIN PickThemStage AS PTS ON PT.id = PTS.pickThemId AND PTS.state = 'ongoing'
      LEFT JOIN PickThemStageCoin AS PTSC ON PTS.id = PTSC.pickThemStageId
      WHERE
        PT.startDate <= NOW() AND
        PT.endDate >= NOW();
      `;
                const state = yield this.connection.readerQuerySingle(stateSql);
                const bettingAry = ['up', 'down'];
                const betting = bettingAry[Math.floor(Math.random() * 2)];
                const insertSql = (0, sql_template_strings_1.default) `
      INSERT INTO PickThemStageBetting 
        (pickThemId, pickThemStageId, userId, coinId, bettingType)
      VALUES
        (${state.pickThemId}, ${state.pickThemStageId}, 14, ${state.coinId}, ${betting})
      `;
                yield this.connection.writerQuery(insertSql);
                Logger_1.logger.info("auto betting", state.pickThemStageId, state.coinId, betting);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
        });
    }
    createPickThemCoin(pickThemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const coinSql = (0, sql_template_strings_1.default) `
    SELECT *
    FROM
      OG_COMMUNITY.ChartDataId AS CDI
    WHERE
      CDI.isPrice = 1
    `;
            const coinIds = yield this.connection.readerQuery(coinSql);
            const insertSql = (0, sql_template_strings_1.default) `
    INSERT INTO PickThemCoin
      (pickThemId, coinId)
    VALUES
    `;
            coinIds.map((coinId, idx) => {
                insertSql.append((0, sql_template_strings_1.default) `(${pickThemId}, ${coinId.id})`);
                if (idx < coinIds.length - 1) {
                    insertSql.append((0, sql_template_strings_1.default) `,`);
                }
            });
            const result = yield this.connection.writerQuery(insertSql);
            return result.affectedRows > 0;
        });
    }
}
exports.default = PickThemGeneratorModel;
