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
exports.BetOnStatsJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
class BetOnStatsJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targetAry = yield this.model.BetOn.getBetOnResultTarget();
                if (targetAry.length == 0) {
                    return {
                        success: false,
                        msg: '[BetOn] Target not found'
                    };
                }
                Logger_1.logger.info('[BetOnStats] start');
                const winner = targetAry
                    .filter(t => t.type == (t.standardPrice < t.targetPrice ? 'UP' : t.standardPrice == t.targetPrice ? 'LOSE' : 'DOWN'))
                    .map(t => t.betOnId);
                const loser = targetAry
                    .map(t => t.betOnId)
                    .filter(obj => !winner.includes(obj));
                if (winner.length > 0) {
                    const winUpdate = yield this.model.BetOn.updateBetOnStats(winner, 2);
                    console.log('winUpdate Result: ', winUpdate);
                }
                if (loser.length > 0) {
                    const loseUpdate = yield this.model.BetOn.updateBetOnStats(loser, 1);
                    console.log('loser Result: ', loseUpdate);
                }
                Logger_1.logger.info("[BetOnStats Job] End");
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[BetOn Job]", err);
                return {
                    success: false,
                    msg: 'Error'
                };
            }
        });
    }
}
exports.BetOnStatsJob = BetOnStatsJob;
