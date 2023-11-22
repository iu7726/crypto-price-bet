import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class BetOnConfigModel extends Model {
  async getActiveBetOnConfig(): Promise<BetOnConfig | undefined> {
    try {
        const sql = SQL`
        SELECT
            id,
            betTime,
            waitTime,
            reward
        FROM
            BetOnConfig
        WHERE
            deletedAt IS NULL
        `;


        return await this.connection.readerQuerySingle<BetOnConfig>(sql);
    } catch (e) {
        console.error(e);
    }

    return undefined;
  }

}