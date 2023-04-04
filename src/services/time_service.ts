// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import type * as time from "./interfaces/time_service";

export class TimeService implements time.TimeService {
    get currentTime(): string {
        const dataTime = new Date();
        const hours =
            dataTime.getHours() < 10
                ? "0" + dataTime.getHours().toString()
                : dataTime.getHours().toString();

        const minutes =
            dataTime.getMinutes() < 10
                ? "0" + dataTime.getMinutes().toString()
                : dataTime.getMinutes().toString();

        return hours + ":" + minutes;
    }
}
