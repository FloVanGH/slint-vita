// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

export class Bubble {
    public title: string;
    public row: number;
    public column: number;
    public filler: boolean;
    public icon: string;
    public selected: boolean;
    public background: string;

    constructor(
        title: string,
        row: number,
        column: number,
        filler: boolean,
        icon: string,
        background = "#ffffff"
    ) {
        this.title = title;
        this.row = row;
        this.column = column;
        this.filler = filler;
        this.icon = icon;
        this.selected = false;
        this.background = background;
    }
}
