// SPDX-FileCopyrightText: 2023 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type NotificationService } from "../services/notification_service";

export class NotificationController {
    private readonly _notificationService: NotificationService;
    private readonly _mainWindow: MainWindow;

    constructor(
        notificationService: NotificationService,
        mainWindow: MainWindow
    ) {
        this._notificationService = notificationService;
        this._mainWindow = mainWindow;
    }

    public init(): void {
        this._notificationService.onNotification(this.showNotification);
    }

    showNotification = (notification: Notification): void => {
        this._mainWindow.recent_notification = notification;
        this._mainWindow.notification_show_recent = true;

        this._mainWindow.notifications =
            this._notificationService.notifications;

        slint.Timer.singleShot(5000, this.hideRecentNotification);
    };

    hideRecentNotification = (): void => {
        this._mainWindow.notification_show_recent = false;
    };
}
