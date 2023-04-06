// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { List, ListItem } from "../../data/list";
import { type ListService } from "../interfaces/list_service";

export class TrophyServiceMock implements ListService {
    private readonly _trophiesList: List = new List();

    async init(): Promise<void> {
        this._trophiesList.push(new ListItem("The last of us"));
        this._trophiesList.push(new ListItem("Gravity rush."));
    }

    public detailsItems(id: string): List | undefined {
        return undefined;
    }

    get masterTitle(): string {
        return this.title;
    }

    readonly title = "Trophies";
    readonly background = "#000000";

    get masterItems(): List {
        return this._trophiesList;
    }
}
