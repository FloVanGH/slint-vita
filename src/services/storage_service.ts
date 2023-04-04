// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import type * as storage from "./interfaces/storage_service";
import fs from "fs";

const linux = "/.config/vita";
const win = "/AppData/Roaming/vita";
const macos = "/Library/Application Support/vita";

export class StorageService implements storage.StorageService {
    private readonly _configPath: string | undefined = undefined;

    constructor() {
        this._configPath = configPath();
    }

    public save(key: string, content: object): void {
        if (this._configPath === undefined) {
            return;
        }

        const filePath = this._configPath + "/" + key + ".json";

        fs.writeFileSync(filePath, JSON.stringify(content));
    }

    public load<Type extends object>(key: string): Type | undefined {
        if (this._configPath === undefined) {
            return undefined;
        }
        const filePath = this._configPath + "/" + key + ".json";

        if (!fs.existsSync(filePath)) {
            return undefined;
        }

        const content = fs.readFileSync(filePath);

        if (content === undefined || content === null) {
            return undefined;
        }

        return JSON.parse(content.toString());
    }
}

function configPath(): string | undefined {
    if (process.env.HOME === undefined) {
        return undefined;
    }

    let configPath = process.env.HOME;

    switch (process.platform) {
        case "darwin":
            configPath += macos;
            break;
        case "win32":
            configPath += win;
            break;
        case "linux":
            configPath += linux;
            break;
    }

    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configPath, { recursive: true });
    }

    return configPath;
}
