import ConnectionPool from "libs-connection-pool";
import BetOnConfigModel from "./BetOnConfigModel";
import BetOnHistoryModel from "./BetOnHistoryModel";
import BetOnModel from "./BetOnModel";
import BetOnUserModel from "./BetOnUserModel";
import CryptoSnapshotModel from "./CryptoSnapshotModel";
import NotificationModel from "./NotificationModel";
import PostModel from "./PostModel";

export class ModelManager {

  CryptoSnapshot: CryptoSnapshotModel
  Post: PostModel

  // notification
  Notification: NotificationModel

  // BetOn
  BetOn: BetOnModel
  BetOnConfig: BetOnConfigModel
  BetOnUser: BetOnUserModel
  BetOnHistory: BetOnHistoryModel

  constructor(connection: ConnectionPool) {
    this.CryptoSnapshot = new CryptoSnapshotModel(connection);
    this.Post = new PostModel(connection);

    this.Notification = new NotificationModel(connection);

    this.BetOn = new BetOnModel(connection);
    this.BetOnConfig = new BetOnConfigModel(connection);
    this.BetOnUser = new BetOnUserModel(connection);
    this.BetOnHistory = new BetOnHistoryModel(connection);
  }
}

let modelManager: ModelManager;

export const useModel = (connection: ConnectionPool) => {
  if (modelManager == undefined) {
    modelManager = new ModelManager(connection);
  }
  return modelManager;
};
