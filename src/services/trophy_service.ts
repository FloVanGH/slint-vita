// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
    getUserTrophiesEarnedForTitle,
    type AuthorizationPayload,
    getTitleTrophies,
    TrophyRarity,
} from "psn-api";
import { List, ListItem } from "../data/list";
import { type ListService } from "./interfaces/list_service";
import { fa_var_trophy } from "../assets/icons";

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
            let npCommunicationId = "";

            if (t.npCommunicationId !== undefined) {
                npCommunicationId = t.npCommunicationId;
            }

            const listItem = new ListItem(
                t.trophyTitleName,
                t.progress.toString() + "%",
                npCommunicationId
            );

            listItem.has_details = true;

            trophyTitlesList.push(listItem);

            responses.push(
                this.addTrophies(
                    authorization,
                    npCommunicationId,
                    t.npServiceName,
                    t.trophyTitleName,
                    t.trophyTitlePlatform
                )
            );
        });

        trophyTitlesList.title = "Trophies";

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
        npServiceName: "trophy" | "trophy2",
        title: string,
        platform: string | undefined
    ): Promise<void> {
        const trophiesList = new List();
        trophiesList.title = title;

        if (platform !== undefined) {
            trophiesList.subTitle = platform;
        }

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
            let title = "";
            let description = "";

            if (t.trophyName !== undefined) {
                title = t.trophyName;
            }

            if (t.trophyDetail !== undefined) {
                description = t.trophyDetail;
            }

            const listItem = new ListItem(
                title,
                description,
                t.trophyId.toString()
            );

            listItem.icon = fa_var_trophy;
            const userTrophy = userTrophies.trophies.find(
                (u) => u.trophyId === t.trophyId
            );

            if (userTrophy !== undefined) {
                let trophyEarnedRate = "";

                if (userTrophy.trophyEarnedRate !== undefined) {
                    trophyEarnedRate = userTrophy.trophyEarnedRate + "%";
                }

                let trophyRare = "";
                let earnedDate = "";

                if (userTrophy.trophyRare !== undefined) {
                    switch (userTrophy.trophyRare) {
                        case TrophyRarity.Common: {
                            trophyRare = "Common";
                            break;
                        }
                        case TrophyRarity.Rare: {
                            trophyRare = "Rare";
                            break;
                        }
                        case TrophyRarity.VeryRare: {
                            trophyRare = "Very rare";
                            break;
                        }
                        case TrophyRarity.UltraRare: {
                            trophyRare = "Ultra rare";
                            break;
                        }
                    }

                    if (userTrophy.earned === false && t.trophyHidden) {
                        listItem.title = "Hidden";
                        listItem.description = "---";
                    }

                    if (userTrophy.earned !== true) {
                        listItem.decent = true;
                    }

                    if (userTrophy.earnedDateTime !== undefined) {
                        earnedDate = " earned: " + userTrophy.earnedDateTime;
                    }
                }

                listItem.additional_description =
                    trophyRare +
                    " " +
                    trophyEarnedRate +
                    earnedDate.replace("T", " ").replace("Z", " ");
            }

            switch (t.trophyType) {
                case "bronze": {
                    listItem.icon_color = "#be6b39";
                    break;
                }
                case "silver": {
                    listItem.icon_color = "#aeacaf";
                    break;
                }
                case "gold": {
                    listItem.icon_color = "#d9b26d";
                    break;
                }
                case "platinum": {
                    listItem.icon_color = "#2f4a68";
                    break;
                }
            }

            trophiesList.push(listItem);
        });

        this._trophies.set(npCommunicationId, trophiesList);
    }

    public detailsItems(id: string): List | undefined {
        return this._trophies.get(id);
    }

    readonly background = "#000000";
}
