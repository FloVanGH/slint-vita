// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type NotificationMessage } from "../../data/notification";

export interface NotificationService {
    add: (notification: NotificationMessage) => void;
    clear: () => void;
    onNotification: (
        callback: (notifications: NotificationMessage) => void
    ) => void;
    notifications: NotificationMessage[];
}
