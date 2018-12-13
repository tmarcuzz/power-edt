//settings messages
document.title = chrome.i18n.getMessage('extension_name');
document.getElementById('validate_year_label').textContent = chrome.i18n.getMessage('automatically_validate_year');
document.getElementById('name_label').textContent = chrome.i18n.getMessage('name_label');
document.getElementById('save').textContent = chrome.i18n.getMessage('save');

getStorage().then(({ name, validateYear }) => {
    if (name) document.getElementById('name').value = name;
    document.getElementById('validate_year').checked = validateYear;
});

function saveOptions(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var validateYear = document.getElementById('validate_year').checked;

    if (!name) {
        document.getElementById('name').classList.add('empty');
        return;
    }

    setStorage({
        name,
        validateYear
    }).then(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {message: 'new_settings'}, response => {
                //close tab
                chrome.tabs.getCurrent(tab => {
                    if (tab)
                        chrome.tabs.remove(tab.id, null);
                });
            });
        });
    });
}

document.getElementById('options-form').addEventListener('submit', saveOptions);
