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
class UserReferralHistoryModel extends Model_1.default {
    getQualifiedUser(pickThemId, exlixirId, targetDate) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('referral: ', targetDate);
            try {
                const sql = (0, sql_template_strings_1.default) `        
      SELECT
        T.userId,
        count
      FROM
        (
          SELECT
                U.id AS userId,
                COUNT(U.id) AS count
              FROM
                UserReferralHistory AS URH
              INNER JOIN User AS U ON URH.referralCode = U.referralCode
              WHERE 
                URH.createdAt >= ${targetDate}
              GROUP BY U.id
        ) AS T
      LEFT JOIN PickThemUserElixir AS PTUE ON T.userId = PTUE.userId AND pickThemId = ${pickThemId}
      LEFT JOIN PickThemElixir AS PTE ON PTE.id = PTUE.pickThemElixirId 
      WHERE 
        T.userId NOT IN (
          SELECT
            userId 
          FROM
            PickThemUserElixir AS ST
          WHERE
            ST.pickThemId = ${pickThemId} AND 
            ST.pickThemElixirId = ${exlixirId}
         ) AND
        count > 1
      `;
                return yield this.connection.readerQuery(sql);
            }
            catch (e) {
                Logger_1.logger.error(e);
            }
            return [];
        });
    }
}
exports.default = UserReferralHistoryModel;
