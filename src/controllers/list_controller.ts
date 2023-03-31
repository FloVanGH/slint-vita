// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type ListItem, type List } from "../data/list";
import { type ListService } from "../services/interfaces/list_service";

export class ListController {
    private readonly _service: ListService;
    private readonly _mainWindow: MainWindow;
    private readonly _currentPage = 0;
    private _currentList: List;

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
        // this._mainWindow.list_show_details(this.showDetails);
    }

    public displayItems(): void {
        this._mainWindow.list_title = this._service.title;
        this._mainWindow.list_background = this._service.background;

        const listItemsModel = new slint.ArrayModel([]);
        listItemsModel.push(
            new slint.ArrayModel(this._service.masterItems.items)
        );

        this._mainWindow.list_items = listItemsModel;
        this._currentList = this._service.masterItems;
    }

    private clearSelection(): void {
        const oldSelectedIndex = this._currentList.unselect();

        if (oldSelectedIndex < 0) {
            return;
        }

        this._mainWindow.list_items
            .rowData(this._currentPage)
            .setRowData(
                oldSelectedIndex,
                this._currentList.items[oldSelectedIndex]
            );
    }

    private select(index: number): boolean {
        if (index < 0 || index >= this._currentList.length) {
            return false;
        }

        const oldSelectedIndex = this._currentList.select(index);

        if (oldSelectedIndex >= 0) {
            this._mainWindow.list_items
                .rowData(this._currentPage)
                .setRowData(
                    oldSelectedIndex,
                    this._currentList.items[oldSelectedIndex]
                );
        }

        const newSelectedItem = this._currentList.selectedItem;

        if (newSelectedItem === null) {
            return false;
        }

        this._mainWindow.list_items
            .rowData(this._currentPage)
            .setRowData(index, newSelectedItem);

        return true;
    }

    private moveSelection(up: boolean): void {
        if (this._currentList.selectedIndex < 0) {
            this.select(0);
            return;
        }

        if (up) {
            this.select(this._currentList.selectedIndex - 1);
        } else {
            this.select(this._currentList.selectedIndex + 1);
        }
    }

    moveUp = (): void => {
        this.moveSelection(true);
    };

    moveDown = (): void => {
        this.moveSelection(false);
    };

    showDetails = (index): void => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        console.log("show details: " + index);
    };
}
