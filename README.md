# Requirement

Given an array of clicks, return the subset of clicks where:
1. For each IP within each one hour period, only the most expensive click is placed into the
result set.
2. If more than one click from the same IP ties for the most expensive click in a one hour
period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any
of those clicks in the result set.

# Steps to run soultion and test

- Code is written in es6
- First move to the project directory 
- Run command `npm install`
- Run command `npm run test` to run *test cases*
- Run command `npm run solution` to get the output.
- Output will be written into **result-set.json** file.

# Dev Dependencies

- Used Mocha version 7.0.1 for writing unit test

**Note**: 

- Not used any library like moment.js to calculate differnce betweeen two given dates instead written own function with name **getTimeDifference**
- User can copy paste their input  array into **clicks.json** file first then run command to check output.
