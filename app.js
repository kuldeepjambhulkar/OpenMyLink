// Functions
const clearInputs = () => {
    keyInput.value = '';
    linkNameInput.value = '';
    linkInput.value = '';

    keyInput.focus();
}
const updateMainDisplay = () => {
    const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};
    const mainDisplay = document.querySelector('#mainDisplay');
    if(mainDisplay){
        // Clear the list
        mainDisplay.innerHTML = '';
    
        // Add each shortcut to the list
        for (const shortcutKey in shortcuts) {
            const shortcut = shortcuts[shortcutKey];
    
            mainDisplay.innerHTML += `
            <div class="col text-center mr-1 my-5px">
                <button class="button-secondary">${shortcut.linkName} (${shortcutKey})</button>
            </div>`
        }
    }
}
const deleteLink = (shortcutKey) => {
    // Retrieve existing shortcuts from localStorage
    const existingShortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};

    // Delete the shortcut
    delete existingShortcuts[shortcutKey];

    // Save the updated shortcuts to localStorage
    localStorage.setItem('shortcuts', JSON.stringify(existingShortcuts));

    updateList();
}
const updateList = () => {
    const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};
    const shortcutList = document.querySelector('#shortcutList');
    if(shortcutList){
        // Clear the list
        shortcutList.innerHTML = '';
    
        // Add each shortcut to the list
        for (const shortcutKey in shortcuts) {
            const shortcut = shortcuts[shortcutKey];
    
            shortcutList.innerHTML += `
            <div class="col mr-1 my-5px border-primary p-1">
                <p>${shortcut.linkName} (${shortcutKey})</p>
                <p>${shortcut.link}</p>
                <button class="button-primary" id="${shortcutKey}">Delete</button>
            </div>`;
            const btn = document.getElementById(shortcutKey);
            btn?.addEventListener('click', () => deleteLink(shortcutKey));
        }
    }
}
const addLink = () => {
   const shortcutKey = keyInput.value,
        linkName = linkNameInput.value,
        link = linkInput.value;
    if (shortcutKey && linkName && link) {
        // Retrieve existing shortcuts from localStorage
        const existingShortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};
    
        // Add the new shortcut
        existingShortcuts[shortcutKey] = { linkName, link };
    
        // Save the updated shortcuts to localStorage
        localStorage.setItem('shortcuts', JSON.stringify(existingShortcuts));
    
        clearInputs();
        updateList();
    }
}


// Function to handle keydown events
function handleKeyDown(event) {
    // Check if the "Alt" key is pressed
    if (event.altKey) {
        // Check if the pressed key is a number (0-9)
        const key = event.key;
        if (key) {
            // Retrieve shortcuts from localStorage
            const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};

            // Check if a shortcut is configured for the pressed number
            const shortcut = shortcuts[key];
            if (shortcut) {
                // Open a new tab with the configured URL
                window.open(shortcut.link, '_blank');
            }
        }
    }
}

window.onload = () => {
    updateMainDisplay();
    updateList();
}

// Constants
const btnAddLink = document.querySelector('#btn-addLink');
const keyInput = document.querySelector('#shortcutKey');
const linkNameInput = document.querySelector('#linkName');
const linkInput = document.querySelector('#linkUrl');

// Event Listeners
btnAddLink?.addEventListener('click', addLink);
document.addEventListener('keydown', handleKeyDown);