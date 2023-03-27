class Page {
    public id: string;
    public title: string;
    public color: string;

    constructor(title, color) {
        this.id = title;
        this.title = title;
        this.color = color;
    }
}

export class PageService {
    private _pages: Page[];

    constructor() {
        this._pages = [];
    }

    public get pages()  {
        return this._pages;
    }

    openPage(id) {
        this._pages.push(new Page(id, "#000000"));
    }

    closePage(id) {
        this._pages = this._pages.filter(p => p.id == id);
    }
}
