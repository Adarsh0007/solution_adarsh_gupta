
// Global variables 
const excudedIpSet = []; // array of objects to be included in result set
const includedIpSet = []; // array of objects to be excluded from result set

/* Function to return time difference in minutes for two given dates
* @param start of type string
* @param end of type string
* return number - difference between start date and end date in minutes
*/
const getTimeDifference = (start, end) => {
    // conveting string to Date type
    const startDate = new Date(start);
    const endDate = new Date(end);

    // get difference between two time in seconds
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
};


/* This function check that ip is valid or not on basis of its occurence
* @param click of type Object
* @param clicksArray of type Array of Objects
* return boolean 
*/
const isValidIpForResultSet = (click, clicksArray) => {
    let counter = 0;
    if (excudedIpSet.indexOf(click.ip) >= 0) {
        return false;
    }

    if (includedIpSet.indexOf(click.ip) >= 0) {
        return true;
    }

    for (let index = 0; index < clicksArray.length; index++) {
        const element = clicksArray[index];
        if (click.ip == element.ip) {
            counter++;
        }
        if (counter > 10) {
            excudedIpSet.push(click.ip);
            return false;
        }
    }
    includedIpSet.push(click.ip);
    return true;
};

/* Gives expensive click of 1 hour of time slot.
* @param startIndex of type number
* @param maxClick of type Object
* @param clicksArray of type Array of objects
* return Object
*/
const getExpensiveClick = (startIndex, maxClick, clicksArray) => {
    let max = maxClick.amount;
    let maxElement = maxClick;
    let startTime = `${maxClick.timestamp.split(':')[0]}:00:00`;
    if (startIndex >= clicksArray.length && isValidIpForResultSet(maxElement, clicksArray)) {
        return { maxElement, innerIndex: startIndex };
    } else {
        for (let innerIndex = startIndex; innerIndex < clicksArray.length; innerIndex++) {
            const innerElement = clicksArray[innerIndex];
            if (isValidIpForResultSet(innerElement, clicksArray)) {
                if (getTimeDifference(startTime, innerElement.timestamp) < 61) {
                    if (max < innerElement.amount) {
                        max = innerElement.amount;
                        maxElement = innerElement;
                    }
                } else {
                    innerIndex = (innerIndex - 1);
                    return { maxElement, innerIndex };
                }
            }
        }
        return { maxElement, innerIndex: (clicksArray.length - 1) };
    }
};

/* Driver function which read input array of objects from clicks.json file and output the result on result-set.json file
* @param clicks of type Array of Objects
* returns array of Objects for below mentioned usecases
    1. For each IP within each one hour period, only the most expensive click is placed into the result set.
    2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
    3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set.
*/
const getResultSet = (clicks) => {
    const resultSet = [];
    for (let index = 0; index < clicks.length; index++) {
        const currentClick = clicks[index];
        if (isValidIpForResultSet(currentClick, clicks)) {
            const expensiveClick = getExpensiveClick(index + 1, currentClick, clicks);
            if (expensiveClick && expensiveClick.innerIndex && expensiveClick.maxElement) {
                index = expensiveClick.innerIndex;
                resultSet.push(expensiveClick.maxElement);
            }
        }
    }
    return resultSet;
};

/* Validate the inputs array of Clicks
* @param clicks of type Array of Objects
* return boolean
*/
const validateClicksArray = (clicks) => {
    if (Array.isArray(clicks) && clicks.length > 0) {
        return true;
    }
    return false;
};

// Export the fucntions to be utilised
module.exports = {
    getTimeDifference,
    isValidIpForResultSet,
    getExpensiveClick,
    getResultSet,
    validateClicksArray
};