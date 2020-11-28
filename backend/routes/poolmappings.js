const express = require('express');
const connection = require('../config/database');
const app = express();

// Get all the pools from db
app.get('/all', (req, res) => {
    const SELECT_RESULTS_QUERY = `SELECT poolBarcode, GROUP_CONCAT(testBarcode separator ', ') as barcodes \
        FROM PoolMap GROUP BY poolBarcode`;
    connection.query(SELECT_RESULTS_QUERY, (err, result) => {
        if(err) {
            res.send(null)
        } else {
            console.log("PoolMapping all results: ", result)
            res.send(result)
        }
    })
});

// Add new pool 
app.post('/add', (req, res) => {
    console.log(req.body.barcodeSet, req.body.poolBarcode)
    const poolBarcode = req.body.poolBarcode;
    const barcodeSet = req.body.barcodeSet;
    connection.query(`INSERT INTO Pool VALUES (?)`, [poolBarcode], (err, result) => {
        if (err)
            console.log(err)
    })
    for(let i = 0; i < barcodeSet.length; i++) {
        const ADD_POOL_QUERY = `INSERT INTO PoolMap VALUES (?, ?)`;
        connection.query(ADD_POOL_QUERY, [barcodeSet[i], poolBarcode], (err, result) => {
            if(err) {
                console.log(err)
            }
        })
    }
    res.send('goud')
} )






module.exports = app;