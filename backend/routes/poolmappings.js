const express = require('express');
const connection = require('../config/database');
const app = express();

// Get all the pools from db
app.get('/all', (req, res) => {
    if (req.session.loggedin) {
        const SELECT_RESULTS_QUERY = `SELECT poolBarcode, GROUP_CONCAT(testBarcode separator ',') FROM PoolMap GROUP BY poolBarcode`
        connection.query(SELECT_RESULTS_QUERY, (err, result) => {
            if(err) {
                res.send(null)
            } else {
                console.log("PoolMapping all results: ", result)
                res.send(result)
            }
        })
    }
});






module.exports = app;