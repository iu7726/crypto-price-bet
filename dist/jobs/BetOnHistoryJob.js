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
exports.BetOnHistoryJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
class BetOnHistoryJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targetUser = yield this.model.BetOn.getBeforeSettlement();
                if (targetUser.length == 0) {
                    return {
                        success: false,
                        msg: '[BetOnHistory] - Target not found'
                    };
                }
                Logger_1.logger.info('[BetOnHistory] start');
                targetUser.reduce((acc, el) => {
                    const origin = acc.filter(a => a.reward === el.reward)[0];
                    if (origin) {
                        acc.map(obj => {
                            if (obj.reward == el.reward) {
                                return {
                                    userIds: obj.userIds.push(el.userId),
                                    reward: obj.reward
                                };
                            }
                            else {
                                return obj;
                            }
                        });
                    }
                    else {
                        acc.push({
                            userIds: [el.userId],
                            reward: el.reward
                        });
                    }
                    return acc;
                }, [])
                    .map(item => this.model.BetOnUser.updateCrystalByUserId(item.userIds, item.reward));
                this.model.BetOnHistory.createBetOnHistory(targetUser);
                Logger_1.logger.info("[BetOnHistory Job] End");
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[BetOnHistory Job]", err);
                return {
                    success: false,
                };
            }
        });
    }
    returnObj(success, msg) {
        return {
            success,
            msg
        };
    }
}
exports.BetOnHistoryJob = BetOnHistoryJob;
