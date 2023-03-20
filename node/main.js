

let slint = require("slint-ui");
let bubble = require("./bubble.controller.js");

let vita = require("../ui/appwindow.slint");

let mainWindow = new vita.AppWindow();

let bubbleController = new bubble.BubbleController(mainWindow);

mainWindow.run();