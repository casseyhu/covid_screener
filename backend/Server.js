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
    console.log('CONNECTED');
});

app.get('/api/get', (req, res) => {
    
});

app.get('/employee/login', (req, res) => {
    console.log('Email', req.query.email)
    console.log('Password', sha256(req.query.pass))
    connection.query("SELECT employeeId from Users WHERE email = ? AND pass = ?", [
        req.query.email,
        sha256(req.query.pass)  
    ], function(err, result){
        if(err) { 
            console.log("Error, sending null") 
            return res.send(null); 
        } 
        else{
            console.log("Result from qry: ", result)
            if(result === undefined || result.length === 0)
                return res.send(null)
            return res.send(result)
        }
    });

})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})
