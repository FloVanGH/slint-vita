// SPDX-FileCopyrightText: 2022 Florian Blasius <co_sl@tutanota.com>
// SPDX-License-Identifier: MIT

import { type MainWindow, slint } from "../../ui-import";
import { type Bubble } from "../data/bubble";
import { type AppService } from "../services/interfaces/app_service";
import { type BubbleService } from "../services/interfaces/bubble_service";

enum Direction {
    Left,
    Right,
    Up,
    Down,
}

export class LauncherController {
    private readonly _appService: AppService;
    private readonly _bubbleService: BubbleService;
    private readonly _mainWindow: MainWindow;
    private _selectedBubble?: Bubble;

    constructor(
        bubbleService: BubbleService,
        appService: AppService,
        mainWindow: MainWindow
    ) {
        this._bubbleService = bubbleService;
        this._appService = appService;
        this._mainWindow = mainWindow;
        this._selectedBubble = undefined;
    }

    public init(): void {
        this.initBubbles();
        this.initPages();
        this.setHandlers();
    }

    private initBubbles(): void {
        const bubbles = new slint.ArrayModel([]);

        this._bubbleService.bubbles.forEach((p) => {
            bubbles.push(new slint.ArrayModel(p));
        });

        this._mainWindow.launcher_bubbles = bubbles;
    }

    private initPages(): void {
        // initial don't show pages
        this._mainWindow.launcher_pages = new slint.ArrayModel([]);
    }

    private setHandlers(): void {
        this._mainWindow.launcher_move_selection_left.setHandler(
            this.moveSelectionLeft
        );
        this._mainWindow.launcher_move_selection_right.setHandler(
            this.moveSelectionRight
        );
        this._mainWindow.launcher_move_selection_up.setHandler(
            this.moveSelectionUp
        );
        this._mainWindow.launcher_move_selection_down.setHandler(
            this.moveSelectionDown
        );
        this._mainWindow.launcher_clear_selection.setHandler(
            this.doClearSelection
        );
        this._mainWindow.launcher_open_page.setHandler(this.openPage);
        this._mainWindow.launcher_close_current_page.setHandler(
            this.closeCurrentPage
        );
        this._mainWindow.launcher_move_left.setHandler(this.moveLeft);
        this._mainWindow.launcher_move_right.setHandler(this.moveRight);
        this._mainWindow.launcher_on_enter.setHandler(this.onEnter);
    }

    private clearSelection(): void {
        if (this._selectedBubble === undefined) {
            return;
        }

        const currentPage = this._mainWindow.launcher_current_bubble_page;

        if (currentPage < 0 || currentPage >= this._bubbleService.pageCount) {
            return;
        }

        const index = this._bubbleService.bubbles[currentPage].indexOf(
            this._selectedBubble
        );
        this._selectedBubble.selected = false;

        this._mainWindow.launcher_bubbles
            .rowData(currentPage)
            .setRowData(index, this._selectedBubble);

        this._selectedBubble = undefined;
    }

    private select(bubble?: Bubble): boolean {
        if (bubble === undefined || this._selectedBubble === bubble) {
            return false;
        }

        this.clearSelection();

        const currentPage = this._mainWindow.launcher_current_bubble_page;

        if (currentPage < 0 || currentPage >= this._bubbleService.pageCount) {
            return false;
        }

        const index = this._bubbleService.bubbles[currentPage].indexOf(bubble);
        bubble.selected = true;
        this._selectedBubble = bubble;
        this._mainWindow.launcher_bubbles
            .rowData(currentPage)
            .setRowData(index, this._selectedBubble);

        return true;
    }

    private showPreviousBubblePage(): void {
        const currentPage = this._mainWindow.launcher_current_bubble_page;

        if (currentPage > 0) {
            this._mainWindow.launcher_current_bubble_page -= 1;
        }
    }

    private showNextBubblePage(): void {
        const pagesCount = this._mainWindow.launcher_bubbles.length;
        const currentPage = this._mainWindow.launcher_current_bubble_page;

        if (currentPage < pagesCount - 1) {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this._mainWindow.launcher_current_bubble_page += 1;
        }
    }

    private moveSelection(direction: Direction): void {
        const currentPage = this.currentBubblePage;

        if (currentPage === undefined) {
            return;
        }

        if (this._selectedBubble === undefined) {
            // select the first bubble of the page.
            this.select(currentPage[0]);
            return;
        }

        if (this._selectedBubble === undefined) {
            return;
        }

        const currentRow = this._selectedBubble.row;
        const currentColumn = this._selectedBubble.column;

        switch (direction) {
            case Direction.Left: {
                this.select(
                    currentPage
                        .filter((b) => b.row === currentRow)
                        .reverse()
                        .find((b) => b.column < currentColumn)
                );
                break;
            }
            case Direction.Right: {
                this.select(
                    currentPage
                        .filter((b) => b.row === currentRow)
                        .find((b) => b.column > currentColumn)
                );
                break;
            }
            case Direction.Up: {
                if (
                    !this.select(
                        currentPage
                            .filter((b) => b.column <= currentColumn)
                            .reverse()
                            .find((b) => b.row < currentRow)
                    )
                ) {
                    this.clearSelection();
                    this.showPreviousBubblePage();
                    const currentPage = this.currentBubblePage;

                    if (currentPage !== undefined) {
                        this.select(
                            currentPage
                                .filter((b) => b.column <= currentColumn)
                                .reverse()
                                .find((b) => b.row <= 2)
                        );
                    }
                }
                break;
            }
            case Direction.Down: {
                let nextRow = currentRow + 1;

                for (let i = nextRow; i < 2; i++) {
                    if (
                        currentPage.find((b) => b.row === nextRow) !== undefined
                    ) {
                        break;
                    }

                    nextRow += 1;
                }

                if (
                    !this.select(
                        currentPage
                            .filter((b) => b.row === nextRow)
                            .reverse()
                            .find((b) => b.column <= currentColumn)
                    )
                ) {
                    this.clearSelection();
                    this.showNextBubblePage();
                    const currentPage = this.currentBubblePage;

                    if (currentPage !== undefined) {
                        this.select(
                            currentPage
                                .filter((b) => b.column >= currentColumn)
                                .find((b) => b.row >= 0)
                        );
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    private get currentBubblePage(): Bubble[] | undefined {
        return this._bubbleService.bubbles[
            this._mainWindow.launcher_current_bubble_page
        ];
    }

    moveSelectionLeft = (): void => {
        this.moveSelection(Direction.Left);
    };

    moveSelectionRight = (): void => {
        this.moveSelection(Direction.Right);
    };

    moveSelectionUp = (): void => {
        this.moveSelection(Direction.Up);
    };

    moveSelectionDown = (): void => {
        this.moveSelection(Direction.Down);
    };

    doClearSelection = (): void => {
        this.clearSelection();
    };

    openPage = (key: string): void => {
        for (const page of this._mainWindow.launcher_pages.entries()) {
            if (page[1].title === key) {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                this._mainWindow.launcher_current_page = page[0] + 1;
                return;
            }
        }

        const page = this._appService.pages.find((p) => p.title === key);

        if (page === undefined) {
            return;
        }

        this._mainWindow.launcher_pages.push(page);

        // it's ok to use length instead of length -1 because there is also the bubble page
        this._mainWindow.launcher_current_page =
            this._mainWindow.launcher_pages.length;
        this.clearSelection();
    };

    closeCurrentPage = (): void => {
        if (this._mainWindow.launcher_current_page <= 0) {
            return;
        }

        this.moveLeft();
        console.log(this._mainWindow.launcher_current_page);
        this._mainWindow.launcher_pages.remove(
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this._mainWindow.launcher_current_page,
            1
        );
    };

    moveLeft = (): void => {
        if (this._mainWindow.launcher_current_page > 0) {
            this._mainWindow.launcher_current_page -= 1;
        }
    };

    moveRight = (): void => {
        if (
            this._mainWindow.launcher_current_page <
            this._mainWindow.launcher_pages.length
        ) {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this._mainWindow.launcher_current_page += 1;
        }
    };

    onEnter = (): void => {
        if (this._selectedBubble === undefined) {
            return;
        }

        this.openPage(this._selectedBubble.title);
    };
}
