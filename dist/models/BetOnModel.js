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
class BetOnModel extends Model_1.default {
    getBetOnResultTarget() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT 
        B.id as betOnId,
        B.configId,
        B.userId,
        B.coinId,
        B.type,
        B.standardAt,
        SB.price as standardPrice,
        B.targetAt,
        SA.price as targetPrice
      FROM
        BetOn AS B
      LEFT JOIN OG_COMMUNITY.ChartDataId AS I ON B.coinId = I.id
      LEFT JOIN OG_COMMUNITY.CryptoSnapshot AS SB ON I.symbol = SB.symbol AND SB.date = B.standardAt
      LEFT JOIN OG_COMMUNITY.CryptoSnapshot AS SA ON I.symbol = SA.symbol AND SA.date = B.targetAt
      WHERE
        B.stats = 0 AND 
        B.standardAt < B.targetAt AND
        SA.price IS NOT NULL
      `;
                return yield this.connection.readerQuery(sql);
            }
            catch (e) {
                console.error(e);
            }
            return [];
        });
    }
    updateBetOnStats(betOnId, stats) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE BetOn
      SET stats = ${stats}
      WHERE
          id IN (${betOnId})
      `;
                const result = yield this.connection.writerQuery(sql);
                return result.affectedRows > 0;
            }
            catch (e) {
                console.error(e);
            }
            return false;
        });
    }
    getBetOnSettingTarget() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT
        B.id AS betOnId,
        B.userId,
        B.configId,
        C.betTime,
        C.waitTime,
        B.createdAt
      FROM
        BetOn AS B
      LEFT JOIN BetOnConfig AS C ON B.configId = C.id
      WHERE
        B.standardAt IS NULL AND 
        B.targetAt IS NULL AND
        B.stats = 0
      `;
                return yield this.connection.readerQuery(sql);
            }
            catch (e) {
                console.error(e);
            }
            return [];
        });
    }
    updateBetOnSetting(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      UPDATE BetOn
      SET 
        standardAt = ${dto.standardAt},
        targetAt = ${dto.targetAt}
      WHERE
        id IN (${dto.betOnIds})
      `;
                yield this.connection.writerQuery(sql);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getBeforeSettlement() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = (0, sql_template_strings_1.default) `
      SELECT
        B.userId,
        B.id AS betOnId,
        C.reward
      FROM
        BetOn AS B
      LEFT JOIN BetOnConfig AS C ON C.id = B.configId
      LEFT JOIN BetOnHistory AS H ON H.betOnId = B.id
      WHERE
        B.stats = 2 AND
        H.id IS NULL
      `;
                return yield this.connection.readerQuery(sql);
            }
            catch (e) {
                console.error(e);
            }
            return [];
        });
    }
}
exports.default = BetOnModel;
