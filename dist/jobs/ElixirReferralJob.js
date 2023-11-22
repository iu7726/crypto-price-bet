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
exports.ElixirReferralJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const Logger_1 = require("../util/Logger");
const moment_1 = __importDefault(require("moment"));
class ElixirReferralJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Logger_1.logger.info('[Elixir Referral Job] start' + (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'));
                const pickThem = yield this.model.PickThem.getActivePickThem();
                if (!pickThem)
                    return this.returnObj(false, '[Elixir Referral Job] Not Found Active PickThem');
                // get elixir
                const elixir = yield this.model.PickThemElixir.getPickThemElixir(pickThem.pickThemId, 'referral');
                if (!elixir)
                    throw new Error('[Elixir Referral Job] Not Found Elixir');
                // referral Elixir
                const userList = yield this.model.UserReferralHistory.getQualifiedUser(pickThem.pickThemId, elixir.pickThemElixirId, (0, moment_1.default)(pickThem.startDate).format('YYYY-MM-DD HH:mm:ss'));
                if (userList.length > 0) {
                    const userIds = userList.map(user => user.userId);
                    const referral = yield this.model.PickThemUserElixir.createUserElixir(userIds, pickThem.pickThemId, elixir.pickThemElixirId);
                    return {
                        success: referral
                    };
                }
                Logger_1.logger.info('[Elixir Referral Job] end');
                return {
                    success: true,
                };
            }
            catch (err) {
                Logger_1.logger.log("[Elixir Referral Job]", err);
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
exports.ElixirReferralJob = ElixirReferralJob;
