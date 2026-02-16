/**
 * BasePage - Abstract base class for all Page Objects.
 *
 * WDIO Demo App (com.wdiodemoapp) - Base class.
 * Uses W3C Actions API (pointer actions) for taps and swipes.
 */
class BasePage {

    constructor() {
        this.defaultTimeout = 30000;
    }

    // ========================
    // Bottom Navigation Bar
    // (Uses coordinate taps matching WDIO Demo App layout on 1080-wide display)
    // Coordinates derived from XML page source bounds:
    //   Home [0,2214][180,2351]     center(90,2282)
    //   Webview [180,2214][360,2351] center(270,2282)
    //   Login [360,2214][540,2351]   center(450,2282)
    //   Forms [540,2214][720,2351]   center(630,2282)
    //   Swipe [720,2214][900,2351]   center(810,2282)
    //   Drag [900,2214][1080,2351]   center(990,2282)
    // ========================

    async navigateToHome()    { await this.tap(90, 2282); }
    async navigateToWebview() { await this.tap(270, 2282); }
    async navigateToLogin()   { await this.tap(450, 2282); }
    async navigateToForms()   { await this.tap(630, 2282); }
    async navigateToSwipe()   { await this.tap(810, 2282); }
    async navigateToDrag()    { await this.tap(990, 2282); }

    // ========================
    // Pointer Actions (W3C)
    // ========================

    /**
     * Tap at specific coordinates using W3C pointer action
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} pause - Pause duration in ms (default: 50)
     */
    async tap(x, y, pause = 50) {
        await browser.action('pointer')
            .move({ duration: 0, x, y })
            .down({ button: 0 })
            .pause(pause)
            .up({ button: 0 })
            .perform();
    }

    /**
     * Swipe from one point to another using W3C pointer action
     * @param {number} startX - Start X coordinate
     * @param {number} startY - Start Y coordinate
     * @param {number} endX - End X coordinate
     * @param {number} endY - End Y coordinate
     * @param {number} duration - Swipe duration in ms (default: 1000)
     */
    async swipe(startX, startY, endX, endY, duration = 1000) {
        await browser.action('pointer')
            .move({ duration: 0, x: startX, y: startY })
            .down({ button: 0 })
            .move({ duration, x: endX, y: endY })
            .up({ button: 0 })
            .perform();
    }

    /**
     * Long press at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} duration - Press duration in ms (default: 2000)
     */
    async longPress(x, y, duration = 2000) {
        await browser.action('pointer')
            .move({ duration: 0, x, y })
            .down({ button: 0 })
            .pause(duration)
            .up({ button: 0 })
            .perform();
    }

    /**
     * Double tap at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    async doubleTap(x, y) {
        await this.tap(x, y);
        await browser.pause(100);
        await this.tap(x, y);
    }

    // ========================
    // Wait Strategies
    // ========================

    /**
     * Wait for an element to be displayed
     */
    async waitForDisplayed(element, timeout = this.defaultTimeout) {
        await element.waitForDisplayed({
            timeout,
            timeoutMsg: `Element not displayed after ${timeout}ms: ${element.selector}`,
        });
    }

    /**
     * Wait for an element to exist in the DOM
     */
    async waitForExist(element, timeout = this.defaultTimeout) {
        await element.waitForExist({
            timeout,
            timeoutMsg: `Element does not exist after ${timeout}ms: ${element.selector}`,
        });
    }

    /**
     * Wait for an element to be enabled
     */
    async waitForEnabled(element, timeout = this.defaultTimeout) {
        await element.waitForEnabled({
            timeout,
            timeoutMsg: `Element not enabled after ${timeout}ms: ${element.selector}`,
        });
    }

    /**
     * Wait for the page to fully load (override in subclasses)
     */
    async waitForPageLoad() {
        await browser.pause(1000);
    }

    // ========================
    // Element Actions
    // ========================

    /**
     * Click an element with wait
     */
    async click(element) {
        await this.waitForDisplayed(element);
        await element.click();
    }

    /**
     * Set value in an input field (clears first)
     */
    async setValue(element, value) {
        await this.waitForDisplayed(element);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Get text from an element
     */
    async getText(element) {
        await this.waitForDisplayed(element);
        return element.getText();
    }

    /**
     * Get attribute value from an element
     */
    async getAttribute(element, attribute) {
        await this.waitForExist(element);
        return element.getAttribute(attribute);
    }

    /**
     * Check if element is displayed
     */
    async isDisplayed(element) {
        try {
            await element.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // ========================
    // Device Actions
    // ========================

    /**
     * Press the Android back button
     */
    async pressBack() {
        await browser.back();
    }

    /**
     * Hide the keyboard if visible
     */
    async hideKeyboard() {
        try {
            if (await browser.isKeyboardShown()) {
                await browser.hideKeyboard();
            }
        } catch {
            // Keyboard was not shown
        }
    }

    /**
     * Take a screenshot
     */
    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}_${timestamp}`;
        await browser.saveScreenshot(`./reports/screenshots/${filename}.png`);
        return filename;
    }

    /**
     * Pause execution
     * @param {number} ms - Milliseconds to pause
     */
    async pause(ms) {
        await browser.pause(ms);
    }

    // ========================
    // Android Selectors
    // ========================

    byId(resourceId) {
        return $(`android=new UiSelector().resourceId("${resourceId}")`);
    }

    byText(text) {
        return $(`android=new UiSelector().text("${text}")`);
    }

    byAccessibilityId(desc) {
        return $(`~${desc}`);
    }

    byContainsText(text) {
        return $(`android=new UiSelector().textContains("${text}")`);
    }

    byXPath(xpath) {
        return $(xpath);
    }
}

module.exports = BasePage;
