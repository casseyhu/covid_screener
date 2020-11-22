const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const sha256 = require('js-sha256');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass4root',
    database: 'covidscreen'
});

connection.connect(err => {
    if (err) {
        return err
    }
});

app.get('/get/employeeTests', (req, res) => {
    const SELECT_RESULTS_QUERY = 'SELECT E.collectionTime, W.result \
        FROM EmployeeTest E, PoolMap P, WellTesting W \
        WHERE E.testBarcode = P.testBarcode AND P.poolBarcode = W.poolBarcode AND E.employeeID = ?';
    connection.query(SELECT_RESULTS_QUERY, [req.query.employeeID], (err, result) => {
        if (err) {
            res.send(null)
        }
        else {
            console.log('Employee results', result)
            res.send(result)
        }
    })
    
});

// Verify valid login employee login credentials. If valid, return employeeID
app.get('/employee/login', (req, res) => {
    console.log('Email', req.query.email)
    console.log('Password', sha256(req.query.pass))
    connection.query("SELECT employeeId from Users WHERE email = ? AND pass = ?", [
        req.query.email,
        sha256(req.query.pass)  
    ], (err, result) => {
        if (err || result === undefined || result.length === 0) { 
            console.log("Error, sending null") 
            res.send(null); 
        } 
        else {
            console.log("Employee ID: ", result)
            res.send(result)
        }
    });
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})
