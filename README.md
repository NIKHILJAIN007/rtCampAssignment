#### Steps to use
##### 1. Installation

Playwright framework requires [Node.js](https://nodejs.org/) v14+ to run.

Installing the dependencies.
```sh
npm ci
```
##### 2. Test creation
- Create Test file with extenstion .spec.ts. Eg LoginTest.spec.ts
- In the testData excel create a sheet with name of test. Eg. LoginTest
- Create a execution sheet and make an entry of new test case. Eg. in the Regression sheet add a row for new test LoginTest and update other columns like run, mode etc.

##### 3. Execution
To run test suite use below command.
```sh
npm run create:suite SHEET=<SheetName> && npm test
```
**Note:** SheetName needs to be updated.

To run individual test locally use below command.
```sh
set TEST_NAME=<TestFileName> && npm run local:test
```
**Note:** Using set command we are setting the local TestFileName.

To run individual test locally in [UI Mode](https://playwright.dev/docs/test-ui-mode) use below command.
```sh
set TEST_NAME=<TestFileName> && npm run local:test:ui
```
**Note:** Using set command we are setting the local TestFileName.

To change any environment configuration in .env file at run time use set command.
Eg: To change browser to MS Edge use below command
```sh
set BROWSER=edge
```
Similar command can be used to update other environment configuration

To generate Allure report use below command
```sh
npm run report
```

##### 4. Report & Logs
Playwright HTML report will be present inside
```sh
test-results/results/index.html
```
Execution log will be present in the log file.
```sh
test-results/logs/execution.log
```