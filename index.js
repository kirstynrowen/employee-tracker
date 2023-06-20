//import inquirer, mysql, console.table
const inquirer = require('inquirer');
const table = require('console.table');
//import db connection
const db = require('./db/connection');

//connect to database
db.connect(() => {
    homePage();
})

function homePage () {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'homeScreen',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a role',
                'Add an Employee',
                'Update an Employee Role',
            ]
        }
    ])
    .then((response) => {
//switch/case for queries
    })
};

//functions for sql queries
//view all departments
function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        homePage();
    })
}

//view all roles


//view all employees


//add a department


//add a role


//add an employee


//update an employee
