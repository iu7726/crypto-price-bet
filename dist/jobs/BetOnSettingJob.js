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
exports.BetOnSettingJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const moment_1 = __importDefault(require("moment"));
const Logger_1 = require("../util/Logger");
class BetOnSettingJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targetAry = yield this.model.BetOn.getBetOnSettingTarget();
                if (targetAry.length == 0) {
                    return {
                        success: false,
                        msg: '[BetOnSetting] - Target not found'
                    };
                }
                Logger_1.logger.info('[BetOnSetting] start');
                targetAry.reduce((acc, el) => {
                    const origin = acc[el.configId];
                    if (origin) {
                        acc[el.configId].betOnIds.push(el.betOnId);
                    }
                    else {
                        const betAt = new Date(el.createdAt).getTime();
                        const midNight = new Date((0, moment_1.default)(betAt).format('YYYY-MM-DD 00:00:00')).getTime();
                        const duringMinute = (betAt - midNight) / (1000 * 60);
                        const targetStage = duringMinute / el.betTime;
                        const standardAt = (0, moment_1.default)(midNight).add(Math.floor(targetStage) * el.betTime, 'minutes');
                        console.log(standardAt.format('YYYY-MM-DD HH:mm:ss'), (0, moment_1.default)(standardAt).add((el.waitTime + el.betTime), 'minutes').format('YYYY-MM-DD HH:mm:ss'));
                        acc[el.configId] = {
                            configId: el.configId,
                            betOnIds: [el.betOnId],
                            standardAt: standardAt.format('YYYY-MM-DD HH:mm:ss'),
                            targetAt: standardAt.add((el.waitTime + el.betTime), 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                        };
                    }
                    return acc;
                }, [])
                    .filter(item => item)
                    .map(item => this.model.BetOn.updateBetOnSetting(item));
                Logger_1.logger.info("[BetOnSetting Job] End");
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
exports.BetOnSettingJob = BetOnSettingJob;
