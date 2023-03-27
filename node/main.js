const { BubbleController } = require("./controllers/bubble_controller.js");
const { BubbleService } = require("./services/bubble_service.js");
const { PageService } = require("./services/page_service.js");
const { PageController } = require("./controllers/page_controller.js");
const { AppWindow } = require("../ui/appwindow.slint");

let mainWindow = new AppWindow();

let bubbleController = new BubbleController(new BubbleService(), mainWindow);
let pageController = new PageController(new PageService(), mainWindow);

mainWindow.run();