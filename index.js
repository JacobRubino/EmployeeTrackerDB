const inquire = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employeeTrackerDB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Welcome to the Employee Tracker!');
  start();
});

