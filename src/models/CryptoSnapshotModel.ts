import moment from "moment";
import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class CryptoSnapshotModel extends Model {
  async getCryptoCurrency(symbol: string, targetDate: Date): Promise<number | undefined> {
    try {
      const startDate = moment(targetDate).add(-2, 'minutes').format('YYYY-MM-DD HH:mm:ss')
      const endDate = moment(targetDate).add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss')
    
      const sql = SQL`
        SELECT
          CS.symbol,
          CS.price,
          CS.date
        FROM
          OG_COMMUNITY.CryptoSnapshot AS CS
        WHERE
          CS.symbol = ${symbol} AND
          CS.date BETWEEN ${startDate} AND ${endDate}
      `
      const currency = await this.connection.readerQuery<CryptoSnapshot[]>(sql);
      return this.getStandardCryptoCurrency(currency, targetDate);
    } catch (e) {
      logger.error(e);
    }

    return undefined;
  }

  getStandardCryptoCurrency(datas: CryptoSnapshot[], targetDate: Date): number {
    let price = 0;
    try {
      const currency = datas.filter(data => data.date == targetDate)[0];

      if (currency) {
        price = currency.price;
      } else {
        price = datas[Math.floor(datas.length / 2)].price;
      }

    } catch (e) {
      logger.error(e);
    }

    return price;
  }

}