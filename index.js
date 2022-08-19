const fs = require('fs');
const solution = require('./solution');

// This is the driver code for reading json file and writing the output to json file 
const main = () => {
    try {
        // read the input json file
        const rawdata = fs.readFileSync('./clicks.json');
        const clicks = JSON.parse(rawdata);
        if (solution.validateClicksArray(clicks)) {
            const resultSet = solution.getResultSet(clicks);

            // added formatting in result for more readability
            const data = JSON.stringify(resultSet, null,'\t'); 
            
            // Write the resulted array of objects for output
            fs.writeFileSync('./result-set.json', data);
            console.log('The Output is written to ./result-set.json file')
        } else {
            console.log('Invalid Array of clicks');
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// Calling the driver function to provide required solution
main();

