// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import {
    type TrophyTitle,
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
} from "psn-api";
import * as download from "image-downloader";

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
        const blub: Array<Promise<void>> = [];
        trophyTitlesResponse.trophyTitles.forEach((t) => {
            blub.push(this.addItem(t, trophyTitlesList));
        });

        await Promise.all(blub);

        this._listItems.push(trophyTitlesList);
    }

    private async addItem(title: TrophyTitle, list: List): Promise<void> {
        const options = {
            url: title.trophyTitleIconUrl,
            dest: "/Users/flovansl/vita/psn",
        };

        const result = await download.image(options);
        list.push(new ListItem(title.trophyTitleName, result.filename));
    }

    get listItems(): List[] {
        return this._listItems;
    }
}
