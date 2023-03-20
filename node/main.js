


let bc = require("./bubble.controller.js");
let bs = require("./bubble.service.js");

let vita = require("../ui/appwindow.slint");

let mainWindow = new vita.AppWindow();

let bubbleController = new bc.BubbleController(new bs.BubbleService(), mainWindow);

mainWindow.run();