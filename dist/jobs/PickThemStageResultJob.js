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
exports.PickThemStageResultJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
const moment_1 = __importDefault(require("moment"));
class PickThemStageResultJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model, amq) {
        super(jobRequest);
        this.model = model;
        this.amq = amq;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Pick'em Stage Job Start ", (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'));
                const activePickThem = yield this.model.PickThem.getActivePickThem();
                if (!activePickThem)
                    return this.returnObj(false, "not found active Pick'em");
                Logger_1.logger.info("[Stage Result] Found Active Pick'em: ", activePickThem.pickThemId);
                const activePickThemStage = yield this.model.PickthemStage.getWaitPickThemStage(activePickThem.pickThemId);
                if (!activePickThemStage)
                    return this.returnObj(false, 'not found wating PickThem stage');
                Logger_1.logger.info("[Stage Result] Found Active PickThem Stage ID : ", activePickThemStage);
                const pickThemCoins = yield this.model.PickThemCoin.getPickThemCoin(activePickThem.pickThemId);
                if (!pickThemCoins || pickThemCoins.length == 0)
                    return this.returnObj(false, 'not setting Pick\'em coin');
                Logger_1.logger.info("[Stage Result] Found Pick'em CoinIds : ", pickThemCoins);
                const stageCoins = yield this.model.PickThemStageCoin.getPickThemStageCoin(activePickThemStage.pickThemStageId);
                if (!stageCoins || stageCoins.length == 0)
                    return this.returnObj(false, 'not found Pick\'em stage coins');
                Logger_1.logger.info("[Stage Result] Found Pick'em Stage CoinIds :", stageCoins);
                // not join user streak update
                const updateStreakCount = yield this.model.PickThemEntryUser.updateNotJoinUserStreak(activePickThem.pickThemId, activePickThemStage.pickThemStageId);
                Logger_1.logger.info('[Stage Result] Pick\'em Update User isStreak Result: ', activePickThemStage.pickThemStageId, updateStreakCount);
                for (let i = 0; i < stageCoins.length; i++) {
                    const stageCoin = stageCoins[i];
                    const currency = yield this.model.CryptoSnapshot.getCryptoCurrency(stageCoin.symbol, activePickThemStage.targetDate);
                    if (!currency)
                        return this.returnObj(false, 'not found Crypto Currency');
                    Logger_1.logger.info('[Stage Result] ', stageCoin.symbol, 'Found Crypto Currency', currency);
                    const answer = yield this.model.PickThemStageResult.updatePickThemStageResult(activePickThemStage.pickThemStageId, stageCoin.coinId, currency);
                    if (!answer)
                        return this.returnObj(false, 'not updated stage result: ' + activePickThemStage.pickThemStageId + ' / ' + stageCoin.coinId);
                    Logger_1.logger.info('[Stage Result] Pick\'em Stage Reulst Update Success: ', activePickThemStage.pickThemStageId, stageCoin.coinId, currency, answer);
                    if (answer != 'draw') {
                        const updateStreak = yield this.model.PickThemEntryUser.updateWrongUserStreak(activePickThem.pickThemId, activePickThemStage.pickThemStageId, stageCoin.coinId, answer, activePickThem.goalStreak);
                        Logger_1.logger.info('[Stage Result] Pick\'em Update Wrong User streak count Result: ', activePickThemStage.pickThemStageId, stageCoin.coinId, answer, updateStreak);
                        const updateUser = yield this.model.PickThemEntryUser.updateUserStreakByAnswer(activePickThem.pickThemId, activePickThemStage.pickThemStageId, stageCoin.coinId, answer);
                        Logger_1.logger.info('[Stage Result] Pick\'em Update User Result: ', activePickThemStage.pickThemStageId, stageCoin.coinId, answer, updateUser);
                        const updateIsStreak = yield this.model.PickThemEntryUser.updateUserIsStreak(activePickThem.pickThemId, activePickThem.goalStreak);
                        Logger_1.logger.info('[Stage Result] Pick\'em Update User isStreak Result: ', activePickThemStage.pickThemStageId, stageCoin.coinId, answer, updateIsStreak);
                    }
                    const updateBetting = yield this.model.PickThemStageBetting.updateIsHit(activePickThemStage.pickThemStageId, stageCoin.coinId, answer);
                    Logger_1.logger.info('[Stage Result] Pick\'em Update betting Result: ', updateBetting);
                }
                const stageDone = yield this.model.PickthemStage.updateStageStateWaitToEnd(activePickThemStage.pickThemStageId);
                Logger_1.logger.info('[Stage Result] stage done', activePickThemStage.pickThemStageId, stageDone);
                const entryUsers = yield this.model.PickThemEntryUser.getAllEntryUsers(activePickThem.pickThemId);
                if (entryUsers.length > 0) {
                    const userIds = entryUsers.map(user => user.userId);
                    const notiDate = (0, moment_1.default)(activePickThemStage.bettingStartDate).format('MMM DD');
                    const notification = yield this.model.Notification.createNotification(userIds, notiDate, activePickThemStage.pickThemStageId);
                    Logger_1.logger.info('[Stage Result] result Pick\'em Noti Users: ', notification);
                    if (notification > 0) {
                        entryUsers.map(user => this.createNotiMq(user.userId));
                        Logger_1.logger.info('[Stage Result] mq completed');
                    }
                }
                console.log('[Stage Result] Pick\'em Stage Job End');
                return {
                    success: true,
                    targetDate: (0, moment_1.default)(activePickThemStage.bettingStartDate).format('MMM DD')
                };
            }
            catch (err) {
                Logger_1.logger.log("[Pick\'em Stage Job]", err);
                return {
                    success: false,
                };
            }
        });
    }
    returnObj(success, msg) {
        return {
            success,
            msg: '[Stage Result] ' + msg
        };
    }
    createNotiMq(userId) {
        this.amq.publish(String(process.env.MQ_QUEUE_NOTIFICATION), {
            userId: userId,
            data: {
                code: 1002,
                behaviorData: { link: "/event/whisperer" },
                subject: '{\"EN\":\"${{}} results are in!  👀 Find out if your prediction was right.\"}',
                entities: [],
                contents: null,
            },
            lang: "EN",
        });
    }
}
exports.PickThemStageResultJob = PickThemStageResultJob;
