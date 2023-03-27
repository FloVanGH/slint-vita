"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleService = void 0;
class Bubble {
    constructor(title, row, column, filler, icon) {
        this.title = title;
        this.row = row;
        this.column = column;
        this.filler = filler;
        this.icon = icon;
    }
}
class BubbleService {
    constructor() {
        this._bubbles = [];
        let pageCount = 2;
        for (let p = 0; p < pageCount; p++) {
            this._bubbles[p] = [];
            for (let r = 0; r < 3; r++) {
                let columnCount = r % 2 == 0 ? 3 : 4;
                for (let c = 0; c < columnCount; c++) {
                    this._bubbles[p].push(new Bubble("", r, c, true, "minetest.png"));
                }
            }
        }
        this._bubbles[0][0] = new Bubble("Trophies", 0, 0, false, "minetest.png");
    }
    get bubbles() {
        return this._bubbles;
    }
}
exports.BubbleService = BubbleService;
//# sourceMappingURL=bubble_service.js.map