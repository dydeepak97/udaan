const express = require('express');
const mysql = require('mysql');
const router = express.Router();
var database = require('../model/database');


router.post('/screens/:screenName/reserve', (req, res)=>{
    console.log("Creating Screen");

    const screenName = req.params["screenName"]
    const data =req.body;
    
    console.log("Screen Name: ", screenName);
    const seats = data["seats"];
    
    let queryString = "INSERT INTO seats_info(screen_name, row, seat) VALUES (?, ?, ?);"

    for(let row in seats){
        for(let key in seats[row]){
            database.db.query(queryString, [screenName, row, ""+ seats[row][key] +""] , (err, rows, fields)=>{
                if(err){
                    console.log("Failed to Insert :(" , err);
                    res.sendStatus(500);
                    res.end();
                    return;
                }
                console.log("Inserted Successfully with id: ", rows.insertId);
                res.end();
            });
        }
    }
});


module.exports = router;