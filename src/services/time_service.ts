// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import type * as time from "./interfaces/time_service";
import { slint } from "../../ui-import";

export class TimeService implements time.TimeService {
    private readonly _callbacks: Array<(currentTime: string) => void> = [];

    constructor() {
        slint.Timer.singleShot(500, this.update);
    }

    bindCurrentTimeChanged(callback: (currentTime: string) => void): void {
        this._callbacks.push(callback);
    }

    update = (): void => {
        const dataTime = new Date();
        const hours =
            dataTime.getHours() < 10
                ? "0" + dataTime.getHours().toString()
                : dataTime.getHours().toString();
        const minutes =
            dataTime.getMinutes() < 10
                ? "0" + dataTime.getMinutes().toString()
                : dataTime.getMinutes().toString();
        this.currentTime = hours + ":" + minutes;

        this._callbacks.forEach((c) => {
            c(this.currentTime);
        });

        slint.Timer.singleShot(500, this.update);
    };

    public currentTime: string;
}
