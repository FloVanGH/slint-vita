let slint = require("slint-ui");

class BubbleController {
    constructor(service, window) {
        this.service = service;

        var bubbles = service.bubbles;

        // let pages = {
        //     rowCount() { return bubbles.length; },
        //     rowData(row) { return bubbles[row]; },
        //     setRowData(row, data) { bubbles[row] = data; this.notify.rowDataChanged(row); },
        // };

        console.log(bubbles.length);

        let model = new slint.ArrayModel([]);
        bubbles.forEach(page => {
            let pageModel = [];

            console.log(page.length);

            page.forEach(bubble => {
                pageModel.push({
                    title: bubble.title,
                    row: bubble.row,
                    column: bubble.column,
                    filler: bubble.filler,
                    icon: bubble.icon
                });
            });

            model.push(pageModel);
        });
        console.log(model);

        window.bubbles = model;
    }
}

module.exports = { BubbleController };