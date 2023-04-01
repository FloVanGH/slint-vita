// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type ListService } from "../services/interfaces/list_service";

export class ListController {
    private readonly _service: ListService;
    private readonly _mainWindow: MainWindow;
    private readonly _currentPage = 0;

    constructor(service: ListService, mainWindow: MainWindow) {
        this._service = service;
        this._mainWindow = mainWindow;
    }

    public init(): void {
        this.setHandlers();
    }

    private setHandlers(): void {
        this._mainWindow.list_move_up.setHandler(this.moveUp);
        this._mainWindow.list_move_down.setHandler(this.moveDown);
    }

    public displayItems(): void {
        const listItemsModel = new slint.ArrayModel([]);
        for (const list of this._service.listItems) {
            listItemsModel.push(new slint.ArrayModel(list.items));
        }
        this._mainWindow.list_items = listItemsModel;
    }

    private clearSelection(): void {
        const list = this._service.listItems[this._currentPage];

        if (list === undefined) {
            return;
        }

        const oldSelectedIndex = list.unselect();

        if (oldSelectedIndex < 0) {
            return;
        }

        this._mainWindow.list_items
            .rowData(this._currentPage)
            .setRowData(oldSelectedIndex, list.items[oldSelectedIndex]);
    }

    private select(index: number): boolean {
        const list = this._service.listItems[this._currentPage];

        if (list === undefined || index < 0 || index >= list.length) {
            return false;
        }

        const oldSelectedIndex = list.select(index);

        if (oldSelectedIndex >= 0) {
            this._mainWindow.list_items
                .rowData(this._currentPage)
                .setRowData(oldSelectedIndex, list.items[oldSelectedIndex]);
        }

        const newSelectedItem = list.selectedItem;

        if (newSelectedItem === null) {
            return false;
        }

        this._mainWindow.list_items
            .rowData(this._currentPage)
            .setRowData(index, newSelectedItem);

        return true;
    }

    private moveSelection(up: boolean): void {
        const list = this._service.listItems[this._currentPage];

        if (list === undefined) {
            return;
        }

        if (list.selectedItem === undefined) {
            this.select(0);
            return;
        }

        if (up) {
            this.select(list.selectedIndex - 1);
        } else {
            this.select(list.selectedIndex + 1);
        }
    }

    moveUp = (): void => {
        this.moveSelection(true);
    };

    moveDown = (): void => {
        this.moveSelection(false);
    };
}
