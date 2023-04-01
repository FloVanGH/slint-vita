// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type ListService } from "../services/interfaces/list_service";

export class ListController {
    private readonly _service: ListService;
    private readonly _mainWindow: MainWindow;

    constructor(service: ListService, mainWindow: MainWindow) {
        this._service = service;
        this._mainWindow = mainWindow;
    }

    public init(): void {
        const listItemsModel = new slint.ArrayModel([]);
        for (const list of this._service.listItems) {
            listItemsModel.push(new slint.ArrayModel(list.items));
        }
        this._mainWindow.list_items = listItemsModel;
    }
}
