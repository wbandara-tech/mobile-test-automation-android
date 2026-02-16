const path = require('path');
const allure = require('allure-commandline');
require('dotenv').config();

const androidCaps = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:udid': 'emulator-5554',
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': 'com.wdiodemoapp.MainActivity',
    'appium:autoGrantPermissions': true,
    'appium:noReset': true,
    'appium:newCommandTimeout': 300,
};

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    port: 4723,

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.spec.js'
    ],

    // Patterns to exclude
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        ...androidCaps,
        maxInstances: 1,
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: process.env.LOG_LEVEL || 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    //
    // ===================
    // Appium Service
    // ===================
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
                log: './logs/appium.log',
            },
            command: 'appium',
        }]
    ],

    //
    // ===========
    // Framework
    // ===========
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
        retries: process.env.RETRIES ? parseInt(process.env.RETRIES) : 0,
    },

    //
    // ===========
    // Reporters
    // ===========
    reporters: [
        'spec',
        ['allure', {
            outputDir: './reports/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false,
        }],
    ],

    //
    // =====
    // Hooks
    // =====
    onPrepare: function (config, capabilities) {
        console.log('========================================');
        console.log('  Mobile Test Automation - Android');
        console.log('  Starting test execution...');
        console.log('========================================');
    },

    beforeSession: function (config, capabilities, specs, cid) {
        // Set up session-level configuration
    },

    before: function (capabilities, specs) {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
    },

    beforeTest: function (test, context) {
        console.log(`\n>> Running: ${test.parent} - ${test.title}`);
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Take screenshot on failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotName = `FAIL_${test.title.replace(/\s+/g, '_')}_${timestamp}`;
            try {
                await browser.saveScreenshot(`./reports/screenshots/${screenshotName}.png`);
                console.log(`  Screenshot saved: ${screenshotName}.png`);
            } catch (err) {
                console.error('  Failed to capture screenshot:', err.message);
            }
        }
    },

    afterSession: function (config, capabilities, specs) {
        // Clean up session
    },

    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', './reports/allure-results', '--clean', '-o', './reports/allure-report']);

        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 10000);

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }

                console.log('\n========================================');
                console.log('  Allure report generated successfully!');
                console.log('  Open: ./reports/allure-report/index.html');
                console.log('========================================');
                resolve();
            });
        });
    },
};
