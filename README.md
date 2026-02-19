# 📱 Mobile Test Automation - Android

[![Android Test Automation](https://github.com/wbandara-tech/mobile-test-automation-android/actions/workflows/android-tests.yml/badge.svg)](https://github.com/wbandara-tech/mobile-test-automation-android/actions/workflows/android-tests.yml)
[![Allure Report](https://img.shields.io/badge/Allure-Report-orange?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHoiLz48L3N2Zz4=)](https://wbandara-tech.github.io/mobile-test-automation-android/)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![WebDriverIO](https://img.shields.io/badge/WebDriverIO-v9-EA5906?logo=webdriverio&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-v3-662D91?logo=appium&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

> Production-grade WebDriverIO + Appium mobile test automation framework for Android, following industry best practices with Page Object Model, W3C Actions API, Allure reporting, and CI/CD.

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| **GitHub Repository** | [wbandara-tech/mobile-test-automation-android](https://github.com/wbandara-tech/mobile-test-automation-android) |
| **Allure Report (GitHub Pages)** | [Live Report](https://wbandara-tech.github.io/mobile-test-automation-android/) |
| **CI/CD Pipeline** | [GitHub Actions](https://github.com/wbandara-tech/mobile-test-automation-android/actions) |
| **App Under Test** | [WDIO Demo App](https://github.com/webdriverio/native-demo-app) |

---

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **WebDriverIO** | v9.24.0 | Test runner & browser automation |
| **Appium** | v3.2.0 | Mobile automation server |
| **UiAutomator2** | v6.8.1 | Android automation driver |
| **Mocha** | Built-in | Test framework (BDD) |
| **Chai** | v6.2.2 | Assertion library |
| **Allure** | v2.36.0 | Test reporting |
| **GitHub Actions** | - | CI/CD pipeline |

---

## 📁 Project Structure

```
mobile-test-automation-android/
├── .github/
│   └── workflows/
│       └── android-tests.yml       # CI/CD pipeline
├── test/
│   ├── pageobjects/
│   │   ├── BasePage.js             # Abstract base class (W3C Actions, navigation)
│   │   └── DragScreen.js           # Drag & Drop puzzle page object
│   └── specs/
│       └── drag.spec.js            # Drag & Drop test suite
├── reports/
│   ├── allure-results/             # Raw Allure data
│   ├── allure-report/              # Generated HTML report
│   ├── screenshots/                # Failure screenshots
│   └── videos/                     # Test execution recordings
├── logs/                           # Appium server logs
├── wdio.conf.js                    # WebDriverIO configuration
├── package.json                    # Dependencies & scripts
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **Java JDK** >= 11
- **Android SDK** with emulator configured
- **Android Emulator** running (udid: `emulator-5554`)
- **WDIO Demo App** installed on the emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/wbandara-tech/mobile-test-automation-android.git
cd mobile-test-automation-android

# Install dependencies
npm install

# Install Appium UiAutomator2 driver
npm run appium:install
```

### Install the App Under Test

Download and install the [WDIO Demo App](https://github.com/webdriverio/native-demo-app/releases):

```bash
# Download the APK
curl -LO https://github.com/webdriverio/native-demo-app/releases/latest/download/android.wdio.native.app.v1.0.8.apk

# Install on emulator
adb install android.wdio.native.app.v1.0.8.apk
```

---

## 🧪 Running Tests

```bash
# Run all tests (headed mode on emulator)
npm test

# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression
```

### Test Results

```
WDIO Demo App - Drag & Drop Puzzle
  ✔ should navigate to the Drag tab
  ✔ should drag all 9 pieces to their drop zones
  ✔ should verify puzzle completion
  ✔ should navigate back to Home tab

4 passing (19s)
Spec Files: 1 passed, 1 total (100% completed)
```

---

## 📊 Allure Reporting

```bash
# Generate report (auto-runs after tests)
npm run report:generate

# Open report in browser
npm run report:open

# Generate + open in one command
npm run report
```

**Live Report:** [https://wbandara-tech.github.io/mobile-test-automation-android/](https://wbandara-tech.github.io/mobile-test-automation-android/)

Reports include:
- Test execution summary with pass/fail rates
- Step-by-step test execution timeline
- Screenshots on failure (auto-captured)
- Environment & device information

---

## 🎥 Test Execution Video Recording

Every CI run automatically records the Android emulator screen during test execution.

### How It Works

- The CI pipeline starts `adb screenrecord` before tests run
- The emulator screen is recorded in **720x1280** resolution at **2 Mbps**
- After tests complete, the recording is pulled from the device and uploaded as a CI artifact
- Videos are retained for **30 days**

### Accessing Recordings

1. Go to the [GitHub Actions](https://github.com/wbandara-tech/mobile-test-automation-android/actions) page
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download **test-execution-video**

### Local Video Recording

To record test execution locally:

```bash
# Start recording in background (max 3 minutes per segment)
adb shell screenrecord /sdcard/test_run.mp4 &

# Run tests
npm test

# Stop recording
adb shell pkill -f screenrecord

# Pull video from device
adb pull /sdcard/test_run.mp4 reports/videos/
```

> **Note:** `adb screenrecord` has a 3-minute limit per recording. For longer test runs, the CI pipeline handles this automatically.

---

## 🏛️ Architecture & Design Patterns

### Page Object Model (POM)

```
BasePage (Abstract)
├── W3C Pointer Actions: tap(), swipe(), longPress(), doubleTap()
├── Wait Strategies: waitForDisplayed(), waitForExist(), waitForEnabled()
├── Navigation: navigateToHome(), navigateToDrag(), navigateToLogin()...
├── Element Actions: click(), setValue(), getText()
└── Device Actions: pressBack(), hideKeyboard(), takeScreenshot()

DragScreen (extends BasePage)
├── Drag Methods: dragPieceL1() through dragPieceR3() (9 pieces)
├── Verification: tapToVerifyResult(), tapToConfirm()
└── Full Flow: dragAllPiecesToDropZones()
```

### W3C Actions API

All touch interactions use the **W3C Actions API** for maximum reliability:

```javascript
// Tap at coordinates
async tap(x, y, pause = 50) {
    await browser.action('pointer')
        .move({ duration: 0, x, y })
        .down({ button: 0 })
        .pause(pause)
        .up({ button: 0 })
        .perform();
}

// Swipe / Drag gesture
async swipe(startX, startY, endX, endY, duration = 1000) {
    await browser.action('pointer')
        .move({ duration: 0, x: startX, y: startY })
        .down({ button: 0 })
        .move({ duration, x: endX, y: endY })
        .up({ button: 0 })
        .perform();
}
```

---

## ⚙️ CI/CD Pipeline

The project includes a **GitHub Actions** workflow that:

1. **Triggers on:** Push to `main`/`develop`, Pull Requests to `main`, Manual dispatch
2. **Sets up:** Node.js 20, Java 17, Android SDK, Android Emulator (headless)
3. **Installs:** WDIO Demo App APK on emulator
4. **Records:** Screen recording of test execution via `adb screenrecord`
5. **Runs:** Full test suite
6. **Generates:** Allure report with detailed results
7. **Uploads:** Test artifacts (results, report, screenshots, execution video)
8. **Deploys:** Allure report to GitHub Pages (on `main` branch)

**Pipeline Status:** [![CI](https://github.com/wbandara-tech/mobile-test-automation-android/actions/workflows/android-tests.yml/badge.svg)](https://github.com/wbandara-tech/mobile-test-automation-android/actions/workflows/android-tests.yml)

---

## 📋 Available NPM Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all test specs |
| `npm run test:smoke` | Run smoke test suite |
| `npm run test:regression` | Run regression test suite |
| `npm run test:sanity` | Run sanity test suite |
| `npm run report:generate` | Generate Allure HTML report |
| `npm run report:open` | Open Allure report in browser |
| `npm run report` | Generate + open Allure report |
| `npm run clean` | Clean reports, screenshots & logs |
| `npm run appium:install` | Install UiAutomator2 driver |
| `npm run appium:doctor` | Verify Appium environment setup |

---

## 🔧 Configuration

### Device Capabilities (`wdio.conf.js`)

```javascript
{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:udid': 'emulator-5554',
    'appium:appPackage': 'com.wdiodemoapp',
    'appium:appActivity': 'com.wdiodemoapp.MainActivity',
    'appium:noReset': true,
}
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_LEVEL` | `info` | WDIO log level |
| `RETRIES` | `0` | Test retry count |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-screen`)
3. Add page objects in `test/pageobjects/`
4. Add test specs in `test/specs/`
5. Run tests locally to verify
6. Commit your changes (`git commit -m 'feat: add login screen tests'`)
7. Push to the branch (`git push origin feature/new-screen`)
8. Open a Pull Request

---

## 👤 Author

**wbandara-tech** — [GitHub Profile](https://github.com/wbandara-tech)

---

## 📄 License

This project is licensed under the **ISC License**.
