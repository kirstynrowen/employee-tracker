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
      switch (response.homeScreen) {
        case 'View All Departments':
            viewDepartments();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add a Department':

            break;
        case 'Add a role':
            break;

        case 'Add an Employee':

            break;
        case 'Update an Employee Role':

            break;
      }  
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
    });
};

//view all roles
function viewRoles() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        homePage();
    });
};

//view all employees
function viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        homePage();
    })
}

//add a department


//add a role


//add an employee


//update an employee
