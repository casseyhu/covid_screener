const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/database');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:true}));

connection.connect(err => {
    if (err) return err
});

// checks if employee exists before adding
app.get('/ping/:employeeID', (req, res) => {
    connection.query('SELECT firstName FROM Employee WHERE employeeID = ?', req.params.employeeID, (err, result) => {
        res.send(result)
    })
})

app.use('/login', [ require('./routes/userlogin') ]);

app.use('/tests', [ require('./routes/employeetests') ]);

app.use('/pools', [ require('./routes/poolmappings') ]);

app.use('/wells', [ require('./routes/wells') ]);


app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on port ${process.env.PORT || 3001}`);
})
