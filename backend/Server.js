const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/database');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
	secret: 'secretkey',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:true}));

connection.connect(err => {
    if (err) {
        return err
    }
});

app.use('/login', [ require('./routes/userlogin') ]);

app.use('/tests', [ require('./routes/employeetests') ]);

app.use('/pools',  [ require('./routes/poolmappings')])


app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on port ${process.env.PORT || 3001}`);
})
