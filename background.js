const SCRIPT_ID = "anti-debugger-inject";

async function updateIndicator(isEnabled) {
    if (isEnabled) {
    chrome.action.setBadgeText({ text: "ON" });
        chrome.action.setBadgeBackgroundColor({ color: "#4D9B52" });
    } else {
    chrome.action.setBadgeText({ text: "OFF" });
        chrome.action.setBadgeBackgroundColor({ color: "#aaaaaa" });
    }
}

async function setInjectionState(isEnabled) {
    try {
        const scripts = await chrome.scripting.getRegisteredContentScripts({ ids: [SCRIPT_ID] });
        const isRegistered = scripts.length > 0;

        if (isEnabled && !isRegistered) {
            await chrome.scripting.registerContentScripts([{
                id: SCRIPT_ID,
                js: ["inject.js"],
                matches: ["<all_urls>"],
                runAt: "document_start",
                world: "MAIN"
            }]);
        } else if (!isEnabled && isRegistered) {
            await chrome.scripting.unregisterContentScripts({ ids: [SCRIPT_ID] });
        }
    } catch (error) {
        console.error("Error updating script state:", error);
    }
}

async function syncState() {
    const data = await chrome.storage.local.get(['enabled']);
    const isEnabled = data.enabled !== false; // enabled by default
    await updateIndicator(isEnabled);
    await setInjectionState(isEnabled);
}

chrome.action.onClicked.addListener(async () => {
    const data = await chrome.storage.local.get(['enabled']);
    const isEnabled = data.enabled !== false;
    const newState = !isEnabled;

    await chrome.storage.local.set({ enabled: newState });
    await syncState();
});

chrome.runtime.onInstalled.addListener(syncState);
chrome.runtime.onStartup.addListener(syncState);
