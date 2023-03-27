"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_ui_1 = require("node-ui");
const bubble_controller_1 = require("./controllers/bubble_controller");
const page_controller_1 = require("./controllers/page_controller");
const bubble_service_1 = require("./services/bubble_service");
const page_service_1 = require("./services/page_service");
let window = new node_ui_1.AppWindow();
let bubbleController = new bubble_controller_1.BubbleController(new bubble_service_1.BubbleService(), window);
let pageController = new page_controller_1.PageController(new page_service_1.PageService(), window);
window.run();
//# sourceMappingURL=main.js.map