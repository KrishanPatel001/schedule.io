// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'oAGyUOp4Mp',
  password: '4LSCZf4n0Q',
  database: 'oAGyUOp4Mp'
});

// simple query
connection.query(
  'SELECT * FROM ' + 'oAGyUOp4Mp' + '.student',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);