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
class CryptoSnapshotModel extends Model_1.default {
    getCryptoCurrency(symbol, targetDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = (0, moment_1.default)(targetDate).add(-2, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                const endDate = (0, moment_1.default)(targetDate).add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss');
                const sql = (0, sql_template_strings_1.default) `
        SELECT
          CS.symbol,
          CS.price,
          CS.date
        FROM
          OG_COMMUNITY.CryptoSnapshot AS CS
        WHERE
          CS.symbol = ${symbol} AND
          CS.date BETWEEN ${startDate} AND ${endDate}
      `;
                const currency = yield this.connection.readerQuery(sql);
                return this.getStandardCryptoCurrency(currency, targetDate);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return undefined;
        });
    }
    getStandardCryptoCurrency(datas, targetDate) {
        let price = 0;
        try {
            const currency = datas.filter(data => data.date == targetDate)[0];
            if (currency) {
                price = currency.price;
            }
            else {
                price = datas[Math.floor(datas.length / 2)].price;
            }
        }
        catch (e) {
            Logger_1.logger.error(e);
        }
        return price;
    }
}
exports.default = CryptoSnapshotModel;
