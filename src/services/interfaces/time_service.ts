// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

export interface TimeService {
    currentTime: string;
    bindCurrentTimeChanged: (callback: (currentTime: string) => void) => void;
}
