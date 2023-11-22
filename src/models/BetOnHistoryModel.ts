import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class BetOnHistoryModel extends Model {
  async createBetOnHistory(dto: BeforeSettlement[]): Promise<void> {
    try {
      const sql = SQL`
      INSERT INTO BetOnHistory 
        (betOnId, userId, amount) 
      VALUES 

      `;

      dto.map((item, idx) => {
        sql.append(SQL`(${item.betOnId}, ${item.userId}, ${item.reward})`);

        if (idx < dto.length - 1) {
          sql.append(SQL`,`);
        }
      })

      await this.connection.writerQuery(sql);

    } catch (e) {
      console.error(e);
    }
  }
}