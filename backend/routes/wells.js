const express = require('express');
const connection = require('../config/database');
const app = express();

// Get all the well and pool mappings
app.get('/all', (req, res) => {
    const SELECT_RESULTS_QUERY = `SELECT * FROM WellTesting`;
    connection.query(SELECT_RESULTS_QUERY, (err, result) => {
        if(err) {
            res.send(null)
        } else {
            res.send(result)
        }
    })
});

// // Add new pool 
// app.post('/add', (req, res) => {
//     console.log(req.body.barcodeSet, req.body.poolBarcode)
//     const poolBarcode = req.body.poolBarcode;
//     const barcodeSet = req.body.barcodeSet;
//     connection.query(`INSERT INTO Pool VALUES (?)`, [poolBarcode], (err, result) => {
//         if (err)
//             console.log(err)
//     })
//     for(let i = 0; i < barcodeSet.length; i++) {
//         const ADD_POOL_QUERY = `INSERT INTO PoolMap VALUES (?, ?)`;
//         connection.query(ADD_POOL_QUERY, [barcodeSet[i], poolBarcode], (err, result) => {
//             if(err) {
//                 console.log(err)
//             }
//         })
//     }
//     res.send('goud')
// } )


// Update well results
app.put('/update', (req, res) => {
    const UPDATE_QUERY = 'UPDATE WellTesting SET testingEndTime = NOW(), result = ? \
    WHERE poolBarcode = ? AND wellBarcode = ?';
    connection.query(UPDATE_QUERY, [req.body.result, req.body.poolBarcode, req.body.wellBarcode],
        (err, result) => {
            if (err) console.log(err)
            res.send(result)
        })
})



module.exports = app;