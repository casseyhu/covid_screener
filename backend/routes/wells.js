const express = require('express');
const connection = require('../config/database');
const app = express();


// Get all the well and pool mappings
app.get('/all', (req, res) => {
    const SELECT_RESULTS_QUERY = `SELECT * FROM WellTesting`;
    connection.query(SELECT_RESULTS_QUERY, (err, result) => {
        if (err) res.send(null)
        else res.send(result)
    })
});


// Add new well 
app.post('/add', (req, res) => {
    connection.query(`INSERT INTO Well VALUES (?)`, [req.body.wellBarcode], (err, results) => {
        if (err) console.log(err)
    })
    const INSERT_QUERY = `INSERT INTO WellTesting(poolBarcode, wellBarcode, result) VALUES (?,?,?)`;
    connection.query(INSERT_QUERY, [req.body.poolBarcode, req.body.wellBarcode, req.body.result],
        (err, result) => {
            if (err) res.send(null)
            else res.send(result)
        })
})


// Delete well
app.delete('/delete', (req, res) => {
    const DELETE_QUERY = `DELETE FROM WellTesting WHERE wellBarcode = ?`;
    connection.query(DELETE_QUERY, [req.body.wellBarcode], (err, result) => {
        if (err) res.send(err)
        else res.send(result)
    })
})


// Update well results
app.put('/update', (req, res) => {
    const UPDATE_QUERY = 'UPDATE WellTesting SET testingEndTime = NOW(), result = ? \
    WHERE poolBarcode = ? AND wellBarcode = ?';
    connection.query(UPDATE_QUERY, [req.body.result, req.body.poolBarcode, req.body.wellBarcode],
        (err, result) => {
            if (err) console.log(err)
            else res.send(result)
        })
})


module.exports = app;