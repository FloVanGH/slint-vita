"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const node_ui_1 = require("node-ui");
class PageController {
    constructor(service, window) {
        this.openPage = (id) => {
            this._service.openPage(id);
            this.displayPages();
            return true;
        };
        this.closePage = (id) => {
            this._service.closePage(id);
            this.displayPages();
        };
        this._service = service;
        this._window = window;
        window.open_page.setHandler(this.openPage);
        window.close_page.setHandler(this.closePage);
        this.displayPages();
    }
    displayPages() {
        this._window.pages = new node_ui_1.slint.ArrayModel(this._service.pages);
    }
}
exports.PageController = PageController;
//# sourceMappingURL=page_controller.js.map