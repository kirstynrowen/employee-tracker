//import inquirer, mysql, console.table
const inquirer = require('inquirer');
const table = require('console.table');
//import db materials
const db = require('./db');

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
                'Ass an Employee',
                'Update an Employee Role',
            ]
        }
    ])
    .then((response) => {
//switch/case for queries
    })
};

//functions for sql queries

