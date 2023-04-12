// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { List, ListItem } from "../data/list";
import { type ListService } from "./interfaces/list_service";

const mainKey = "main";

export class SettingsService implements ListService {
    private readonly items = new Map<string, List>();

    public async init(): Promise<void> {
        const mainList = new List();
        mainList.push(new ListItem("Accounts"));
        mainList.title = "Settings";
        this.items.set(mainKey, mainList);
    }

    public detailsItems(id: string): List | undefined {
        return undefined;
    }

    public get masterItems(): List {
        const masterList = this.items.get(mainKey);

        if (masterList !== undefined) {
            return masterList;
        }

        return new List();
    }

    public readonly background = "#7c9d46";
}
