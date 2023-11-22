import dotenv from "dotenv";
import ConnectionPool from "./util/ConnectionPool";
import Cron from "node-cron";
import { AsyncJobManager } from "./managers/AsyncJobManager";
import { SyncJobWithEmitManager } from "./managers/SyncJobWithEmitManager";
import { useModel } from "./models";
import { initLogger, logger } from "./util/Logger";
import { BetOnStatsJob } from "./jobs/BetOnStatsJob";
import { BetOnSettingJob } from "./jobs/BetOnSettingJob";
import { BetOnHistoryJob } from "./jobs/BetOnHistoryJob";
import moment from "moment";

dotenv.config();

(async () => {
  initLogger("OG-cron");

  const cp = new ConnectionPool({
    host: String(process.env.MYSQL_HOST),
    writerHost: String(process.env.MYSQL_HOST),
    readerHost: String(process.env.MYSQL_RO_HOST),
    user: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
    database: String(process.env.MYSQL_DATABASE),
  });

  const model = useModel(cp);
  logger.load("cp connect complete...");
  // const mqInstance = await createJsonTypeInstance({
  //   host: String(process.env.MQ_HOST),
  //   id: String(process.env.MQ_ID),
  //   pw: String(process.env.MQ_PW),
  //   port: parseInt(String(process.env.MQ_PORT)),
  // });
  // mqInstance.setExchange(String(process.env.MQ_EXCHANGE_NOTIFICATION));

  // logger.log("mq connect complete...");

  const syncJobManager = new SyncJobWithEmitManager(() => { }, model);

  const asyncJobManager = new AsyncJobManager();


  Cron.schedule("* * * * *", () => {
    logger.info('Job Start', moment().format('YYYY-MM-DD HH:mm:ss'))
    asyncJobManager.addJob(new BetOnSettingJob({}, model));
    asyncJobManager.addJob(new BetOnStatsJob({}, model));
    asyncJobManager.addJob(new BetOnHistoryJob({}, model))
  })

  logger.info("Load Completed BetOn");
})();
