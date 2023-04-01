// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { List, ListItem } from "../../data/list";
import { type ListService } from "../interfaces/list_service";

export class TrophyServiceMock implements ListService {
    private readonly _listItems: List[] = [];

    constructor() {
        const trophies = new List();
        trophies.push(new ListItem("The last of us", "minetest.png"));
        trophies.push(new ListItem("Gravity rush.", "minetest.png"));
        this._listItems.push(trophies);
    }

    get listItems(): List[] {
        return this._listItems;
    }
}
