// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { MainWindow } from "../ui-import";
import { LauncherController } from "./controllers/launcher_controller";
import { AppServiceMock } from "./services/mocks/app_service_mock";
import { BubbleServiceMock } from "./services/mocks/bubble_service_mock";

const mainWindow = new MainWindow();

const launcherController = new LauncherController(
    new BubbleServiceMock(),
    new AppServiceMock(),
    mainWindow
);

launcherController.init();

mainWindow.run();
