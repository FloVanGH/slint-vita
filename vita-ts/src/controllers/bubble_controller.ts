// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { BubbleService } from "../services/bubble_service";
import { MainWindow, slint } from "node-ui";

export class BubbleController {
    private _service: BubbleService;

    constructor(service: BubbleService, main_window: MainWindow) {
        this._service = service;
        main_window.bubbles = new slint.ArrayModel(service.bubbles);
    }
}
