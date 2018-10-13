var express = require('express');
var app = express();
var morgan = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var database = require('./model/database');

app.use(express.static('./public'));

database.setupDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ROUTER
const router = require('./routes/users.js');
const router2 = require('./routes/screens.js');

app.use(router);
app.use(router2);

app.use(morgan('short'));



app.get('/', function(req, res){
    res.send('working init1');
});




app.get('/dy' , (req, res) => {
    var users = {first:"nibba", lastname: "kneegrow"}
    res.json(users);
});

app.listen(9090);
console.log("API ruuning on port 9090");
