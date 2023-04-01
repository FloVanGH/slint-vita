// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type ListItem } from "../data/list";
import { type ListService } from "../services/interfaces/list_service";

export class ListController {
    private readonly _service: ListService;
    private readonly _mainWindow: MainWindow;
    private _selectedItem?: ListItem;
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
        if (this._selectedItem === undefined) {
            return;
        }

        const index = this._service.listItems[this._currentPage].items.indexOf(
            this._selectedItem
        );

        this._selectedItem.selected = false;
        this._mainWindow.list_items
            .rowData(this._currentPage)
            .setRowData(index, this._selectedItem);
        this._selectedItem = undefined;
    }

    private select(listItem?: ListItem): boolean {
        if (listItem === undefined || this._selectedItem === listItem) {
            return false;
        }

        this.clearSelection();

        listItem.selected = true;
        this._selectedItem = listItem;

        if (
            this._currentPage < 0 ||
            this._currentPage >= this._mainWindow.list_items.length
        ) {
            return false;
        }

        // todo add check (add extra method)
        const index =
            this._service.listItems[this._currentPage].items.indexOf(listItem);

        this._mainWindow.list_items
            .rowData(this._currentPage)
            .setRowData(index, listItem);

        return true;
    }

    private moveSelection(up: boolean): void {
        if (this._selectedItem === undefined) {
            this.select(this._service.listItems[this._currentPage].items[0]);
            return;
        }

        const index = this._service.listItems[this._currentPage].items.indexOf(
            this._selectedItem
        );

        if (up) {
            this.select(
                this._service.listItems[this._currentPage].items[index - 1]
            );
        } else {
            this.select(
                this._service.listItems[this._currentPage].items[index + 1]
            );
        }
    }

    moveUp = (): void => {
        this.moveSelection(true);
    };

    moveDown = (): void => {
        this.moveSelection(false);
    };
}
