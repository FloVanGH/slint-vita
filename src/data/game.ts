// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

export class Game {
    public title: string;
    public selected: boolean;

    constructor(title: string) {
        this.title = title;
        this.selected = false;
    }
}
