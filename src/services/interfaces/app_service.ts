// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type Page } from "../../data/page";

export interface AppService {
    get pages(): Page[];
}