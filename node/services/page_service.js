class Page {
    constructor(title, color) {
        this.id = title;
        this.title = title;
        this.color = color;
    }
}

class PageService {
    constructor() {
        this.pages = [];
    }

    openPage(id) {
        this.pages.push(new Page(id, "#000000"));
    }

    closePage(id) {
        this.pages = this.pages.filter(p => p.id == id);
    }
}

module.exports = { PageService };