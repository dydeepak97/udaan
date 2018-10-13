const express = require('express');
const mysql = require('mysql');
const router = express.Router();
var database = require('../model/database');


router.post('/screens', (req, res)=>{
    console.log("Creating Screen");

    const data =req.body;

    console.log("Screen Name: ", req.body.name);
    const screenName = req.body.name;
    
    const queryString = "INSERT INTO screens (name) VALUES (?)";
    database.db.query(queryString, [screenName] , (err, rows, fields)=>{
        if(err){
            console.log("Failed to Insert :(" , err);
            res.sendStatus(500);
            res.end();
            return;
        }
        console.log("Inserted Successfully with id: ", rows.insertId);
        res.end();
    });

    let seatInfo = data.seatInfo;
    let queryString2 = "INSERT INTO seats_info(screen_name, row, no_of_seats, aisle_seats) VALUES (?, ?, ?, ?);"

    for(let row in seatInfo){
        database.db.query(queryString2, [screenName, row, seatInfo[row]["numberOfSeats"], ""+seatInfo[row]["aisleSeats"]+""] , (err, rows, fields)=>{
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
});


module.exports = router;