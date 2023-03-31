// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { Page } from "../../data/page";
import { type AppService } from "../interfaces/app_service";

export class AppServiceMock implements AppService {
    private readonly _pages: Page[] = [new Page("Trophies", "#000000")];

    get pages(): Page[] {
        return this._pages;
    }
}
