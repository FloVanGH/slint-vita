// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type TrophyService } from "../services/interfaces/trophy_service";

export class TrophiesController {
    private readonly _service: TrophyService;
    private readonly _mainWindow: MainWindow;

    constructor(service: TrophyService, mainWindow: MainWindow) {
        this._service = service;
        this._mainWindow = mainWindow;
    }

    public init(): void {
        this._mainWindow.trophies_games = new slint.ArrayModel(
            this._service.games
        );
    }
}
