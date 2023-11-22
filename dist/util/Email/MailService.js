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
exports.sendWithoutUnsubscribe = exports.sendWithUnsubscribe = void 0;
const mail_1 = require("@sendgrid/mail");
const moment_1 = __importDefault(require("moment"));
const MissedOneDay_1 = require("./Messages/MissedOneDay");
const MissedSevenDay_1 = require("./Messages/MissedSevenDay");
const MissedThreeDay_1 = require("./Messages/MissedThreeDay");
const ResultDay_1 = require("./Messages/ResultDay");
class MailService {
    constructor() {
        this.client = new mail_1.MailService();
        this.client.setApiKey(process.env.SENDGRID_API_KEY);
    }
    defaultHeader(email) {
        return {
            personalizations: [
                {
                    to: [
                        {
                            email: 'no-reply@og.xyz'
                        }
                    ],
                    bcc: email
                }
            ],
            from: {
                email: 'cs@og.xyz',
                name: 'OG'
            }
        };
    }
    multipleHeader(emails) {
        return {
            personalizations: [
                {
                    to: [{
                            email: 'no-reply@og.xyz'
                        }],
                    bcc: emails.map((email) => {
                        return {
                            email: email
                        };
                    })
                }
            ],
            from: {
                email: 'cs@og.xyz',
                name: 'OG'
            }
        };
    }
    // default
    sendEmail(to, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.send(Object.assign(Object.assign({}, this.defaultHeader(to)), { subject: subject, content: [content] }));
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    // with reservation. insert past hour => send now. sednAt: UTC
    sendEmailWithReservation(to, subject, content, sendAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.send(Object.assign(Object.assign({}, this.defaultHeader(to)), { subject: subject, content: [content], sendAt }));
                console.log(`🎃 Complete send email : ${to}`);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    sendEmailWithoutUnsubscribe(to, subject, content, sendAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.send(Object.assign(Object.assign({}, this.multipleHeader(to)), { subject: subject, content: [content], sendAt }));
                console.log(`🎃 Complete send email : ${to}`);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}
exports.default = MailService;
const sendWithUnsubscribe = (users, type, targetDate) => __awaiter(void 0, void 0, void 0, function* () {
    const mailType = [
        { title: '[OG] You missed a day 😬 ! It’s okay, you still got ⏰ time!', content: (0, MissedOneDay_1.missedOneDay)() },
        { title: '[OG] The Crypto Whisperer: You missed 3 days in a row, whisperer!', content: (0, MissedThreeDay_1.missedThreeDay)() },
        { title: '[OG] The Crypto Whisperer: You missed 7 days in a row 😭!', content: (0, MissedSevenDay_1.missedSevenDay)() },
        { title: `[OG] The Crypto Whisperer: 🎉 Results from ${targetDate !== null && targetDate !== void 0 ? targetDate : (0, moment_1.default)().add(-2, 'days').format('MMM DD')} are in!`, content: (0, ResultDay_1.resultDay)(targetDate !== null && targetDate !== void 0 ? targetDate : (0, moment_1.default)().add(-2, 'days').format('MMM DD')) }
    ];
    if (mailType.length <= type)
        return false;
    const content = {
        type: 'text/html',
        value: mailType[type].content
    };
    let count = 0;
    let failCount = 0;
    for (let i = 0; i < users.length; i++) {
        const email = users[i];
        console.log(`-------------------------------------------------------------------`);
        console.log(`👺 [Start] send email : ${email}`);
        const mailService = new MailService();
        const result = yield mailService.sendEmailWithReservation(email, mailType[type].title, content, 0);
        if (!result) {
            failCount++;
            console.log(`📧 Fail: ${email}`);
        }
        count++;
        console.log(`📧 [Sent] email count: ${count}`);
    }
    console.log(`Success Count: ${count}`);
    console.log(`Fail Count: ${failCount}`);
});
exports.sendWithUnsubscribe = sendWithUnsubscribe;
const sendWithoutUnsubscribe = (users, type, targetDate) => __awaiter(void 0, void 0, void 0, function* () {
    const mailType = [
        { title: '[OG] You missed a day 😬 ! It’s okay, you still got ⏰ time!', content: (0, MissedOneDay_1.missedOneDay)() },
        { title: '[OG] The Crypto Whisperer: You missed 3 days in a row, whisperer!', content: (0, MissedThreeDay_1.missedThreeDay)() },
        { title: '[OG] The Crypto Whisperer: You missed 7 days in a row 😭!', content: (0, MissedSevenDay_1.missedSevenDay)() },
        { title: `[OG] The Crypto Whisperer: 🎉 Results from ${targetDate !== null && targetDate !== void 0 ? targetDate : (0, moment_1.default)().add(-2, 'days').format('MMM DD')} are in!`, content: (0, ResultDay_1.resultDay)(targetDate !== null && targetDate !== void 0 ? targetDate : (0, moment_1.default)().add(-2, 'days').format('MMM DD')) }
    ];
    if (mailType.length <= type)
        return false;
    // Change html path
    const content = {
        type: 'text/html',
        value: mailType[type].content
    };
    console.log(`-------------------------------------------------------------------`);
    console.log(`👺 [Start] send email user count : ${users.length}`);
    // 2023-03-31 23:00 1680271200
    const userCount = users.length;
    for (let i = 0; i < (userCount / 999); i++) {
        const targetUsers = users.slice((1000 * i), (1000 * i) + 999);
        const mailService = new MailService();
        const result = yield mailService.sendEmailWithoutUnsubscribe(targetUsers, mailType[type].title, content, 0);
        if (!result) {
            console.log(`📧 ${i}: Fail`);
        }
    }
    console.log(`Success`);
});
exports.sendWithoutUnsubscribe = sendWithoutUnsubscribe;
