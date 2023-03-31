// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { Bubble } from "../../data/bubble";
import { type BubbleService } from "../interfaces/bubble_service";

export class BubbleServiceMock implements BubbleService {
    private readonly _bubbles: Bubble[][] = [
        [
            new Bubble("Minetest", 0, 0, false, "minetest.png"),
            new Bubble("Trophies", 0, 1, false, "minetest.png"),
            new Bubble("Item 3", 0, 2, false, "minetest.png"),
            new Bubble("Item 4", 1, 0, false, "minetest.png"),
            new Bubble("Item 5", 1, 1, false, "minetest.png"),
            new Bubble("Item 6", 1, 2, false, "minetest.png"),
            new Bubble("Item 7", 1, 3, false, "minetest.png"),
            new Bubble("Item 8", 2, 0, false, "minetest.png"),
            new Bubble("Item 9", 2, 1, false, "minetest.png"),
            new Bubble("Item 10", 2, 2, false, "minetest.png"),
        ],
        [
            new Bubble("Item 1", 0, 0, false, "minetest.png"),
            new Bubble("Item 2", 0, 1, false, "minetest.png"),
            new Bubble("Item 3", 1, 0, false, "minetest.png"),
            new Bubble("Item 4", 1, 1, false, "minetest.png"),
            new Bubble("Item 5", 1, 3, false, "minetest.png"),
            new Bubble("Item 6", 2, 0, false, "minetest.png"),
            new Bubble("Item 7", 2, 1, false, "minetest.png"),
            new Bubble("Item 8", 2, 2, false, "minetest.png"),
        ],
    ];

    readonly pageCount = 2;

    get bubbles(): Bubble[][] {
        return this._bubbles;
    }
}
