var mysql = require('mysql');

// Production ready variables
var host = process.env.DB_HOST || 'localhost';
var user = process.env.DB_USER || 'root'; 
var password = process.env.DB_PASSWORD || 'laura'; 
var database = process.env.DB_DATABASE || 'chubbySongDB'; 


var dbConnection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

// Connecting to db, see connect.js for details
dbConnection.connect();

module.exports = dbConnection;
