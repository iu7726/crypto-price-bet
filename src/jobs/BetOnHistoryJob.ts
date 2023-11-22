import { Job, JobRequest, JobResult } from "../util/JobManager";
import { ModelManager } from "../models";
import { logger } from "../util/Logger";
import moment from "moment";

export interface BetOnHistoryJobRequest extends JobRequest { }

export interface BetOnHistoryJobResult extends JobResult {
  msg?: string;
}

export class BetOnHistoryJob extends Job<BetOnHistoryJobRequest, BetOnHistoryJobResult> {
  constructor(jobRequest: BetOnHistoryJobRequest, private readonly model: ModelManager) {
    super(jobRequest);
  }

  async execute(): Promise<BetOnHistoryJobResult> {
    try {
      const targetUser = await this.model.BetOn.getBeforeSettlement();

      if (targetUser.length == 0) {
        return {
          success: false,
          msg: '[BetOnHistory] - Target not found'
        }
      }

      logger.info('[BetOnHistory] start')

      targetUser.reduce((acc: UpdateCrystal[], el: BeforeSettlement) => {
        const origin = acc.filter(a => a.reward === el.reward)[0];

        if (origin) {
          acc.map(obj => {
            if (obj.reward == el.reward) {
              return {
                userIds: obj.userIds.push(el.userId),
                reward: obj.reward
              }
            } else {
              return obj
            }
          })
        } else {
          acc.push({
            userIds: [el.userId],
            reward: el.reward
          })
        }

        return acc;
      }, [])
        .map(item => this.model.BetOnUser.updateCrystalByUserId(item.userIds, item.reward))

      this.model.BetOnHistory.createBetOnHistory(targetUser);

      logger.info("[BetOnHistory Job] End")
      return {
        success: true,
      };
    } catch (err) {
      logger.log("[BetOnHistory Job]", err);
      return {
        success: false,
      };
    }
  }

  returnObj(success: boolean, msg: string) {
    return {
      success,
      msg
    }
  }
}
