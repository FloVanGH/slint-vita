import { AppWindow } from "node-ui";
import { BubbleController } from "./controllers/bubble_controller";
import { PageController } from "./controllers/page_controller";
import { BubbleService } from "./services/bubble_service";
import { PageService } from "./services/page_service";

let window = new AppWindow();

let bubbleController = new BubbleController(new BubbleService(), window);
let pageController = new PageController(new PageService(), window);

window.run()