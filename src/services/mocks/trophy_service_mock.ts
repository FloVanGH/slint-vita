// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { Game } from "../../data/game";
import { type TrophyService } from "../interfaces/trophy_service";

export class TrophyServiceMock implements TrophyService {
    private readonly _games: Game[] = [
        new Game("The Last of Us"),
        new Game("Gravity Rush"),
    ];

    get games(): Game[] {
        return this._games;
    }
}
