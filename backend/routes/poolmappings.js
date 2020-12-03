const express = require('express');
const connection = require('../config/database');
const app = express();


// Get all the pools with list of test barcodes
app.get('/all', (req, res) => {
    const SELECT_RESULTS_QUERY = `SELECT poolBarcode, GROUP_CONCAT(testBarcode separator ', ') as barcodes \
        FROM PoolMap GROUP BY poolBarcode`;
    connection.query(SELECT_RESULTS_QUERY, (err, result) => {
        if (err) res.send(null)
        else {
            res.send(result)
        }
    })
});


// Add new pool with specific pool mapping values
app.post('/add', (req, res) => {
    const poolBarcode = req.body.poolBarcode;
    connection.query(`INSERT INTO Pool VALUES (?)`, [poolBarcode], (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
    const values = req.body.barcodeSet.map(b => `('${b}', '${poolBarcode}')`).join();
    const ADD_POOL_QUERY = `INSERT IGNORE INTO PoolMap VALUES ${values}`;
    connection.query(ADD_POOL_QUERY, (err, result) => {
        if(err) console.log(err)
    })
    res.send('DONE')
} )


// Deletes an entire pool and respective mappings, but employee tests remain
app.delete('/delete', (req, res) => {    
    const POOLS_QUERY = req.body.poolsToDelete.map(p => `'${p}'`).join();
    const DELETE_QUERY = `DELETE FROM Pool WHERE (poolBarcode) IN (${POOLS_QUERY})`;
    connection.query(DELETE_QUERY, (err, result) => {
        if(err) res.send(null)
        else {
            // console.log('DELETED', result)
            res.send(result)
        }
    })
})


// Update pool mappings for specific pool 
// 1. Delete specific poolmapping entry or
// 2. Add new test barcode mapping for the pool
app.put('/update', (req, res) => {
    const poolBarcode = req.body.poolBarcode;
    const deletions = req.body.deletions.map(d => `'${d}'`).join();   // testBarcodes to delete
    const additions = req.body.additions.map(a => `('${a}', '${poolBarcode}')`).join();   // testBarcodes to add
    const DELETION_QUERY = `DELETE FROM PoolMap WHERE (testBarcode) IN (${deletions}) \
        AND PoolBarcode = ${poolBarcode}`;
    const ADDITION_QUERY = `INSERT IGNORE INTO PoolMap VALUES (${additions})`;
    connection.query(DELETION_QUERY, (err, result) => {
        if (err) console.log(err)
    })
    connection.query(ADDITION_QUERY, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    })
})


module.exports = app;