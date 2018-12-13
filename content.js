//helper to wait for an DOM element given its id
function waitForElement(id, timeout) {
    return new Promise((resolve, reject) => {
        rejectTime = timeout * 1000;
        let hasChanged = false;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type == 'childList' && mutation.addedNodes.length > 0) {
                    if (mutation.addedNodes[0].id == id) {
                        hasChanged = true;
                        observer.disconnect();
                        resolve();
                    }
                }
            });
        });

        if (rejectTime > 0) {
            setTimeout( () => {
                if (!hasChanged) {
                    reject('timeout!');
                }
            }, rejectTime);
        }

        observer.observe(document.body, { childList: true });
    });
}

async function main() {
    try {
        let { name, validateYear } = await getStorage();

        await waitForElement('x-auto-10', 10);

        if (validateYear) {
            //click may not work immediately after
            setTimeout(() => document.getElementsByClassName('x-btn-text')[0].click(), 10);
        }

        await waitForElement('x-auto-35', 0);
        document.getElementsByClassName('x-form-field')[0].value = name;
        document.getElementsByClassName('x-btn-text')[0].click();
    } catch (error) {
        console.error(error);
    }
}

chrome.runtime.sendMessage({ 'message': 'activate_icon' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'new_settings') {
        getStorage()
        .then(({ name, validateYear }) => {
            document.getElementsByClassName('x-form-field')[0].value = name;
            document.getElementsByClassName('x-btn-text')[0].click();
        })
        .catch(err => console.error(err));
    }
});

main();
