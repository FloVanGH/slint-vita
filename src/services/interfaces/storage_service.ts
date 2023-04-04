// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

export interface StorageService {
    save: (key: string, content: object) => void;
    load: <Type extends object>(key: string) => Type | undefined;
}
