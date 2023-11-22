import { JobManager } from "libs-job-manager";
import { ModelManager } from "src/models";

export class SyncJobWithEmitManager extends JobManager<
  any,
  any,
  any
> {
  constructor(private readonly emit: (jobResult: any) => void, private readonly model: ModelManager) {
    super();
  }

  onResult(jobResult: any): void {
    this.emit(jobResult);
    console.log(jobResult);
    
  }
}
