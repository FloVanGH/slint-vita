// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type List } from "../../data/list";

export interface ListService {
    get masterItems(): List;
    get background(): string;

    init: () => Promise<void>;
    detailsItems: (id: string) => List | undefined;
}
