// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT


import { MainWindow } from "node-ui";
import { BubbleController } from "./controllers/bubble_controller";
import { PageController } from "./controllers/page_controller";
import { BubbleService } from "./services/bubble_service";
import { PageService } from "./services/page_service";


import * as psn from "psn-api";

import dotenv from 'dotenv';
import { AppService } from "./services/app_service";
import { AppController } from "./controllers/app_controller";

dotenv.config()

// psnTest().then(result => {
    let main_window = new MainWindow();

    new BubbleController(new BubbleService(), main_window);
    new PageController(new PageService(), main_window);
    new AppController(new AppService(), main_window);

    main_window.run()
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