// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type ListItem, type List } from "../data/list";
import { type ListService } from "../services/interfaces/list_service";
import { type NotificationService } from "../services/interfaces/notification_service";

export class ListController {
    private readonly _service: ListService;
    private readonly _notificationService: NotificationService;
    private readonly _mainWindow: MainWindow;
    private readonly _lists: List[] = [];

    constructor(service: ListService, mainWindow: MainWindow) {
        this._service = service;
        this._mainWindow = mainWindow;
        this.setHandlers();
    }

    public async init(): Promise<void> {
        await this._service.init();
    }

    private setHandlers(): void {
        this._mainWindow.list_move_up.setHandler(this.moveUp);
        this._mainWindow.list_move_down.setHandler(this.moveDown);
        this._mainWindow.list_show_details.setHandler(this.showDetails);
        this._mainWindow.list_move_left.setHandler(this.moveLeft);
        this._mainWindow.list_on_enter.setHandler(this.onEnter);
    }

    public displayItems(): void {
        this._mainWindow.list_current_page = 0;
        this._mainWindow.list_background = this._service.background;

        const listItemsModel = new slint.ArrayModel([]);
        listItemsModel.push(
            new slint.ArrayModel(this._service.masterItems.items)
        );

        this._mainWindow.list_items = listItemsModel;
        this._lists.push(this._service.masterItems);
        this._mainWindow.list_title = this.currentList.title;
    }

    private clearSelection(): void {
        const oldSelectedIndex = this.currentList.unselect();

        if (oldSelectedIndex < 0) {
            return;
        }

        this._mainWindow.list_items
            .rowData(this._mainWindow.list_current_page)
            .setRowData(
                oldSelectedIndex,
                this.currentList.items[oldSelectedIndex]
            );
    }

    private select(index: number): boolean {
        if (index < 0 || index >= this.currentList.length) {
            return false;
        }

        const oldSelectedIndex = this.currentList.select(index);

        if (oldSelectedIndex >= 0) {
            this._mainWindow.list_items
                .rowData(this._mainWindow.list_current_page)
                .setRowData(
                    oldSelectedIndex,
                    this.currentList.items[oldSelectedIndex]
                );
        }

        const newSelectedItem = this.currentList.selectedItem;

        if (newSelectedItem === null) {
            return false;
        }

        this._mainWindow.list_items
            .rowData(this._mainWindow.list_current_page)
            .setRowData(index, newSelectedItem);

        return true;
    }

    private moveSelection(up: boolean): void {
        if (this.currentList.selectedIndex < 0) {
            this.select(0);
            return;
        }

        if (up) {
            this.select(this.currentList.selectedIndex - 1);
        } else {
            this.select(this.currentList.selectedIndex + 1);
        }
    }

    private get currentList(): List {
        return this._lists[this._lists.length - 1];
    }

    moveUp = (): void => {
        this.moveSelection(true);
    };

    moveDown = (): void => {
        this.moveSelection(false);
    };

    moveLeft = (): void => {
        if (this._mainWindow.list_current_page <= 0) {
            return;
        }

        this.clearSelection();
        this._lists.pop();

        this._mainWindow.list_items.remove(
            this._mainWindow.list_current_page,
            1
        );

        this._mainWindow.list_current_page -= 1;
        this._mainWindow.list_title = this.currentList.title;
        this._mainWindow.list_sub_title = this.currentList.subTitle;
    };

    onEnter = (): void => {
        const selectedItem = this.currentList.selectedItem;

        if (selectedItem !== undefined) {
            this.showDetails(selectedItem);
        }
    };

    showDetails = (item: ListItem): void => {
        const detailItems = this._service.detailsItems(item.id);

        if (detailItems === undefined) {
            return;
        }

        this.clearSelection();
        this._mainWindow.list_items.push(
            new slint.ArrayModel(detailItems.items)
        );
        this._lists.push(detailItems);
        this._mainWindow.list_title = this.currentList.title;
        this._mainWindow.list_sub_title = this.currentList.subTitle;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        this._mainWindow.list_current_page += 1;
    };
}
