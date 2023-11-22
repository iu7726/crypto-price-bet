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
exports.PickThemDailyJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
const moment_1 = __importDefault(require("moment"));
class PickThemDailyJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Pick'em Daily Job Start ", (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'));
                const activePickThem = yield this.model.PickThem.getActivePickThem();
                if (!activePickThem)
                    throw new Error('not found active Pick\'em');
                Logger_1.logger.info("Found Active Pick'em: ", activePickThem.pickThemId);
                const waitNowStage = yield this.model.PickthemStage.updateStageStateOngoinToWait(activePickThem.pickThemId);
                // if ( ! waitNowStage) throw new Error('Wait Now Stage Faile');
                Logger_1.logger.info("Wait Now Stage: ", waitNowStage);
                const nextStageSet = yield this.model.PickthemStage.updateStageStateBeforeToGoing(activePickThem.pickThemId);
                if (!nextStageSet)
                    throw new Error('Next Stage Setting Failed');
                Logger_1.logger.info("Next Stage Set: ", nextStageSet);
                const activePickThemStage = yield this.model.PickthemStage.getOnGoingPickThem(activePickThem.pickThemId);
                if (!activePickThemStage)
                    throw new Error('Not Found OnGoint Pick\'em');
                const stageCoins = yield this.model.PickThemStageCoin.getPickThemStageCoin(activePickThemStage.pickThemStageId);
                if (!stageCoins || stageCoins.length == 0)
                    throw new Error('not found Pick\'em stage coins');
                Logger_1.logger.info("Found Pick'em Stage CoinIds :", stageCoins);
                for (let i = 0; i < stageCoins.length; i++) {
                    const stageCoin = stageCoins[i];
                    const currency = yield this.model.CryptoSnapshot.getCryptoCurrency(stageCoin.symbol, activePickThemStage.bettingStartDate);
                    if (!currency)
                        throw new Error('not found Crypto Currency');
                    Logger_1.logger.info(stageCoin.symbol, 'Found Crypto Currency', currency);
                    const insertPickThemResult = yield this.model.PickThemStageResult.createPickThemStageResult(activePickThemStage.pickThemStageId, stageCoin.coinId, currency);
                    Logger_1.logger.info('Pick\'em result insert: ', insertPickThemResult);
                }
                console.log('Pick\'en Daily Job End');
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[Pick'em Daily Job]", err);
                return {
                    success: false,
                };
            }
        });
    }
}
exports.PickThemDailyJob = PickThemDailyJob;
