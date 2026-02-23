<div align="center">

# 🛡️ Anti-Debugger Bypass

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)](https://google.com/chrome)
[![GitHub stars](https://img.shields.io/github/stars/mingnhat99/anti-debugger?style=social)](https://github.com/mingnhat99/anti-debugger/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/mingnhat99/anti-debugger?style=social)](https://github.com/mingnhat99/anti-debugger/network/members)
[![GitHub issues](https://img.shields.io/github/issues/mingnhat99/anti-debugger)](https://github.com/mingnhat99/anti-debugger/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*A powerful Chrome extension to bypass common anti-debugging scripts and DevTools traps.*

[Installation](#-installation) • [Features](#-features) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

## 📖 Overview

**Anti-Debugger Bypass** is a lightweight Google Chrome extension designed to neutralize common client-side JavaScript anti-debugging techniques. By injecting a script at `document_start`, this extension intercepts and neutralizes traps designed to crash or halt your browser's Developer Tools (DevTools).

Whether you're a security researcher, a penetration tester, or just trying to inspect elements without being interrupted by infinite `debugger` statements, this extension ensures a smooth debugging experience.

## ✨ Features

- 🛑 **Eval Debugger Block**: Intercepts and neutralizes `eval("debugger")`.
- 🛡️ **Safe Function Constructor**: Patches `window.Function` to prevent `Function("debugger")()` calls cleanly across multiple layers.
- ⏱️ **SetInterval Protection**: Blocks malicious loops using `setInterval` that execute `debugger` or `eval`.
- 🔗 **Redirect Prevention**: Prevents aggressive anti-debug scripts from redirecting `location.href` away from the current page.
- 📴 **Console Tamper Protection**: Temporarily disables console output clearing (`console.clear`) and timing checks during page load, restoring them automatically afterward.
- 🔐 **CSP Enforcement**: Uses a Content-Security-Policy meta tag to help neutralize inline `eval` payloads.

## 🚀 Installation

Since this extension is not currently on the Chrome Web Store, you can easily install it manually (Unpacked Extension):

1. **Clone or Download the repository:**
   ```bash
   git clone https://github.com/mingnhat99/anti-debugger.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top right corner.
4. Click on the **Load unpacked** button in the top left.
5. Select the `anti-debugger` directory you just cloned/downloaded.
6. The extension is now installed and active! 🎉

## 💻 Usage

Once installed and enabled, the extension runs automatically on all web pages (`<all_urls>`). 

1. Simply open Chrome Developer Tools (`F12` or `Ctrl+Shift+I` / `Cmd+Option+I`).
2. Navigate to a site with anti-debugging protections.
3. The extension seamlessly patches global functions in the `MAIN` execution world before scripts load.
4. Check your console. You should see the message: `[bypass] DevTools protection disabled. Console restored.` after the page is fully loaded.

## ⚠️ Disclaimer

This tool is created for **educational and security research purposes only**. Do not use it to violate the terms of service of websites or for malicious activities. The developers assume no liability and are not responsible for any misuse or damage caused by this program.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

If you like this project, please consider giving it a ⭐️!

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
