// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

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

    openPage(id) : number {
        let index = this._pages.findIndex(p => p.id == id);

        if(index == -1) {
            this._pages.push(new Page(id, "#000000"));
            index = this._pages.length - 1;
        }

        return index;
    }

    closePage(id) {
        this._pages = this._pages.filter(p => p.id != id);
    }
}
