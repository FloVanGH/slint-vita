// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type Bubble } from "../../data/bubble";

export interface BubbleService {
    get bubbles(): Bubble[][];
    get pageCount(): number;
}
