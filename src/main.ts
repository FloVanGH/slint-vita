// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { MainWindow } from "../ui-import";
import { LauncherController } from "./controllers/launcher_controller";
import { ListController } from "./controllers/list_controller";
import { AppServiceMock } from "./services/mocks/app_service_mock";
import { BubbleServiceMock } from "./services/mocks/bubble_service_mock";
import { TrophyServiceMock } from "./services/mocks/trophy_service_mock";
import { TrophyService } from "./services/trophy_service";
import * as dotenv from "dotenv";

dotenv.config();

const mainWindow = new MainWindow();

const launcherController = new LauncherController(
    new BubbleServiceMock(),
    new AppServiceMock(),
    mainWindow
);

launcherController.init();

if (process.env.PSN !== undefined && process.env.PSN !== "") {
    const trophyService = new TrophyService();
    trophyService.init(process.env.PSN).then(
        () => {
            console.log("Run psn service");
            const trophiesController = new ListController(
                trophyService,
                mainWindow
            );

            trophiesController.init();

            mainWindow.run();
        },
        () => {
            runMock(mainWindow);
        }
    );
} else {
    runMock(mainWindow);
}

function runMock(mainWindow: MainWindow): void {
    console.log("Cannot connect to psn, run mock service.");
    const trophiesController = new ListController(
        new TrophyServiceMock(),
        mainWindow
    );

    trophiesController.init();
    mainWindow.run();
}
