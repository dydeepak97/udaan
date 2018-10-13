/*
    Provide a database instance
    Exports:
        db: instance od db
        setupDB(): to init db
*/
const mysql = require('mysql');


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'udaan'
});



module.exports =  {
    db, //return a db connection

    //Used to Initial DB
    setupDB: function(){
        console.log("Setup DB called");
        
        db.query("CREATE TABLE IF NOT EXISTS screens ( name VARCHAR(50) NOT NULL , PRIMARY KEY (name));")
        db.query("CREATE TABLE IF NOT EXISTS seats_info ( `screen_name` VARCHAR(50) NOT NULL , `row` VARCHAR(10) NOT NULL , `no_of_seats` INT NOT NULL , `aisle_seats` VARCHAR(30) NOT NULL );")
        db.query("CREATE TABLE IF NOT EXISTS seats_reserved ( `screen_name` VARCHAR(50) NOT NULL , `row` VARCHAR(10) NOT NULL , `seat` INT NOT NULL )");  
    }
};
