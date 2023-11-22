export interface JobRequest {

}

export interface JobResult {
    success: boolean
}

export abstract class Job<Q extends JobRequest, R extends JobResult> {
    public readonly request: Q;
    constructor(request: Q) {
        this.request = request;
    }
    abstract execute(): Promise<R>
}

export enum Mode {
    Sync,
    Async
}

export abstract class JobManager<Q extends JobRequest, R extends JobResult, J extends Job<Q, R>> {
    private jobList: Array<J> = new Array<J>();
    private isRunning: boolean = false;
    private mode: Mode = Mode.Sync;

    getJob(index: number): Job<Q, R> {
        return this.jobList[index]
    }

    getJobSize(): number {
        return this.jobList.length + (this.isRunning ? 1 : 0)
    }

    setMode(mode: Mode): JobManager<Q, R, J> {
        this.mode = mode;
        return this;
    }

    addJob(job: J) {
        if (this.mode == Mode.Sync) {
            this.jobList.push(job);
            if (this.isRunning === false) {
                this.immediateExecute();
            }
        } else {
            job.execute().then(jobResult => {
                this.onResult(jobResult);
            })
        }
    }

    async immediateExecute() {
        const job: J | undefined = this.jobList.shift();
        if (job) {
            this.isRunning = true;
            const jobResult: R = await job.execute()
            this.onResult(jobResult, job.request);
            this.immediateExecute()
        } else {
            this.isRunning = false;
        }
    }

    abstract onResult(jobResult: R, jobRequest?: Q): void

}
