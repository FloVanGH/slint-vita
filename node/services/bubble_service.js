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

    }

    get bubbles() {
        let bubbles = [];
        let pageCount = 2;

        for(let p = 0; p < pageCount; p++) {
            bubbles[p] = [];

            for(let r = 0; r < 3; r++) {
                let columnCount = r % 2 == 0 ? 3 : 4;

                for(let c = 0; c < columnCount; c++) {
                    bubbles[p].push(new Bubble("", r, c, true, "minetest.png"))
                }
            }
        }

        bubbles[0][0] = new Bubble("Trophies", 0, 0, false, "minetest.png");

        return bubbles;
    }
}

module.exports = { BubbleService };