// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type ListController } from "../controllers/list_controller";
import type * as navigation from "./interfaces/navigation_service";

export class NavigationService implements navigation.NavigationService {
    private readonly _listControllers: Map<string, ListController> = new Map<
        string,
        ListController
    >();

    public registerListController(
        key: string,
        listController: ListController
    ): void {
        this._listControllers.set(key, listController);
    }

    public show(key: string): boolean {
        if (!this._listControllers.has(key)) {
            return false;
        }

        this._listControllers.get(key)?.displayItems();

        return true;
    }
}
