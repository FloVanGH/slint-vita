// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type List } from "../../data/list";

export interface ListService {
    get listItems(): List[];
}
