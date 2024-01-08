// lc_hider_content.js
console.log('LC Hider Content script is running.');

// Function to remove difficulty elements
function removeDifficultyElements() {
    var divs_to_remove = [
        '.text-olive.dark\\:text-dark-olive.inline-block.text-sm.font-medium.capitalize.leading-\\[22px\\]',
        '.text-yellow.dark\\:text-dark-yellow.inline-block.text-sm.font-medium.capitalize.leading-\\[22px\\]',
        '.text-pink.dark\\:text-dark-pink.inline-block.text-sm.font-medium.capitalize.leading-\\[22px\\]'
    ];

    divs_to_remove.forEach(selector => {
        var divToRemove = document.querySelector(selector);
        if (divToRemove) {
            console.log("Removing element with selector: " + selector);
            divToRemove.remove();
        } else {
            console.log("Element not found with selector: " + selector);
        }
    });
}

// Function to observe DOM changes
function observeDOMChanges(callback) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // DOM has changed, call the callback function
                callback();
            }
        });
    });

    // Start observing the entire document for changes
    observer.observe(document, { childList: true, subtree: true });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired.');

    // Set up the observer to watch for DOM changes
    observeDOMChanges(function () {
        // When DOM changes are detected, remove difficulty elements
        removeDifficultyElements();
    });
});
