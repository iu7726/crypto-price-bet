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
exports.WillGoPostingJob = void 0;
const libs_job_manager_1 = require("libs-job-manager");
const moment_1 = __importDefault(require("moment"));
const imagePaths = [
    { key: "Apr-10-ADA", path: "7885cbb65edcf014a5799b80ea279883caa81c0dc436d96237e7b404e4700765.jpg" },
    { key: "Apr-10-AVAX", path: "6dc999e297e1333d6b979be2ef879b3ebe0ef22171cec76919d7ff91589fed11.jpg" },
    { key: "Apr-10-ETH", path: "6a62350da826f8509881f48255af85f5c3611afa3ad048c68ac152d147bfdf2b.jpg" },
    { key: "Apr-11-BNB", path: "68642fd35579588c9e673c890051504045d3cf49e79301d8ff4567e3b0556ab5.jpg" },
    { key: "Apr-11-BTC", path: "3c03c99c9495706e67d14c665ea2dd7a4abfaece53ff9633558d7ea0bd5bb79c.jpg" },
    { key: "Apr-11-ETH", path: "5bf51a0544d12f947ae31e1f7452844a4bca03d884e13ba25a826638a009a972.jpg" },
    { key: "Apr-12-ADA", path: "f2a2de7ca88ad7197d04c8658388c5204ca97fcc08ebd844c2594be61fce3abf.jpg" },
    { key: "Apr-12-BTC", path: "844b09a1e612dac14efda9b3595dad2e02e8766e459602d9840266137521d23b.jpg" },
    { key: "Apr-12-ETH", path: "e2cac0753eab4ddec7f328a3e970c8fe67f9ed9fada52469e660823f22faf395.jpg" },
    { key: "Apr-13-AVAX", path: "23cf8f28de574eeec152f850155bfdfcbe9d257a3eaa67759e0e42b06995fcde.jpg" },
    { key: "Apr-13-DOGE", path: "bd4307169983888745711485f61b816bf7ac5fcda2597eb1f69825fdd15412e2.jpg" },
    { key: "Apr-13-DOT", path: "59f08411fccf95d4788417a275e21f60ec1fec3025aadf1e7235d9b5c8f37db1.jpg" },
    { key: "Apr-14-BTC", path: "c3bc9a2f867a5b270a15d9ab42d312398d7bf2cc5233cef163ec4d93ac08ffab.jpg" },
    { key: "Apr-14-DOGE", path: "7b69b75bc93496c0f611ca90948b539ebf766a087b0f20cd826f3351c831e3e4.jpg" },
    { key: "Apr-14-XRP", path: "2ccae2e6b24097c8c563512e19e48bc7438029bfc5e0e3b2841ae3027d05b226.jpg" },
    { key: "Apr-15-APT", path: "3f63860806efe13bd73eed5ac048348ba9fec108e4a31d6f40158feda8ee8d3f.jpg" },
    { key: "Apr-15-BTC", path: "928c73bdac6793e53f2fa3f53b5f0f70158e6d15321d69e334454beb9b3311ec.jpg" },
    { key: "Apr-15-XRP", path: "6c00675ca12a69305a20895815ea2558e27ed5b47acdea429407de6cbf14d288.jpg" },
    { key: "Apr-16-ADA", path: "b0fd80e3c2455777a178cc9c056849cc36a3d65b0163d380d25ae36e63a74d34.jpg" },
    { key: "Apr-16-BNB", path: "2831dc7633a88b654053d0d78f50c4acbe41086226bc5b965b550e7972cc4f45.jpg" },
    { key: "Apr-16-MATIC", path: "e05046247c12b978d404a3a6501bfb55872cdf716f883c163882de776f375f7b.jpg" },
    { key: "Apr-17-BTC", path: "be4d434befdfe019084877f4fb6799eb69a295857bb5c9f5b8fe62c5d6856958.jpg" },
    { key: "Apr-17-MATIC", path: "a509037f471cce5e92f6590e9b3e7cd9ee31753100bffada80d7e82dc5e94b00.jpg" },
    { key: "Apr-17-XRP", path: "cfe3bd1737006cecf9cfa1193d9571bfe9a7cec88ceeae3525eed1b8b5602260.jpg" },
    { key: "Apr-18-ADA", path: "a377f8eec3858ed0d45a12b15e64c7b9d185b0b6138e581d4a7b7dc01cbb46cb.jpg" },
    { key: "Apr-18-BNB", path: "b4bed52209bc9efb996fb19627f53bbc7bf934e47fd454ba6514d8781cc7ae42.jpg" },
    { key: "Apr-18-SOL", path: "11b6fb6fc6b5e4fb3aac4ebf824f46a5a0ce77b0a7c88d8f989f1b9c540fee62.jpg" },
    { key: "Apr-19-ADA", path: "e2f12a415dfe03458e337b09d0f03ec39c605486a9361e149a6be3d64966d958.jpg" },
    { key: "Apr-19-BTC", path: "e87c7f3276ff4961117be7a808147aa10fa5d2fad0b8029ad18e02a8aa96aa24.jpg" },
    { key: "Apr-19-MATIC", path: "ff407d12d7aa8c3b012286169c83a9cb635dde34cad00b62b6c3fc4bfe1a16a7.jpg" },
    { key: "Apr-20-AVAX", path: "acb4f6cdbba9039a177d2d9dd458acd74b13eeac54939fbdab25d15687176a07.jpg" },
    { key: "Apr-20-DOT", path: "66e4a11c30cb1130774702344b594716a7e0c2ffe9875d0433b06228649a5110.jpg" },
    { key: "Apr-20-ETH", path: "fcd3ae4c0faf9ae8741a35ad059fca38faf64a1fdfafd9b2b18b9908acc9296f.jpg" },
    { key: "Apr-21-ADA", path: "bbccaba2fcbc5db25aff21f92d402751e624c3f3a5413ff76c23f616f477542b.jpg" },
    { key: "Apr-21-BNB", path: "9f968da69be755f5e2413ec07cf3b1918efb98b7c8890eec3fc4001c7a5852a0.jpg" },
    { key: "Apr-21-MATIC", path: "17445af4d00a0ce4b494b7e0c73f4832368a008103d43ad7ee15e63110b1a75f.jpg" },
    { key: "Apr-22-ADA", path: "3c609ba465f4227d9db07697ab37c7dad35e36273377fb4a6aa060ec31b071ae.jpg" },
    { key: "Apr-22-DOT", path: "c153f94283e44ce315022aad5f2b71c006a7351a84b6218dc1771ad6d779c8a4.jpg" },
    { key: "Apr-22-XRP", path: "3444dade0cd54ee1c0e0c42fad236aee3cf9c8b74df65b5d5396d21c551abdaa.jpg" },
    { key: "Apr-23-ADA", path: "28c92003dab50af10fd9519e5f7f562a5e7c31a3c42e0fd74f690fc63b67eca8.jpg" },
    { key: "Apr-23-BNB", path: "004bbc29803a4f59c9e979a0d2c28eca14ce8875ca3b81f3edaaafceb491fe71.jpg" },
    { key: "Apr-23-XRP", path: "0f68d664e28fac9c185690ef00faf3262c291169cc16756da75f02a4bfc2fbe0.jpg" },
    { key: "Apr-24-APT", path: "4ebd4bc28b128245cfa8b81dd0dfcaa7e3ccde7a72efbc49c76d7cc99871ef2b.jpg" },
    { key: "Apr-24-ETH", path: "852809333518660ef0abce65e92615d37aa9ae7f7dde47b368e8789ada4fb2ce.jpg" },
    { key: "Apr-24-XRP", path: "00bb5c327cb1b9929d6b5b61d129254f10b279433e7245fdd862f0f394f0fbf5.jpg" },
    { key: "Apr-25-APT", path: "26472608f6ba879f5e876af6ee29e1c9d4238a8ae32cfca7f65a15088538c327.jpg" },
    { key: "Apr-25-DOGE", path: "796c08f171a8dbc05165afaae34c79d37bd9df9299d8d89a50b8a446cda7916a.jpg" },
    { key: "Apr-25-XRP", path: "d4fff3be1a6f4f930235a2a6252c5285b387fd47f601f088a7e3bd36180cf8b7.jpg" },
    { key: "Apr-26-BTC", path: "43e5fb5a95bbee8358e48bd6d92e940c4c2f604bd795840a275a297f86daa824.jpg" },
    { key: "Apr-26-ETH", path: "5c3d56049f4c91fe2ca2e2ef7488e7c4898fff830bf9c63219f80f43a10ff2dc.jpg" },
    { key: "Apr-26-XRP", path: "b07fa139269ac2590dd61f445b26b224a09c9b0002e32146b9788111cbf4f033.jpg" },
    { key: "Apr-27-AVAX", path: "69a6ac234be4c2de4bef6281e01f1ef218657a27eb1328eb84879deb34bf5360.jpg" },
    { key: "Apr-27-ETH", path: "188d59a1fcc96f43385abdd545d6993cc7af52bd94212f74016ac031adc3ffea.jpg" },
    { key: "Apr-27-MATIC", path: "786db20b349d7ea8bcac0eba961f84d37607113891581190140c219454cd33e7.jpg" },
    { key: "Apr-28-APT", path: "5c3200f05bf051399156981578482243d37f1820f0a56c4768520cfd9a4afe19.jpg" },
    { key: "Apr-28-AVAX", path: "8e022e894c8c7ed95f0217dc4542729a3c0afa359b153d0daa7b3f984e8b0613.jpg" },
    { key: "Apr-28-BNB", path: "c95dd005678369c0995f007e1cbb088840cbd38a262f73435c3a89d79e9f6c86.jpg" },
    { key: "Apr-29-ADA", path: "1159ab59db007ece40e659d16ce6e64665ef51d4297cf6d60788981a1bca75de.jpg" },
    { key: "Apr-29-BTC", path: "39c3a987e4ffcfe78a38f3aaedad4ed73d339687bcfeff47d4b3d912609eb620.jpg" },
    { key: "Apr-29-XRP", path: "c45dd0ac744e0202e6300b6ed598c9b25f6ea6c3a3cb9b55340345bb79869edc.jpg" },
    { key: "Apr-3-DOGE", path: "7c7d7437e8d2f220fa410f662fcc01ab000a437026fc57256c9e18322bd4e8ed.jpg" },
    { key: "Apr-3-DOT", path: "e785bc02713fd2e5325e822ca83b9e3f6bbc78dc54506e23ec44d0cab74ecc06.jpg" },
    { key: "Apr-3-ETH", path: "22a038ab9cf516983ef6efb32b2b2879c9efeb2a21b076e043ae4916948e86c6.jpg" },
    { key: "Apr-30-AVAX", path: "037c66b5bd0c94a03d3a785e2f695315e46d84b222b36dd6721029a4d3810bc7.jpg" },
    { key: "Apr-30-SOL", path: "9e7df6c14c63f46e3920373852bed57b4c1dc58b39eb59da0813f3fdb999f3fb.jpg" },
    { key: "Apr-30-XRP", path: "56a0936f0d56c06b51f5127bc2917a0a55b8b2c8a5afe1c03d688aa8094b96eb.jpg" },
    { key: "Apr-4-ADA", path: "eaa11dc6013eb73705be6ccfd417e6fb0bd50ded8ac0a1cbccd6315e2be71296.jpg" },
    { key: "Apr-4-DOGE", path: "47850bce63d024053abf5e7a74d9729ec49bbac918249d57f928db0778b1e8fe.jpg" },
    { key: "Apr-4-DOT", path: "f1592049c3d4b3d85c47e2114c17bd32276b6d252cd00cb36ae22147fe952f62.jpg" },
    { key: "Apr-5-AVAX", path: "b1c203c8d3f0ea4ef7899fc68395c077d391c1d17af5c72dd9ea0df1bc0ca1a8.jpg" },
    { key: "Apr-5-ETH", path: "d873b0b3295bece309c9dd9e7140be8c9c35f93de1b3822ac6b17a0d3b965991.jpg" },
    { key: "Apr-5-SOL", path: "b262ca382efe932b9a1b272ec29010086b83056e70503f03a17f6ee78200db01.jpg" },
    { key: "Apr-6-AVAX", path: "c76d13918298c187f0e6524df587448cf0a2c02c24631e0b6b28c86a4653be12.jpg" },
    { key: "Apr-6-BNB", path: "70ea35216e216fd58b77c227d235a159285ce74f31063ab805f71e3936910a39.jpg" },
    { key: "Apr-6-MATIC", path: "5a1208926102835866c5dfdfb3cd473c607f3dc29b2d51e52a1184a64b847ecd.jpg" },
    { key: "Apr-7-AVAX", path: "64cc812901a57577421e4c3d13ab1417320bd244fe391bc26277a9ac54edba34.jpg" },
    { key: "Apr-7-ETH", path: "03c07e615f331f864e442f8a1a6fdfb3514d708ca545282112e69eec96198295.jpg" },
    { key: "Apr-7-XRP", path: "e4ea66aa03cc0e0e695e89a79bcaee1ea37cc8fc202159744cdf2e775b5056ed.jpg" },
    { key: "Apr-8-BNB", path: "d5b9c7feb2e7f294907c69ac3fd65fc305c3729067043375a2d5f89f241420fd.jpg" },
    { key: "Apr-8-BTC", path: "a94ade399921f7b01750b37bd8eaee2ff05d7d1bab43e62cf7d0873e65bfe2b6.jpg" },
    { key: "Apr-8-DOT", path: "7e771e4228e31e7fbca16bac52e8176d93951efdc7f5151fdae813d0888d2fc5.jpg" },
    { key: "Apr-9-APT", path: "71cd4e267cd0e3c0bed1c52afc92f210e4b0424a8baf9c87168598f513e17e2e.jpg" },
    { key: "Apr-9-DOGE", path: "b3492771aa54986fee60ba1b971552bda8af7539fc742e9ca9a077a6a06e721d.jpg" },
    { key: "Apr-9-MATIC", path: "fefbce6f304863497ed9771f1576f9f31df2f011107962cd1b7f24d1ebf41878.jpg" },
    { key: "May-1-AVAX", path: "d3d9c1ff960ffb5b4378a4cca76c8ae9bd54b459f20df98f0b68d7b2ff459cfa.jpg" },
    { key: "May-1-BNB", path: "c5fa741b624061be42333a7f9efdfaa73a2d55c2dcd72d9e65c324d049c9a15b.jpg" },
    { key: "May-1-ETH", path: "4c26b301cce0371e8a03d77bc49d2e1f27a800cfbf825fc6714e681fa38ea11a.jpg" },
    { key: "May-2-APT", path: "0d7a01f4ccedb8444a16df400fc904b8fd231ffd89a5e0cc7df7bba27ec8f3b7.jpg" },
    { key: "May-2-DOGE", path: "4aeb38a767bd613d920571b0b6d277b69815eb410b40aa8d0340ad351766b0c5.jpg" },
    { key: "May-2-SOL", path: "cb96d239bce1c83c4777992891436eb1b4b0359207ee62390a8541c91e8c1307.jpg" },
];
const topicIds = {
    ADA: 22,
    AVAX: 26,
    APT: 41,
    ETH: 20,
    BNB: 25,
    BTC: 19,
    DOGE: 23,
    DOT: 27,
    XRP: 21,
    MATIC: 42,
    SOL: 24,
};
const createContents = (topicKey, priceDollor, imagePath) => {
    return {
        time: new Date().getTime(),
        blocks: [
            {
                id: "i6MdMfZkic",
                data: {
                    text: `So, you chose ${topicKey}, eh? Did you choose up or down from the starting price of $${priceDollor}? `,
                },
                type: "paragraph",
            },
            {
                id: "0GK0P94_64",
                data: {
                    file: {
                        url: `https://dj95uwsw6egvp.cloudfront.net/image/resized/${imagePath}`,
                        width: 798,
                        height: 798,
                    },
                    caption: "",
                    stretched: false,
                    withBorder: false,
                    withBackground: false,
                },
                type: "image",
            },
            {
                id: "7exCms4zac",
                data: {
                    text: "Your choice is locked in so no backing out! Defend your choice here👇&nbsp;",
                },
                type: "paragraph",
            },
        ],
        version: "2.26.4",
    };
};
class WillGoPostingJob extends libs_job_manager_1.Job {
    constructor(jobRequest, model) {
        super(jobRequest);
        this.model = model;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const date = (0, moment_1.default)(this.request.dateTime).format("MMM-D-");
            const keys = imagePaths.filter((imagePath) => imagePath.key.indexOf(date) == 0);
            for (let i = 0; i < keys.length; i++) {
                try {
                    const key = keys[i];
                    const imagePath = key.path;
                    const topicKey = key.key.split("-")[2];
                    const topicId = topicIds[topicKey];
                    const title = `Will ${topicKey} Go 👆 or 👇 by ${(0, moment_1.default)(this.request.dateTime).add(2, "days").format("MMM D")} · 0:00?`;
                    const price = yield this.model.WillGo.getPriceCoins(topicKey);
                    const priceDollor = price && price.currency;
                    const priceDollorFormat = Math.floor(Number(priceDollor)).toLocaleString("en-US") + "." + priceDollor.split(".")[1];
                    const result = yield this.model.WillGo.updatePostForEventPrice(title, createContents(topicKey, priceDollorFormat, imagePath));
                    console.log(result);
                }
                catch (e) {
                    console.log(e);
                }
            }
            try {
                return {
                    success: true,
                };
            }
            catch (err) {
                return {
                    success: false,
                };
            }
        });
    }
}
exports.WillGoPostingJob = WillGoPostingJob;
