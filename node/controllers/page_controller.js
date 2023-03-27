let slint = require("slint-ui");

class PageController {
    constructor(service, window) {
        this.service = service;
        this.window = window;

        window.open_page.setHandler(this.openPage);
        window.close_page.setHandler(this.closePage);

        this.displayPages();
    }

    displayPages() {
        this.window.pages = new slint.ArrayModel(this.service.pages);
    }

    openPage = (id) => {
        this.service.openPage(id);
        this.displayPages();

        return true;
    }

    closePage = (id) => {
        this.service.closePage(id);
        this.displayPages();
    }
}

module.exports = { PageController };