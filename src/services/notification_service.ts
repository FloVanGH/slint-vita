// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type NotificationMessage } from "../data/notification";
import type * as notification from "./interfaces/notification_service";

export class NotificationService implements notification.NotificationService {
    private readonly _notifications: NotificationMessage[] = [];
    private readonly _callbacks: Array<
        (notification: NotificationMessage) => void
    > = [];

    add(notification: NotificationMessage): void {
        this._notifications.unshift(notification);

        this._callbacks.forEach((c) => {
            c(notification);
        });
    }

    clear(): void {
        this._notifications.splice(0);
    }

    onNotification(
        callback: (notification: NotificationMessage) => void
    ): void {
        this._callbacks.push(callback);
    }

    get notifications(): NotificationMessage[] {
        return this._notifications;
    }
}
