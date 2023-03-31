// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type Bubble } from "../data/bubble";
import type * as bubble_service from "./interfaces/bubble_service";

export class BubbleService implements bubble_service.BubbleService {
    get pageCount(): number {
        throw new Error("Method not implemented.");
    }

    get bubbles(): Bubble[][] {
        throw new Error("Method not implemented.");
    }
}
