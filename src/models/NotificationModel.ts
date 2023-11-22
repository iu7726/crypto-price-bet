import { OkPacket } from "mysql2";
import SQL from "sql-template-strings";
import { logger } from "../util/Logger";
import Model from "./classes/Model";

export default class NotificationModel extends Model {
  async createNotification(userIds: number[], startDate: string, pickThemStageId: number): Promise<number> {
    try {
      const sql = SQL`
      INSERT INTO Notification 

      (code, notificationCode, behaviorData, userId, subject, entities, contents )
      
      VALUES 
      `;

      userIds.map((userId: number, idx: number) => {
        const subject = {EN:'${{}} results are in!  👀 Find out if your prediction was right.'};
        sql.append(SQL`(
            1002, 
            ${`1002:${userId}:${pickThemStageId}`}, 
            '{\"link\":\"/event/whisperer\"}', 
            ${userId}, 
            ${JSON.stringify(subject)}, 
            ${JSON.stringify([`${startDate}`])}, 
            null
          )`)
        if (idx < userIds.length - 1) {
          sql.append(SQL`,`);
        }
      })

      const result: OkPacket = await this.connection.writerQuery(sql);

      return result.affectedRows;
    } catch (e) {
      logger.error(e);
    }

    return 0;
  }

}