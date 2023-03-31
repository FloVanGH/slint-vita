// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
    getUserTrophiesEarnedForTitle,
    type AuthorizationPayload,
    getTitleTrophies,
} from "psn-api";
import { List, ListItem } from "../data/list";
import { type ListService } from "./interfaces/list_service";

export class TrophyService implements ListService {
    private readonly _trophies = new Map<string, List>();

    public async init(psnKey: string): Promise<void> {
        const accessCode = await exchangeNpssoForCode(psnKey);
        const authorization = await exchangeCodeForAccessToken(accessCode);
        const trophyTitlesResponse = await getUserTitles(
            { accessToken: authorization.accessToken },
            "me"
        );

        const responses: Array<Promise<void>> = [];
        const trophyTitlesList = new List();
        trophyTitlesResponse.trophyTitles.forEach((t) => {
            trophyTitlesList.push(
                new ListItem(
                    t.trophyTitleName,
                    t.progress.toString() + "%",
                    (t.npCommunicationId ??= "")
                )
            );

            responses.push(
                this.addTrophies(
                    authorization,
                    t.npCommunicationId,
                    t.npServiceName
                )
            );
        });

        this._trophies.set("main", trophyTitlesList);
        await Promise.all(responses);
    }

    get masterItems(): List {
        const masterList = this._trophies.get("main");

        if (masterList !== undefined) {
            return masterList;
        }

        return new List();
    }

    private async addTrophies(
        authorization: AuthorizationPayload,
        npCommunicationId: string,
        npServiceName: "trophy" | "trophy2"
    ): Promise<void> {
        const trophiesList = new List();

        const titleTrophies = await getTitleTrophies(
            authorization,
            npCommunicationId,
            "all",
            { npServiceName }
        );

        const userTrophies = await getUserTrophiesEarnedForTitle(
            authorization,
            "me",
            npCommunicationId,
            "all",
            { npServiceName }
        );

        titleTrophies.trophies.forEach((t) => {
            trophiesList.push(
                new ListItem(
                    ((t.trophyName ??= ""),
                    (t.trophyDetail ??= ""),
                    t.trophyId.toString())
                )
            );
        });

        this._trophies.set(npCommunicationId, trophiesList);
    }

    public detailsItems(id: string): List | undefined {
        return this._trophies.get(id);
    }

    readonly title = "Trophies";
    readonly background = "#000000";
}
