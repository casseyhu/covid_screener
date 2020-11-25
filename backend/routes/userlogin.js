const express = require('express');
const connection = require('../config/database');
const sha256 = require('js-sha256');
const app = express();


// Verify valid employee login credentials. If valid, return employeeID
app.get('/employee', (req, res) => {
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
app.get('/labemployee', (req, res) => {
    console.log('Email', req.query.email, 'Password', sha256(req.query.pass))
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


// app.get('/api/test', (req, res) => {
//     connection.query('SELECT * FROM LabEmployee', (err, result) => {
//         res.send(result);
//     })
// })

module.exports = app;