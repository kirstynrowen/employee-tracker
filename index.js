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
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployee();
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
    });
};

//add a department
function addDepartment() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of the new department:'
        },
    ])
    .then ((response) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, [response.name], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`\nSuccessfully added new department!\n`);
            console.table(result);
            viewDepartments();
        });
    });
};
//add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the title of the new role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for this new role:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Please enter the department id:',
        },
    ])
    .then ((response) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, response.department_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`\nSuccessfully added new role!\n`);
            viewRoles();
        })
    })
}

//add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Please enter employee first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter employee last name:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Please enter their role ID:',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Please enter the manager ID:'
            },
        ])
        .then ((response) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.first_name, response.last_name, response.role_id, response.manager_id], (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`\nSuccessfully added new role!\n`);
                viewEmployees();
            })
        })
}

//update an employee
function updateEmployee() {
    // show employees and roles first?
    db.query(`SELECT * FROM employee`, (err, employeeResult) => {
        if (err) {
            console.log(err);
        }
        console.log('Current employees:');
        console.table(employeeResult);

        db.query(`SELECT * FROM role`, (err, roleResult) => {
            if (err) {
                console.log(err);
            }
            console.log('Available roles:');
            console.table(roleResult);

            console.log('\n');
            
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'empID',
                        message: 'Please enter the ID of the employee you are updating:',
                    },
                    {
                        type: 'input',
                        name: 'roleID',
                        message: 'Please choose a new role for this employee by entering the corresponding role ID:',
                    },
                ])
                .then((response) => {
                    db.query(
                        `UPDATE employee SET role_id = ? WHERE id = ?`,
                        [response.roleID, response.empID],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(`\nSuccessfully updated employee role!\n`);
                            viewEmployees();
                        }
                    );
                });
        });
    });
}
