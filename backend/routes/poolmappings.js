const express = require('express');
const connection = require('../config/database');
const app = express();

// Get all the pools from db
app.get('/all', (req, res) => {
    // if (req.session.loggedin) {
        const SELECT_RESULTS_QUERY = `SELECT poolBarcode, GROUP_CONCAT(testBarcode separator ', ') \
            FROM PoolMap GROUP BY poolBarcode`;
        connection.query(SELECT_RESULTS_QUERY, (err, result) => {
            if(err) {
                res.send(null)
            } else {
                console.log("PoolMapping all results: ", result)
                res.send(result)
            }
        })
    // }
});

// Add new pool 
app.post('/add', (req, res) => {
    console.log("meme")
    // if(req.session.loggedin){ 
        for(let i = 0; i < req.body.barcodeSet.length; i++) {
            const ADD_POOL_QUERY = `INSERT INTO PoolMap VALUES (?, ?)`;
            connection.query(ADD_POOL_QUERY, [req.body.barcodeSet[i], req.body.poolBarcode],
                (err, result) => {
                    if(err) {
                        console.log(err)
                        res.send(null)
                    }
                })
        }
    // } else {
    //     console.log("Not logged in")
    //     res.send(null)
    // }
} )






module.exports = app;