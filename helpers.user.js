// Wait for the element to be present
const waitForElement = (selector) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            }
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Element not found"));
        }, 10000);
    });
};

// Click an element by selector
const clickElement = (selector) => {
    waitForElement(selector).then(element => {
        element.click();
    }).catch(error => {
        console.error(error);
    });
};

// Input text into an element by selector
const inputText = (selector, text) => {
    waitForElement(selector).then(element => {
        element.value = text;
    }).catch(error => {
        console.error(error);
    });
};

// Scroll the page by pixels
const scrollByPixels = (pixels) => {
    window.scrollBy(0, pixels);
};

// Scroll to an element by selector
const scrollToElement = (selector) => {
    waitForElement(selector).then(element => {
        element.scrollIntoView();
    }).catch(error => {
        console.error(error);
    });
};

// Generic wait function
const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const scheduleAction = (hour, minute, action) => {
    // Calculate the time until the next scheduled action
    function getTimeUntilNextRun() {
        const now = new Date();
        const nextRun = new Date();
        nextRun.setHours(hour, minute, 0, 0);

        // If the next run time is in the past for today, set it to tomorrow
        if (nextRun <= now) {
            nextRun.setDate(nextRun.getDate() + 1);
        }

        return nextRun - now;
    }

    // Schedule the next run
    function scheduleNextRun() {
        const timeUntilNextRun = getTimeUntilNextRun();
        setTimeout(() => {
            action();
            scheduleNextRun(); // Schedule the next run after executing the action
        }, timeUntilNextRun);
    }

    // Start the initial scheduling
    scheduleNextRun();
}

// Click an element by attribute and value
const clickElementByAttr = async (attribute, value) => {
    try {
        const selector = `[${attribute}="${value}"]`;
        const element = await waitForElement(selector);
        element.click();
    } catch (error) {
        console.error(error);
    }
};