"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhispererStageJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
const moment_1 = __importDefault(require("moment"));
class WhispererStageJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Whisperer Stage Job Start ", (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'));
                const activeWhisperer = yield this.model.Whisperer.getActiveWhisperer();
                if (!activeWhisperer)
                    throw new Error('not found active whisperer');
                const whispererCoin = yield this.model.WhispererCoin.getWhispererCoin(activeWhisperer.whispererId);
                if (!whispererCoin || whispererCoin.length == 0)
                    throw new Error('not setting whisperer coin');
                const activeWhispererStage = yield this.model.WhispererStage.getWhispererStage(activeWhisperer.whispererId);
                if (!activeWhispererStage)
                    throw new Error('not found active Whisperer stage');
                console.log('Whisperer Stage Job End');
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[Whisperer Stage Job]", err);
                return {
                    success: false,
                };
            }
        });
    }
}
exports.WhispererStageJob = WhispererStageJob;
