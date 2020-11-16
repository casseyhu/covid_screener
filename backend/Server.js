const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

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

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/get', (req, res) => {
    
});





app.listen(3001, () => {
    console.log('Listening on port 3001');
})
