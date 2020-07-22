const inquirer = require("inquirer"),
    cTable = require("console.table"),
    mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Luffy1sKing",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    employeeTracker();
});

function employeeTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                // "View all employees by department",
                // "View all employees by manager",
                "Add employee",
                "Add department",
                "Add role",
                // "Remove employee",
                // "Remove department",
                // "Remove role",
                "Update employee role",
                "Update employee manager"
                //   "End"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            switch (answer.action) {
                case "View all employees":
                    employeeSearch();
                    break;

                case "View all roles":
                    roleSearch();
                    break;

                case "View all departments":
                    deptSearch();
                    break;

                // case "View all employees by department":
                //     employeeDept();
                //     break;

                // case "View all employees by manager":
                //     employeeMan();
                //     break;

                case "Add employee":
                    employeeAdd();
                    break;

                case "Add department":
                    departAdd();
                    break;

                case "Add role":
                    roleAdd();
                    break;

                // case "Remove employee":
                //     employeeRem();
                //     break;

                // case "Remove department":
                //     removeDept();
                //     break;

                // case "Remove role":
                //     removeRole();
                //     break;

                case "Update employee role":
                    updateRole();
                    break;

                case "Update employee manager":
                    updateMan();
                    break;

                // case "End":
            }
        });
};

//views
function employeeSearch() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, data) {
        if (err) throw err;
        console.log("//pulling all Employee information");
        console.table(data);
        employeeTracker();
    });
};

function roleSearch() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.log("//search for all company roles");
        console.log(data);
        console.table(data);
        employeeTracker();
    });
};

function deptSearch() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log("//search for all departments");
        console.log(data);
        console.table(data);
        employeeTracker();
    });
};

// function employeeDept() {

//     employeeTracker();
// };

// function employeeMan() {

//     employeeTracker();
// };

//function to add new employees, only adds first and last name
function employeeAdd() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee first name",
            name: "first"
        },
        {
            type: "input",
            message: "Enter employee last name",
            name: "last"
        }
    ]).then(function (data) {
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: data.first,
                last_name: data.last,
                role_id: null,
                manager_id: null
            }, function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                console.table(data);
            });
        employeeTracker();
    });
};

function departAdd() {
    inquirer.prompt({
        type: "input",
        message: "What will you call the new department?",
        name: "dept"
    }).then(function (data) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: data.dept
            },
            function (err, data) {
                if (err) {
                    throw err;
                }
            }
        ),
            console.log(data);
        console.table(data);
        employeeTracker();
    });
};

function roleAdd() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's title?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the employee salary?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the employee's department id?",
            name: "DepId"
        }
    ]).then(function (data) {
        connection.query("INSERT INTO role SET ?",
            {
                title: data.title,
                salary: data.salary,
                department_id: data.DepId
            },
            function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
                console.table(data);
            }
        );
        employeeTracker();
    });
};
// function employeeRem() {
// };

//pulls data from 2 tables (employee and role) to create choices within inquirer with information already in the database/tables
function updateRole() {
    let roleUp = [];
    let roleArray = [];
    connection.query("SELECT * FROM employee", function (err, data) {
        console.log(data);
        if (err) throw err;

        for (let i = 0; i < data.length; i++) {
            let roleTide = { name: data[i].first_name + " " + data[i].last_name, value: data[i].id }

            roleUp.push(roleTide);
        }
        connection.query("SELECT * FROM role", function (err, data) {
            console.log(data);
            if (err) throw err;

            for (let i = 0; i < data.length; i++) {
                let roleChoice = { name: data[i].title, value: data[i].id }

                roleArray.push(roleChoice);
            }

            inquirer.prompt([
                {
                    type: "list",
                    name: "roleEm",
                    message: "Select employee to update",
                    choices: roleUp
                },
                {
                    type: "list",
                    message: "Select employee's new role",
                    choices: roleArray,
                    name: "newrole"
                }
            ]).then(function (data) {
                console.log("Updating information", data);
                console.log(data.roleEm);
                console.log(data.newrole);
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [data.newrole, data.roleEm], function (err, data) {
                    if (err) throw err;
                    console.log(data);

                    employeeTracker();
                })
            })
        })
    })
};

function updateMan() {
    // similar to update role function, will just need to change variables
    let employeeArray = [];
    let roleArray = [];
    let querySpec = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.title AS title FROM employee INNER JOIN id ON employee.id = role.id";

    connection.query("SELCT * FROM employee", function (err, data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let employeeList = data[i].id + " " + data[i].first_name + " " + data[i].last_name;

            employeeArray.push(employeeList);
        }
        connection.query(querySpec, function (err, data) {
            for (let i = 0; i < data.length; i++) {
                let managerList = { name: data[i].title, value: data[i].id };

                employeeArray.push(managerList);
            }
            inquirer.prompt([
                {
                    type: "list",
                    name: "currentEm",
                    message: "Select employee to update",
                    choices: employeeArray
                },
                {
                    type: "list",
                    message: "Select employee's new manager",
                    choices: employeeArray,
                    name: "newMan"
                }
            ]).then(function (data) {
                console.log("Updating information", data);

                connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [data.newMan, data.currentEm], function (err, res) {
                    employeeTracker();
                })
            })
        })
    })
};

// function employeeRem(){

//     let employeeDel= [],
//     connection.query("SELCT * FROM employee", function (err, data) {
//         console.log(data);
//         for (let i = 0; i < data.length; i++) {
//             let emDelete = data[i].id + " " + data[i].first_name + " " + data[i].last_name;
//             employeeDel.push(emDelete);
//         }
//         inquirer.prompt([
//             {
//             type: "list",
//             name: "deleteEntry",
//             message: "Select employee to remove",
//             choices: employeeDel
//             }
//         ]).thenfunction (data) {
//             console.log("//deleting employee entry");

//             const roleId = {};
//             roleId.employeeId = parseInt(data.updateRole.split(" ")[0]);

//     connection.query("DELETE FROM employee WHERE?")
// }