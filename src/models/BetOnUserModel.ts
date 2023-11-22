import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class BetOnUserModel extends Model {
  async updateCrystalByUserId(userId: number[], addCrystal: number): Promise<boolean> {
    try {
      const sql = SQL`
      UPDATE BetOnUser
      SET crystal = crystal + ${addCrystal}, answer = answer + 1
      WHERE
        userId IN (${userId})
      `;

      const result: OkPacket = await this.connection.writerQuery(sql);

      return result.affectedRows > 0;
    } catch (e) {
      console.error(e);
    }

    return false;
  }
}