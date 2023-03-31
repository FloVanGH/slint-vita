// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
} from "psn-api";
import { type Game } from "../data/game";
import type * as trophy from "./interfaces/trophy_service";

export class TrophyService implements trophy.TrophyService {
    private readonly _games: Game[];

    public async init(psnKey: string): Promise<void> {
        const accessCode = await exchangeNpssoForCode(psnKey);
        const authorization = await exchangeCodeForAccessToken(accessCode);
        const trophyTitlesResponse = await getUserTitles(
            { accessToken: authorization.accessToken },
            "me"
        );
    }

    get games(): Game[] {
        throw new Error("Method not implemented.");
    }
}
