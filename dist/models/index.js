"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModel = exports.ModelManager = void 0;
const BetOnConfigModel_1 = __importDefault(require("./BetOnConfigModel"));
const BetOnHistoryModel_1 = __importDefault(require("./BetOnHistoryModel"));
const BetOnModel_1 = __importDefault(require("./BetOnModel"));
const BetOnUserModel_1 = __importDefault(require("./BetOnUserModel"));
const CryptoSnapshotModel_1 = __importDefault(require("./CryptoSnapshotModel"));
const NotificationModel_1 = __importDefault(require("./NotificationModel"));
const PostModel_1 = __importDefault(require("./PostModel"));
class ModelManager {
    constructor(connection) {
        this.CryptoSnapshot = new CryptoSnapshotModel_1.default(connection);
        this.Post = new PostModel_1.default(connection);
        this.Notification = new NotificationModel_1.default(connection);
        this.BetOn = new BetOnModel_1.default(connection);
        this.BetOnConfig = new BetOnConfigModel_1.default(connection);
        this.BetOnUser = new BetOnUserModel_1.default(connection);
        this.BetOnHistory = new BetOnHistoryModel_1.default(connection);
    }
}
exports.ModelManager = ModelManager;
let modelManager;
const useModel = (connection) => {
    if (modelManager == undefined) {
        modelManager = new ModelManager(connection);
    }
    return modelManager;
};
exports.useModel = useModel;
