const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const sha256 = require('js-sha256');
const session = require('express-session');
const e = require('express');
const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
	secret: 'secretkey',
	resave: true,
	saveUninitialized: true
}));
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




// Verify valid employee login credentials. If valid, return employeeID
app.get('/employee/login', (req, res) => {
    console.log('Email', req.query.email, 'Password', sha256(req.query.pass))
    connection.query("SELECT employeeId from Employee WHERE email = ? AND password = ?", [
        req.query.email,
        sha256(req.query.pass)  
    ], (err, result) => {
        if (err || result === undefined || result.length === 0) { 
            res.send(null); 
        } else {
            req.session.loggedin = true;
            req.session.user = result[0].employeeId;
            console.log("Employee ID: ", req.session.user )
            res.send(result)
        }
    });
})

// Verify valid lab employee login credentials. If valid, return labID
app.get('/labemployee/login', (req, res) => {
    console.log('Email', req.query.email)
    console.log('Password', sha256(req.query.pass))
    connection.query("SELECT labID from LabEmployee WHERE email = ? AND password = ?", [
        req.query.email,
        sha256(req.query.pass)  
    ], (err, result) => {
        if (err || result === undefined || result.length === 0) { 
            res.send(null); 
        } else {
            req.session.loggedin = true;
            req.session.user = result[0].labID;
            console.log("Collector ID: ", req.session.user )
            res.send(result)
        }
    });
})





// Get all test results for specific employee
app.get('/get/employeeTests', (req, res) => {
    if (req.session.loggedin){
        const SELECT_RESULTS_QUERY = 'SELECT E.collectionTime, W.result \
        FROM EmployeeTest E, PoolMap P, WellTesting W \
        WHERE E.testBarcode = P.testBarcode AND P.poolBarcode = W.poolBarcode AND E.employeeID = ?';
        connection.query(SELECT_RESULTS_QUERY, [req.session.user], (err, result) => {
            if (err) {
                res.send(null)
            } else {
                console.log('Employee results', result)
                res.send(result)
            }
        })
    } else {
        res.send(null)
    }
    
});

// Get all tests collected by labID
app.get('/get/testCollection', (req, res) => {
    if (req.session.loggedin) {
        const SELECT_RESULTS_QUERY = 'SELECT employeeID, testBarcode FROM EmployeeTest WHERE collectedBy = ?';
        console.log(SELECT_RESULTS_QUERY, req.query.labID)
        connection.query(SELECT_RESULTS_QUERY, [req.session.user], (err, result) => {
            if (err) {
                res.send(null)
            } else {
                console.log('Collection results', result)
                res.send(result)
            }
        })
    } else {
        res.send(null)
    }
});

// Adds new test under user with labID
app.post('/labtech/collect/add', (req, res) => {
    if(req.session.loggedin){ 
        const ADD_TEST_QUERY = 'INSERT INTO EmployeeTest VALUES (?, ?, ?, ?)';
        connection.query(ADD_TEST_QUERY, [req.body.testBarcode, req.body.employeeID, 
            req.body.collectionTime, req.body.collectedBy], (err, result) => {
            if(err) {
                res.send(null)
            } else {
                res.send(result)
            }
        })
    } else {
        res.send(null)
    }
})

// Removes a test from user with labID
app.delete('/labtech/collect/delete', (req, res) => {
    console.log(req.body, req.query, req.data)
    
    console.log('loggedin', req.body.employeeID, req.body.testBarcode)
    const DELETE_TEST_QUERY = 'DELETE FROM EmployeeTest WHERE employeeID = ? AND testBarcode = ?'
    connection.query(DELETE_TEST_QUERY, [req.body.employeeID, req.body.testBarcode], (err, result) => {
        if(err) {
            console.log('error')
            res.send(null)
        } else {
            console.log('DELETED', result)
            res.send(result)
        }
    })
    // } else {
    //     console.log('not loggedin')
    //     res.send(null)
    // }
})


app.listen(3001, () => {
    console.log('Listening on port 3001');
})
