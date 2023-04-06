// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { Bubble } from "../data/bubble";
import type * as bubble_service from "./interfaces/bubble_service";
import { type StorageService } from "./interfaces/storage_service";

const serviceKey = "bubbles";

export class BubbleService implements bubble_service.BubbleService {
    private readonly _bubblePages: Bubble[][] = [];
    private readonly _bubblesPerPage = 10;
    private readonly _rowCount = 3;
    private readonly _storageService: StorageService;

    constructor(storageService: StorageService) {
        this._storageService = storageService;

        const bubblePages = this._storageService.load<Bubble[][]>(serviceKey);

        if (bubblePages === undefined || bubblePages.length === 0) {
            this.registerBubble("Trophies", "minetest.png", "#000000");
            this.registerBubble("Settings", "minetest.png", "#7c9d46");
            this._storageService.save(serviceKey, this._bubblePages);
        } else {
            this._bubblePages = bubblePages;
        }
    }

    public registerBubble(
        title: string,
        icon: string,
        background: string
    ): void {
        // skip if page bubble already registered.
        if (
            this._bubblePages.find(
                (p) => p.find((b) => b.title === title) !== undefined
            ) !== undefined
        ) {
            return;
        }

        let pageIndex = this.pageCount;

        for (let i = 0; i < this._bubblePages.length; i++) {
            if (this._bubblePages.length < this._bubblesPerPage) {
                pageIndex = i;
                break;
            }
        }

        if (pageIndex === this.pageCount) {
            this._bubblePages.push([]);
        }

        // find next free cell on bubble page and add the new bubble.
        for (let r = 0; r < this._rowCount; r++) {
            const columnCount = r % 2 === 0 ? 4 : 3;

            for (let c = 0; c < columnCount; c++) {
                if (
                    this._bubblePages[pageIndex].find(
                        (b) => b.row === r && b.column === c
                    ) === undefined
                ) {
                    this._bubblePages[pageIndex].push(
                        new Bubble(title, r, c, false, icon, background)
                    );
                    return;
                }
            }
        }
    }

    get pageCount(): number {
        return this._bubblePages.length;
    }

    get bubbles(): Bubble[][] {
        return this._bubblePages;
    }
}
