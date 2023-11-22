import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class BetOnModel extends Model {
  async getBetOnResultTarget(): Promise<BetOnStats[]> {
    try {
      const sql = SQL`
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

      return await this.connection.readerQuery<BetOnStats[]>(sql);
    } catch (e) {
      console.error(e);
    }

    return [];
  }

  async updateBetOnStats(betOnId: number[], stats: number): Promise<boolean> {
    try {
      const sql = SQL`
      UPDATE BetOn
      SET stats = ${stats}
      WHERE
          id IN (${betOnId})
      `;

      const result: OkPacket = await this.connection.writerQuery(sql);

      return result.affectedRows > 0
    } catch (e) {
      console.error(e);
    }

    return false;
  }

  async getBetOnSettingTarget(): Promise<BetOnSetting[]> {
    try {
      const sql = SQL`
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

      return await this.connection.readerQuery(sql);
    } catch (e) {
      console.error(e);
    }

    return [];
  }

  async updateBetOnSetting(dto: UpdateBetOnSetting): Promise<void> {
    try {
      const sql = SQL`
      UPDATE BetOn
      SET 
        standardAt = ${dto.standardAt},
        targetAt = ${dto.targetAt}
      WHERE
        id IN (${dto.betOnIds})
      `;

      await this.connection.writerQuery(sql);
    } catch (e) {
      console.error(e);
    }
  }

  async getBeforeSettlement(): Promise<BeforeSettlement[]> {
    try {
      const sql = SQL`
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

      return await this.connection.readerQuery(sql);
    } catch (e) {
      console.error(e);
    }

    return [];
  }
}