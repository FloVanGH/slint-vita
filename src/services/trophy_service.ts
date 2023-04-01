// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
} from "psn-api";
import { List, ListItem } from "../data/list";
import { type ListService } from "./interfaces/list_service";

export class TrophyService implements ListService {
    private readonly _listItems: List[] = [];

    public async init(psnKey: string): Promise<void> {
        const accessCode = await exchangeNpssoForCode(psnKey);
        const authorization = await exchangeCodeForAccessToken(accessCode);
        const trophyTitlesResponse = await getUserTitles(
            { accessToken: authorization.accessToken },
            "me"
        );

        const trophyTitlesList = new List();
        trophyTitlesResponse.trophyTitles.forEach((t) => {
            trophyTitlesList.push(new ListItem(t.trophyTitleName));
        });

        this._listItems.push(trophyTitlesList);
    }

    get listItems(): List[] {
        return this._listItems;
    }
}
