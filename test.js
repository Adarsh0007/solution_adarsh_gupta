const assert = require('assert')
const solution = require('./solution')

describe('Test suite for soultion provided', () => {

    it('Indicates failure when an obejct is used instead of an array', () => {
        assert.equal(solution.validateClicksArray({}), false)
    });
    
    it('Indicates failure when blank array is used', () => {
        assert.equal(solution.validateClicksArray([]), false)
    });
    
    it(`Calculates the expensive click`, () => {
        const result =solution.getResultSet([
            { "ip": "22.22.22.22", "timestamp": "3/11/2016 02:02:58", "amount": 7.00 },
            { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:12:32", "amount": 6.50 },
            { "ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25 }
        ])
        assert.deepEqual(result, [{ "ip": "11.11.11.11", "timestamp": "3/11/2016 02:13:11", "amount": 7.25 }]);
    });

    it('Test time difference between two dates in minutes', () => {
        const startDate = '3/11/2016 02:00:00';
        const endDate = '3/11/2016 02:13:11';
        assert.equal(solution.getTimeDifference(startDate, endDate), 13);
    });
});
