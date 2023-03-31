// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type Game } from "../../data/game";

export interface TrophyService {
    get games(): Game[];
}
