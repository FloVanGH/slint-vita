import { AppWindow, slint } from "node-ui";
import { PageService } from "../services/page_service";

export class PageController {
    private _window: AppWindow;
    private _service: PageService;

    constructor(service: PageService, window: AppWindow) {
        this._service = service;
        this._window = window;

        window.open_page.setHandler(this.openPage);
        window.close_page.setHandler(this.closePage);

        this.displayPages();
    }

    displayPages() {
        this._window.pages = new slint.ArrayModel(this._service.pages);
    }

    openPage = (id) => {
        this._service.openPage(id);
        this.displayPages();

        return true;
    }

    closePage = (id) => {
        this._service.closePage(id);
        this.displayPages();
    }
}