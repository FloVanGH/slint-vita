// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { MainWindow, slint } from "../ui-import";
import { LauncherController } from "./controllers/launcher_controller";
import { ListController } from "./controllers/list_controller";
import { BubbleServiceMock } from "./services/mocks/bubble_service_mock";
import { TrophyServiceMock } from "./services/mocks/trophy_service_mock";
import { TrophyService } from "./services/trophy_service";
import { NavigationService } from "./services/navigation_service";
import * as view from "./keys/view";
import * as dotenv from "dotenv";
import { AppBarController } from "./controllers/app_bar_controller";
import { TimeService } from "./services/time_service";

const mainWindow = new MainWindow();

const appBarController = new AppBarController(new TimeService(), mainWindow);

const navigationService = new NavigationService();

const launcherController = new LauncherController(
    new BubbleServiceMock(),
    navigationService,
    mainWindow
);

function updateAppBar(): void {
    appBarController.update();
    slint.Timer.singleShot(500, updateAppBar);
}

slint.Timer.singleShot(500, updateAppBar);

launcherController.init();
dotenv.config();

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

            navigationService.registerListController(
                view.trophies,
                trophiesController
            );

            mainWindow.run();
        },
        () => {
            runMock(navigationService, mainWindow);
        }
    );
} else {
    runMock(navigationService, mainWindow);
}

function runMock(navigationService, mainWindow: MainWindow): void {
    const trophiesController = new ListController(
        new TrophyServiceMock(),
        mainWindow
    );
    trophiesController.init();
    navigationService.registerListController(view.trophies, trophiesController);
    mainWindow.run();
}
