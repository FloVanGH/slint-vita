// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type Bubble } from "../../data/bubble";

export interface BubbleService {
    get bubbles(): Bubble[][];
    get pageCount(): number;
}
