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
    private _selectedIndex = -1;

    public push(item: ListItem): void {
        this.items.push(item);
    }

    get selectedItem(): ListItem | undefined {
        return this.items[this._selectedIndex];
    }

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    public select(index: number): number {
        const oldSelectedIndex = this.unselect();

        if (index < 0 || index >= this.items.length) {
            return oldSelectedIndex;
        }

        this._selectedIndex = index;

        const selectedItem = this.selectedItem;

        if (selectedItem === undefined) {
            return oldSelectedIndex;
        }

        selectedItem.selected = true;

        return oldSelectedIndex;
    }

    public unselect(): number {
        const index = this._selectedIndex;

        if (index < 0 || index >= this.length) {
            return -1;
        }

        const selectedItem = this.selectedItem;

        if (selectedItem === undefined) {
            return -1;
        }

        selectedItem.selected = false;
        this._selectedIndex = -1;

        return index;
    }

    get length(): number {
        return this.items.length;
    }

    public items: ListItem[] = [];
}
