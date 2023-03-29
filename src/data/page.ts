// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

export class Page {
    public title: string;
    public color: string;

    constructor(title: string, color: string) {
        this.title = title;
        this.color = color;
    }
}
