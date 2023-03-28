// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { AppService } from "../services/app_service";
import { MainWindow } from "node-ui";

export class AppController {
    private _service: AppService;
    private _mainWindow: MainWindow;

    constructor(service: AppService, mainWindow: MainWindow) {
        this._service = service;
        this._mainWindow = mainWindow;
        this._mainWindow.open_app.setHandler(this.openApp);
    }

    openApp = (id) => {
        // check for internal apps
        if(id == "Trophies") {
            return id;
        }

        return "";
    }
}