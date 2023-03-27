import { BubbleService } from "../services/bubble_service";
import { AppWindow, slint } from "node-ui";

export class BubbleController {
    private _service: BubbleService;

    constructor(service: BubbleService, window: AppWindow) {
        this._service = service;
        window.bubbles = new slint.ArrayModel(service.bubbles);
    }
}
