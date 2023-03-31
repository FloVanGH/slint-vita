// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
} from "psn-api";
import { Game } from "../data/game";
import type * as trophy from "./interfaces/trophy_service";

export class TrophyService implements trophy.TrophyService {
    private readonly _games: Game[] = [];

    public async init(psnKey: string): Promise<void> {
        const accessCode = await exchangeNpssoForCode(psnKey);
        const authorization = await exchangeCodeForAccessToken(accessCode);
        const trophyTitlesResponse = await getUserTitles(
            { accessToken: authorization.accessToken },
            "me"
        );

        trophyTitlesResponse.trophyTitles.forEach((t) => {
            this._games.push(new Game(t.trophyTitleName));
        });
    }

    get games(): Game[] {
        return this._games;
    }
}
