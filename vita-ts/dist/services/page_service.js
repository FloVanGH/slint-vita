"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
class Page {
    constructor(title, color) {
        this.id = title;
        this.title = title;
        this.color = color;
    }
}
class PageService {
    constructor() {
        this._pages = [];
    }
    get pages() {
        return this._pages;
    }
    openPage(id) {
        this._pages.push(new Page(id, "#000000"));
    }
    closePage(id) {
        this._pages = this._pages.filter(p => p.id == id);
    }
}
exports.PageService = PageService;
//# sourceMappingURL=page_service.js.map