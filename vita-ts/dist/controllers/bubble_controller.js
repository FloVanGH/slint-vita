"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleController = void 0;
const node_ui_1 = require("node-ui");
class BubbleController {
    constructor(service, window) {
        this._service = service;
        window.bubbles = new node_ui_1.slint.ArrayModel(service.bubbles);
    }
}
exports.BubbleController = BubbleController;
//# sourceMappingURL=bubble_controller.js.map