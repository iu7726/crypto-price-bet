"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncJobWithEmitManager = void 0;
const libs_job_manager_1 = require("libs-job-manager");
class SyncJobWithEmitManager extends libs_job_manager_1.JobManager {
    constructor(emit, model) {
        super();
        this.emit = emit;
        this.model = model;
    }
    onResult(jobResult) {
        this.emit(jobResult);
        console.log(jobResult);
    }
}
exports.SyncJobWithEmitManager = SyncJobWithEmitManager;
