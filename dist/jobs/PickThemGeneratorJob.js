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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickThemGeneratorJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
class PickThemGeneratorJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model, amq) {
        super(jobRequest);
        this.model = model;
        this.amq = amq;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = 'OG Pick\'em Whisperer';
                const startDate = '2023-04-03 00:00:00';
                const endDate = '2023-05-02 23:59:59';
                const period = 24; // time -> min 1 hours
                this.amq.publish(String(process.env.MQ_QUEUE_MAIL_PICKTHEM), {
                    pickThemId: 1,
                    pickThemStageId: 1
                });
                console.log('end');
                // logger.info(`[Generating Pick\'em] name: ${name} startDate: ${startDate} endDate: ${endDate} period: ${period} H`);
                // const createPickThemId = await this.model.PickThemGenerator.createPickThem(name, startDate, endDate);
                // if ( ! createPickThemId) throw new Error('Create PickThem Failed');
                // logger.info(`[Generating Pick\'em] created Pick'em : ${createPickThemId}`)
                // const pickThemCoins = await this.model.PickThemGenerator.createPickThemCoin(createPickThemId);
                // logger.info(`[Generating Pick\'em] created Pick'em Coins: ${pickThemCoins}`)
                // const createStage = await this.model.PickThemGenerator.createPickThemStage(startDate, endDate, period, createPickThemId)
                // logger.info(`[Generating Pick\'em] created Stage : ${createStage}`)
                // const createStageCoin = await this.model.PickThemGenerator.createPickThemStageCoin(createPickThemId);
                // logger.info(`[Generating Pick\'em] created StageCoin : ${createStageCoin}`)
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[Pick'em Generator Job]", err);
                return {
                    success: false,
                };
            }
        });
    }
}
exports.PickThemGeneratorJob = PickThemGeneratorJob;
