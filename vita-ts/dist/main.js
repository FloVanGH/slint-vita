"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const node_ui_1 = require("node-ui");
const bubble_controller_1 = require("./controllers/bubble_controller");
const page_controller_1 = require("./controllers/page_controller");
const bubble_service_1 = require("./services/bubble_service");
const page_service_1 = require("./services/page_service");
const psn = __importStar(require("psn-api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
psnTest().then(result => {
    let window = new node_ui_1.AppWindow();
    let bubbleController = new bubble_controller_1.BubbleController(new bubble_service_1.BubbleService(), window);
    let pageController = new page_controller_1.PageController(new page_service_1.PageService(), window);
    window.run();
});
function psnTest() {
    return __awaiter(this, void 0, void 0, function* () {
        const myNpsso = process.env["PSN"];
        const accessCode = yield psn.exchangeNpssoForCode(myNpsso);
        const authorization = yield psn.exchangeCodeForAccessToken(accessCode);
        const trophyTitlesResponse = yield psn.getUserTitles({ accessToken: authorization.accessToken }, "me");
        console.log(trophyTitlesResponse);
    });
}
//# sourceMappingURL=main.js.map