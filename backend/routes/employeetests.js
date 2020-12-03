const express = require('express');
const connection = require('../config/database');
const app = express();


// Get all test results for specific employee

// TODO: Each EmployeeID can have multiple test barcodes. Fix!
// https://piazza.com/class/ke1ckdikw1kuz?cid=258

app.get('/for', (req, res) => {
    const SELECT_RESULTS_QUERY = 'SELECT E.collectionTime, W.result \
    FROM EmployeeTest E, PoolMap P, WellTesting W \
    WHERE E.testBarcode = P.testBarcode AND P.poolBarcode = W.poolBarcode AND E.employeeID = ?';
    connection.query(SELECT_RESULTS_QUERY, [req.session.user], (err, result) => {
        if (err) res.send(null)
        else {
            // console.log('Employee results', result)
            res.send(result)
        }
    })
});


// Get all tests collected from the DB
app.get('/all', (req, res) => {
    const SELECT_RESULTS_QUERY = 'SELECT * FROM EmployeeTest';
    connection.query(SELECT_RESULTS_QUERY, (err, result) => {
        if (err) res.send(null)
        else {
            // console.log('Collection results', result)
            res.send(result)
        }
    })
});


// Adds new test under user with labID
app.post('/add', (req, res) => {
    const ADD_TEST_QUERY = 'INSERT INTO EmployeeTest VALUES (?, ?, ?, ?)';
    connection.query(ADD_TEST_QUERY, [req.body.testBarcode, req.body.employeeID, 
        req.body.collectionTime, req.body.collectedBy], (err, result) => {
        if (err) res.send(null)
        else res.send(result)
    })
})


// Removes an employee test
app.delete('/delete', (req, res) => {    
    const TESTS_QUERY = req.body.testsToDelete.map(t => `"${t}"`).join();
    const DELETE_TEST_QUERY = `DELETE FROM EmployeeTest WHERE (testBarcode) IN (${TESTS_QUERY})`;
    connection.query(DELETE_TEST_QUERY, (err, result) => {
        if(err) {
            console.log(err)
            res.send(null)
        }
        else res.send(result)
    })
})


module.exports = app;