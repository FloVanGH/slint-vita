// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow } from "ui-import";
import { type TimeService } from "../services/interfaces/time_service";

export class AppBarController {
    private readonly _timeService: TimeService;
    private readonly _mainWindow: MainWindow;

    constructor(timeService: TimeService, mainWindow: MainWindow) {
        this._timeService = timeService;
        this._mainWindow = mainWindow;
    }

    public update(): void {
        this.updateCurrentTime();
    }

    private updateCurrentTime(): void {
        this._mainWindow.app_bar_current_time = this._timeService.currentTime;
    }
}
