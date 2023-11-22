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
exports.MailJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const moment_1 = __importDefault(require("moment"));
const MailService_1 = require("../util/Email/MailService");
const Logger_1 = require("../util/Logger");
class MailJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger_1.logger.info("Mail Job Started", (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"));
                const activePickThem = yield this.model.PickThem.getActivePickThem();
                if (!activePickThem)
                    return this.returnObj(false, 'Not Found Active Pick Them');
                const targets = yield this.model.PickThemStageBetting.getMailTargets(activePickThem.pickThemId);
                // one missing
                const oneMissing = targets.filter(t => t.diff == 1);
                if (oneMissing.length > 0) {
                    yield (0, MailService_1.sendWithoutUnsubscribe)(oneMissing.map(o => o.email), 0);
                }
                // three missing
                const threeMissing = targets.filter(t => t.diff == 3);
                if (threeMissing.length > 0) {
                    yield (0, MailService_1.sendWithoutUnsubscribe)(threeMissing.map(o => o.email), 1);
                }
                // seven missing
                const sevenMissing = targets.filter(t => t.diff == 7);
                if (sevenMissing.length > 0) {
                    yield (0, MailService_1.sendWithoutUnsubscribe)(sevenMissing.map(o => o.email), 2);
                }
                // stage result
                const resultTarget = targets.filter(t => t.diff == 0);
                if (resultTarget.length > 0) {
                    yield (0, MailService_1.sendWithoutUnsubscribe)(resultTarget.map(o => o.email), 3, this.request.targetDate);
                }
                Logger_1.logger.info("email send complete");
                Logger_1.logger.info("result count: ", resultTarget.length);
                Logger_1.logger.info("one missing count: ", oneMissing.length);
                Logger_1.logger.info("three missing count: ", threeMissing.length);
                Logger_1.logger.info("seven missing count: ", sevenMissing.length);
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[Mail Job]", err);
                return {
                    success: false,
                    msg: 'error'
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
exports.MailJob = MailJob;
