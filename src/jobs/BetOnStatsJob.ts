import { Job, JobRequest, JobResult } from "../util/JobManager";
import moment from "moment";
import { ModelManager } from "../models";
import { logger } from "../util/Logger";

export interface BetOnStatsJobRequest extends JobRequest { }

export interface BetOnStatsJobResult extends JobResult {
  msg?: string
}

export class BetOnStatsJob extends Job<BetOnStatsJobRequest, BetOnStatsJobResult> {
  constructor(jobRequest: BetOnStatsJobRequest, private readonly model: ModelManager) {
    super(jobRequest);
  }

  async execute(): Promise<BetOnStatsJobResult> {
    try {
      const targetAry = await this.model.BetOn.getBetOnResultTarget();

      if (targetAry.length == 0) {
        return {
          success: false,
          msg: '[BetOn] Target not found'
        }
      }

      logger.info('[BetOnStats] start')

      const winner = targetAry
        .filter(t => t.type == (t.standardPrice < t.targetPrice ? 'UP' : t.standardPrice == t.targetPrice ? 'LOSE' : 'DOWN'))
        .map(t => t.betOnId);

      const loser = targetAry
        .map(t => t.betOnId)
        .filter(obj => !winner.includes(obj));

      if (winner.length > 0) {
        const winUpdate = await this.model.BetOn.updateBetOnStats(winner, 2);
        console.log('winUpdate Result: ', winUpdate);
      }

      if (loser.length > 0) {
        const loseUpdate = await this.model.BetOn.updateBetOnStats(loser, 1);
        console.log('loser Result: ', loseUpdate);
      }

      logger.info("[BetOnStats Job] End")
      return {
        success: true,
      };
    } catch (err) {
      logger.log("[BetOn Job]", err);
      return {
        success: false,
        msg: 'Error'
      };
    }
  }
}
