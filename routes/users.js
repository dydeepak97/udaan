//all user reltaed routes
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/message', (req, res) => {
    console.log("MMMMMMM");
    res.end();
}); 

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lbta_mysql'
});

function getConnection(){
    return pool;
};


router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id);
    
    const connection = getConnection();
    
    const queryString ="SELECT * FROM users WHERE id= ?"
    connection.query(queryString,[req.params.id], (err, rows, fields) => {
        if(err){
            console.log("Failed to query :(" , err);
            res.sendStatus(500);
            res.end();
            return;
        }

        console.log("Fetched users!!");
        res.json(rows);
        
    });

    // res.end();
});

router.post('/user_create', (req, res)=>{
    console.log("Creating User");

    console.log("First Name: ", req.body.create_first_name);
    console.log("Last Name: ", req.body.create_last_name);
    const firstName = req.body.create_first_name;
    const lastName = req.body.create_last_name;
    
    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
    getConnection().query(queryString, [firstName, lastName] , (err, rows, fields)=>{
        if(err){
            console.log("Failed to Insert :(" , err);
            res.sendStatus(500);
            res.end();
            return;
        }
        console.log("Inserted Successfully with id: ", rows.insertId);
        res.end();
    });


});

module.exports = router;