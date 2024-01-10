// lc_hider_content.js
console.log('LC Hider Content script is running.');

// Function to remove difficulty elements
function removeDifficultyElements() {
    var divs_to_remove = [

        "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-easy dark:text-difficulty-easy",
        "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-medium dark:text-difficulty-medium",
        "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-hard dark:text-difficulty-hard",
    ];

    divs_to_remove.forEach(originalString => {

        var selector = '.' + originalString.replace(/\s+/g, '.').replace(/:/g, '\\:');
        var divToRemove = document.querySelector(selector);
        if (divToRemove) {
            console.log("Removing element with selector: " + selector);
            divToRemove.remove();
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
