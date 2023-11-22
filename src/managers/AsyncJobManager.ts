import { JobManager, Mode } from "libs-job-manager";
import { BetOnHistoryJob, BetOnHistoryJobRequest, BetOnHistoryJobResult } from "src/jobs/BetOnHistoryJob";
import { BetOnSettingJob, BetOnSettingJobRequest, BetOnSettingJobResult } from "src/jobs/BetOnSettingJob";
import { BetOnStatsJob, BetOnStatsJobRequest, BetOnStatsJobResult } from "src/jobs/BetOnStatsJob";

export class AsyncJobManager extends JobManager<
  BetOnStatsJobRequest | BetOnSettingJobRequest | BetOnHistoryJobRequest,
  BetOnStatsJobResult | BetOnSettingJobResult | BetOnHistoryJobResult,
  BetOnStatsJob | BetOnSettingJob | BetOnHistoryJob
> {
  constructor() {
    super();
    this.setMode(Mode.Async);
  }

  onResult(jobResult: any): void {
    if ( ! jobResult.success) {
      console.log(jobResult.msg);
    }

    if (!jobResult) {
      
    }
  }
}
