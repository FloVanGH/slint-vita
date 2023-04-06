// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { MainWindow, slint } from "../ui-import";
import { LauncherController } from "./controllers/launcher_controller";
import { ListController } from "./controllers/list_controller";
import { TrophyService } from "./services/trophy_service";
import { NavigationService } from "./services/navigation_service";
import * as view from "./keys/view";
import * as dotenv from "dotenv";
import { AppBarController } from "./controllers/app_bar_controller";
import { TimeService } from "./services/time_service";
import { BubbleService } from "./services/bubble_service";
import { StorageService } from "./services/storage_service";
import { NotificationService } from "./services/notification_service";
import { NotificationMessage } from "./data/notification";
import { NotificationController } from "./controllers/notification_controller";

const mainWindow = new MainWindow();
const storageService = new StorageService();
const navigationService = new NavigationService();
const notificationService = new NotificationService();
const appBarController = new AppBarController(new TimeService(), mainWindow);
const notificationController = new NotificationController(
    notificationService,
    mainWindow
);

const launcherController = new LauncherController(
    new BubbleService(storageService),
    navigationService,
    mainWindow
);
const trophiesController = new ListController(
    new TrophyService(process.env.PSN),
    mainWindow
);

navigationService.registerListController(view.trophies, trophiesController);

appBarController.init();
launcherController.init();
notificationController.init();

trophiesController
    .init()
    .then(() => {
        for (let i = 0; i < 20; i++) {
            notificationService.add(
                new NotificationMessage(
                    "blu asdf das<fdsaf asdfas fdsf dsfs sdf dssdf sdfds fsdf dsf sdfsd fsdf dsfds fsdfd ssdf dssdf sdf sdsdf sdf dsdsf sdfb"
                )
            );
        }

        mainWindow.run();
    })
    .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        notificationService.add(new NotificationMessage("Trophies: " + error));
        mainWindow.run();
    });

launcherController.init();
dotenv.config();
