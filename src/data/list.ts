// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

export class ListItem {
    constructor(title: string) {
        this.title = title;
        this.selected = false;
    }

    public title: string;
    public selected: boolean;
}

export class List {
    public items: ListItem[] = [];

    public push(item: ListItem): void {
        this.items.push(item);
    }
}
