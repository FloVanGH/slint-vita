// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { MainWindow, slint } from "node-ui";
import { PageService } from "../services/page_service";

export class PageController {
    private _main_window: MainWindow;
    private _service: PageService;

    constructor(service: PageService, main_window: MainWindow) {
        this._service = service;
        this._main_window = main_window;

        main_window.open_page.setHandler(this.openPage);
        main_window.close_page.setHandler(this.closePage);

        this.displayPages();
    }

    displayPages() {
        this._main_window.pages = new slint.ArrayModel(this._service.pages);
    }

    openPage = (id) => {
        let index = this._service.openPage(id);
        if(index > -1) {
            this.displayPages();
        }

        return index;
    }

    closePage = (id) => {
        this._service.closePage(id);
        this.displayPages();
    }
}