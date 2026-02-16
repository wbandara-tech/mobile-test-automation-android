const DragScreen = require('../pageobjects/DragScreen');

/**
 * WDIO Demo App - Drag & Drop Puzzle Test
 *
 * App: com.wdiodemoapp
 * Screen: Drag tab
 *
 * Test Flow:
 *   1. Navigate to the Drag tab from bottom nav
 *   2. Drag all 9 puzzle pieces to their drop zones
 *   3. Verify puzzle completion
 *   4. Navigate back to Home tab
 */
describe('WDIO Demo App - Drag & Drop Puzzle', () => {

    before(async () => {
        // Wait for app to fully load
        await browser.pause(2000);
    });

    it('should navigate to the Drag tab', async () => {
        await DragScreen.navigateToDrag();
        await browser.pause(1000);
    });

    it('should drag all 9 pieces to their drop zones', async () => {
        // Row 1 pieces
        await DragScreen.dragPieceL1();
        await browser.pause(300);

        await DragScreen.dragPieceC1();
        await browser.pause(300);

        await DragScreen.dragPieceR1();
        await browser.pause(300);

        // Row 2 pieces
        await DragScreen.dragPieceL2();
        await browser.pause(300);

        await DragScreen.dragPieceC2();
        await browser.pause(300);

        await DragScreen.dragPieceR2();
        await browser.pause(300);

        // Row 3 pieces
        await DragScreen.dragPieceL3();
        await browser.pause(300);

        await DragScreen.dragPieceC3();
        await browser.pause(300);

        await DragScreen.dragPieceR3();
        await browser.pause(500);
    });

    it('should verify puzzle completion', async () => {
        await DragScreen.tapToVerifyResult();
        await browser.pause(300);

        await DragScreen.tapToConfirm();
        await browser.pause(300);
    });

    it('should navigate back to Home tab', async () => {
        await DragScreen.navigateToHome();
        await browser.pause(500);
    });
});
