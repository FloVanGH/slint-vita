let slint = require("slint-ui");

class BubbleController {
    constructor(service, window) {
        this.service = service;
        window.bubbles = new slint.ArrayModel(service.bubbles);
    }
}

module.exports = { BubbleController };