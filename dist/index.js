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
const dotenv_1 = __importDefault(require("dotenv"));
const libs_connection_pool_1 = __importDefault(require("libs-connection-pool"));
const node_cron_1 = __importDefault(require("node-cron"));
const AsyncJobManager_1 = require("./managers/AsyncJobManager");
const SyncJobWithEmitManager_1 = require("./managers/SyncJobWithEmitManager");
const models_1 = require("./models");
const Logger_1 = require("./util/Logger");
const BetOnStatsJob_1 = require("./jobs/BetOnStatsJob");
const BetOnSettingJob_1 = require("./jobs/BetOnSettingJob");
const BetOnHistoryJob_1 = require("./jobs/BetOnHistoryJob");
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, Logger_1.initLogger)("OG-cron");
    const cp = new libs_connection_pool_1.default({
        host: String(process.env.MYSQL_HOST),
        writerHost: String(process.env.MYSQL_HOST),
        readerHost: String(process.env.MYSQL_RO_HOST),
        user: String(process.env.MYSQL_USER),
        password: String(process.env.MYSQL_PASSWORD),
        database: String(process.env.MYSQL_DATABASE),
    });
    const model = (0, models_1.useModel)(cp);
    Logger_1.logger.load("cp connect complete...");
    // const mqInstance = await createJsonTypeInstance({
    //   host: String(process.env.MQ_HOST),
    //   id: String(process.env.MQ_ID),
    //   pw: String(process.env.MQ_PW),
    //   port: parseInt(String(process.env.MQ_PORT)),
    // });
    // mqInstance.setExchange(String(process.env.MQ_EXCHANGE_NOTIFICATION));
    // logger.log("mq connect complete...");
    const syncJobManager = new SyncJobWithEmitManager_1.SyncJobWithEmitManager(() => { }, model);
    const asyncJobManager = new AsyncJobManager_1.AsyncJobManager();
    node_cron_1.default.schedule("* * * * *", () => {
        Logger_1.logger.info('Job Start', (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'));
        asyncJobManager.addJob(new BetOnSettingJob_1.BetOnSettingJob({}, model));
        asyncJobManager.addJob(new BetOnStatsJob_1.BetOnStatsJob({}, model));
        asyncJobManager.addJob(new BetOnHistoryJob_1.BetOnHistoryJob({}, model));
    });
    Logger_1.logger.info("Load Completed BetOn");
}))();
