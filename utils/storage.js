//helper to promisify chrome.storage.sync.get
function getStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, items => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
}

function setStorage(items) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(items, () => {
            let err = chrome.runtime.lastError;
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}