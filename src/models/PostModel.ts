import moment from "moment";
import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class PostModel extends Model {

  async getPopularPostUser(pickThemId:number, pickThemElixirId: number, targetDate: string): Promise<Post[]> {
    try {
      const sql = SQL`
      SELECT
        T.userId
      FROM
        (
          SELECT
            userId
          FROM 
            Post
          WHERE
            dataType = 'normal' AND
            selectedAt >= ${targetDate}
          GROUP BY
            userId
        ) AS T
      WHERE
        T.userId NOT IN (
          SELECT
            userId 
          FROM
            PickThemUserElixir AS ST
          WHERE
            ST.pickThemId = ${pickThemId} AND 
            ST.pickThemElixirId = ${pickThemElixirId}
        )
      `;

      return await this.connection.readerQuery(sql);
    } catch (e) {
      logger.error(e)
    }

    return [];
  }

}