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
exports.WhispererStageResultJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
const moment_1 = __importDefault(require("moment"));
class WhispererStageResultJob extends libs_job_manager_1.Job {
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
                Logger_1.logger.info("Found Active Whisperer: ", activeWhisperer.pickThemId);
                const activeWhispererStage = yield this.model.WhispererStage.getWhispererStage(activeWhisperer.pickThemId);
                if (!activeWhispererStage)
                    throw new Error('not found wating Whisperer stage');
                Logger_1.logger.info("Found Active Whisperer Stage ID : ", activeWhispererStage);
                const whispererCoins = yield this.model.WhispererCoin.getWhispererCoin(activeWhisperer.pickThemId);
                if (!whispererCoins || whispererCoins.length == 0)
                    throw new Error('not setting whisperer coin');
                Logger_1.logger.info("Found Whisperer CoinIds : ", whispererCoins);
                const stageCoins = yield this.model.WhispererStageCoin.getWhispererStageCoin(activeWhispererStage.pickThemStageId);
                if (!stageCoins || stageCoins.length == 0)
                    throw new Error('not found whisperer stage coins');
                Logger_1.logger.info("Found Whisperer Stage CoinIds :", stageCoins);
                for (let i = 0; i < stageCoins.length; i++) {
                    const stageCoin = stageCoins[i];
                    const currency = yield this.model.CryptoSnapshot.getCryptoCurrency(stageCoin.symbol, activeWhispererStage.targetDate);
                    if (!currency)
                        throw new Error('not found Crypto Currency');
                    Logger_1.logger.info(stageCoin.symbol, 'Found Crypto Currency', currency);
                    const answer = yield this.model.WhispererStageResult.updateWhispererStageResult(activeWhispererStage.pickThemStageId, stageCoin.coinId, currency);
                    if (!answer)
                        throw new Error('not updated stage result: ' + activeWhispererStage.pickThemStageId + ' / ' + stageCoin.coinId);
                    Logger_1.logger.info('Whisperer Stage Reulst Update Success: ', activeWhispererStage.pickThemStageId, stageCoin.coinId, currency, answer);
                    const updateUser = yield this.model.WhispererEntryUser.updateUserStreakByAnswer(activeWhispererStage.pickThemStageId, stageCoin.coinId, answer);
                    Logger_1.logger.info('Whisperer Update User Result: ', activeWhispererStage.pickThemStageId, stageCoin.coinId, answer, updateUser);
                }
                const stageDone = yield this.model.WhispererStage.updateStageStateToEnd(activeWhispererStage.pickThemStageId);
                Logger_1.logger.info('stage done', activeWhispererStage.pickThemStageId, stageDone);
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
exports.WhispererStageResultJob = WhispererStageResultJob;
