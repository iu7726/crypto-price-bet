import { Job, JobRequest, JobResult } from "../util/JobManager";
import moment from "moment";
import { ModelManager } from "../models";
import { logger } from "../util/Logger";

export interface BetOnSettingJobRequest extends JobRequest { }

export interface BetOnSettingJobResult extends JobResult {
  msg?: string
}

export class BetOnSettingJob extends Job<BetOnSettingJobRequest, BetOnSettingJobResult> {
  constructor(jobRequest: BetOnSettingJobRequest, private readonly model: ModelManager) {
    super(jobRequest);
  }

  async execute(): Promise<BetOnSettingJobResult> {
    try {
      const targetAry = await this.model.BetOn.getBetOnSettingTarget();

      if (targetAry.length == 0) {
        return {
          success: false,
          msg: '[BetOnSetting] - Target not found'
        }
      }

      logger.info('[BetOnSetting] start')

      targetAry.reduce((acc: UpdateBetOnSetting[], el: BetOnSetting) => {
        const origin = acc[el.configId];

        if (origin) {
          acc[el.configId].betOnIds.push(el.betOnId)
        } else {
          const betAt = new Date(el.createdAt).getTime();
          const midNight = new Date(moment(betAt).format('YYYY-MM-DD 00:00:00')).getTime();
          const duringMinute = (betAt - midNight) / (1000 * 60);
          const targetStage = duringMinute / el.betTime;

          const standardAt = moment(midNight).add(Math.floor(targetStage) * el.betTime, 'minutes');
          console.log(standardAt.format('YYYY-MM-DD HH:mm:ss'), moment(standardAt).add((el.waitTime + el.betTime), 'minutes').format('YYYY-MM-DD HH:mm:ss'));
          acc[el.configId] = {
            configId: el.configId,
            betOnIds: [el.betOnId],
            standardAt: standardAt.format('YYYY-MM-DD HH:mm:ss'),
            targetAt: standardAt.add((el.waitTime + el.betTime), 'minutes').format('YYYY-MM-DD HH:mm:ss'),
          }
        }

        return acc;
      }, [])
        .filter(item => item)
        .map(item => this.model.BetOn.updateBetOnSetting(item))

      logger.info("[BetOnSetting Job] End")

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
