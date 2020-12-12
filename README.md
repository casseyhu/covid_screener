# COVID Testing Screener
Web interface designed to manage mass weekly COVID-19 tests for students, faculty, and hospital employees. Given the large number of saliva tests being conducted and a limited number of lab employees, multiple tests will be mixed together into the same "pool" to be tested at once. After a pool has been created, a lab employee will put this "pool" into a next available well for testing. The status of a well test can be in progress, negative, or positive. Once a pool has been assigned to a well, the employees/users in that pool will be able to track their results on their employee home page.


## Technologies
Frontend:
* react
* javascript
* html
* css
* Bootstrap

Backend:
* Node.js
* Express
* MySQL


## Setup
To run this project, install it locally using npm:
```
$ cd covid_screener
$ npm install
$ npm start
```
** Requires MySQL database setup (sample provided in ```backend/config```) **


<img width="1440" alt="Screen Shot 2020-12-12 at 12 20 08 AM" src="https://user-images.githubusercontent.com/51495894/101976091-d0314d00-3c0f-11eb-9228-be98f89afeee.png">

## Features
#### Lab Employees
* Add new tests for any employee using a unique test barcode.
* View all tests currently in the system.
* Add one or more tests to a pool and submit for testing.
* Map a pool to well for lab testing. Default result is 'in progress'.
* Edit a well to change its testing results (updates results for all tests in that well).
#### Employees/Users
* View all their test results sorted by date.
#### Miscellaneous
* Separate login pages for users/employees and lab employees. 
* Implemented password hashing using SHA-256 for added security.

