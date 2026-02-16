const BasePage = require('./BasePage');

/**
 * DragScreen - Page Object for the WDIO Demo App "Drag" tab.
 *
 * App: com.wdiodemoapp
 * Screen: Drag (content-desc="Drag" in bottom nav)
 *
 * Flow:
 *   1. Navigate to Drag tab
 *   2. Drag 9 puzzle pieces from bottom to their drop zones on top
 *   3. Verify success message
 *   4. Navigate back to Home
 */
class DragScreen extends BasePage {

    // ========================
    // Drag Puzzle Pieces
    // ========================

    /**
     * Drag piece L1 (row 1, left) to its drop zone
     * Source: bottom-center → Target: top-center-left
     */
    async dragPieceL1() {
        await this.swipe(600, 1903, 549, 610);
    }

    /**
     * Drag piece C1 (row 1, center) to its drop zone
     * Source: bottom-left → Target: top-center
     */
    async dragPieceC1() {
        await this.swipe(372, 2085, 535, 810);
    }

    /**
     * Drag piece R1 (row 1, right) to its drop zone
     * Source: bottom-far-left → Target: top-left
     */
    async dragPieceR1() {
        await this.swipe(121, 1940, 340, 828);
    }

    /**
     * Drag piece L2 (row 2, left) to its drop zone
     * Source: bottom-right → Target: top-right
     */
    async dragPieceL2() {
        await this.swipe(963, 1908, 726, 833);
    }

    /**
     * Drag piece C2 (row 2, center) to its drop zone
     * Source: bottom-center-right → Target: center
     */
    async dragPieceC2() {
        await this.swipe(805, 1913, 521, 1052);
    }

    /**
     * Drag piece R2 (row 2, right) to its drop zone
     * Source: bottom-left → Target: center-right
     */
    async dragPieceR2() {
        await this.swipe(270, 1931, 782, 1052);
    }

    /**
     * Drag piece L3 (row 3, left) to its drop zone
     * Source: bottom-center-right → Target: center-left
     */
    async dragPieceL3() {
        await this.swipe(749, 2080, 316, 1061);
    }

    /**
     * Drag piece C3 (row 3, center) to its drop zone
     * Source: bottom-center → Target: top-right
     */
    async dragPieceC3() {
        await this.swipe(451, 1908, 735, 642);
    }

    /**
     * Drag piece R3 (row 3, right) to its drop zone
     * Source: bottom-center → Target: top-left
     */
    async dragPieceR3() {
        await this.swipe(507, 2085, 289, 642);
    }

    // ========================
    // Verification
    // ========================

    /**
     * Tap the center of the puzzle area to verify completion
     */
    async tapToVerifyResult() {
        await this.tap(517, 1559);
    }

    /**
     * Tap again to confirm / dismiss the success message
     */
    async tapToConfirm() {
        await this.tap(517, 1559);
    }

    // ========================
    // Full Drag Puzzle Flow
    // ========================

    /**
     * Drag all 9 puzzle pieces to their correct drop zones
     */
    async dragAllPiecesToDropZones() {
        await this.dragPieceL1();
        await this.pause(300);

        await this.dragPieceC1();
        await this.pause(300);

        await this.dragPieceR1();
        await this.pause(300);

        await this.dragPieceL2();
        await this.pause(300);

        await this.dragPieceC2();
        await this.pause(300);

        await this.dragPieceR2();
        await this.pause(300);

        await this.dragPieceL3();
        await this.pause(300);

        await this.dragPieceC3();
        await this.pause(300);

        await this.dragPieceR3();
        await this.pause(300);
    }
}

module.exports = new DragScreen();
