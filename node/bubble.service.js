class Bubble {
    constructor(title, row, column, filler, icon) {
        this.title = title;
        this.row = row;
        this.column = column;
        this.filler = filler;
        this.icon = icon;
    }

    // get title() {
    //     return this.title;
    // }

    // get row() {
    //     return this.row;
    // }

    // get column() {
    //     return this.column;
    // }
}

class BubbleService {
    constructor() {

    }

    get bubbles() {
        return [[new Bubble("Minetest", 0, 0, false, undefined), new Bubble("Trophies", 0, 1, false, undefined)], []];
    }
}

module.exports = { BubbleService };