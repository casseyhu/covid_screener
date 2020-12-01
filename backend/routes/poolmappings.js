const express = require('express');
const connection = require('../config/database');
const app = express();

// Get all the pools with list of test barcodes
app.get('/all', (req, res) => {
    const SELECT_RESULTS_QUERY = `SELECT poolBarcode, GROUP_CONCAT(testBarcode separator ', ') as barcodes \
        FROM PoolMap GROUP BY poolBarcode`;
    connection.query(SELECT_RESULTS_QUERY, (err, result) => {
        if(err) res.send(null)
        else {
            console.log("PoolMapping all results: ", result)
            res.send(result)
        }
    })
});

// Add new pool with specific pool mapping values
app.post('/add', (req, res) => {
    const poolBarcode = req.body.poolBarcode;
    const barcodeSet = req.body.barcodeSet;
    connection.query(`INSERT INTO Pool VALUES (?)`, [poolBarcode], (err, result) => {
        if (err) console.log(err)
    })
    let ADD_POOL_QUERY = `INSERT IGNORE INTO PoolMap VALUES `;
    for(let i = 0; i < barcodeSet.length; i++) {
        ADD_POOL_QUERY += `('${barcodeSet[i]}','${poolBarcode}'),`;
    }
    connection.query(ADD_POOL_QUERY.slice(0,-1), (err, result) => {
        if(err) console.log(err)
    })
    console.log('done adding new pool');
    res.send('DONE')
} )


// Deletes an entire pool and respective mappings, but employee tests remain
app.delete('/delete', (req, res) => {    
    const pools = req.body.poolsToDelete;

    // TODO: Delete the set of selected pools. 
    // poolsToDelete = ['POOL01', 'POOL02', 'POOL03', ...]
    var DELETE_QUERY = `DELETE FROM Pool WHERE poolBarcode = ?`;
    connection.query(DELETE_QUERY, poolBarcode, (err, result) => {
        if(err) {
            console.log(err)
            res.send(null)
        } else {
            // console.log('DELETED', result)
            res.send(result)
        }
    })


    
})


// Update pool mappings for specific pool 
// 1. Delete specific poolmapping entry or
// 2. Add new test barcode mapping for the pool
app.put('/update', (req, res) => {
    const deletions = req.body.deletions;
    const additions = req.body.additions;
    for (var i = 0; i < deletions.length; i++) {
        const DELETION_QUERY = ''
    }
    for (var i = 0; i < additions.length; i++) {
        const ADDITION_QUERY = ''
    }
})



module.exports = app;