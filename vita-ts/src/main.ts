import { AppWindow } from "node-ui";
import { BubbleController } from "./controllers/bubble_controller";
import { PageController } from "./controllers/page_controller";
import { BubbleService } from "./services/bubble_service";
import { PageService } from "./services/page_service";

import * as psn from "psn-api";

import dotenv from 'dotenv';

dotenv.config()


// psnTest().then(result => {
    let window = new AppWindow();

    let bubbleController = new BubbleController(new BubbleService(), window);
    let pageController = new PageController(new PageService(), window);

    window.run()
// });

async function psnTest() {

    const myNpsso = process.env["PSN"];
    const accessCode = await psn.exchangeNpssoForCode(myNpsso);
    const authorization = await psn.exchangeCodeForAccessToken(accessCode);

    const trophyTitlesResponse = await psn.getUserTitles(
        { accessToken: authorization.accessToken },
        "me"
      );

    console.log(trophyTitlesResponse);
}