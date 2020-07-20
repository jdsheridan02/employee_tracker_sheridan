const inquirer = require("inquirer"),
    cTable = require("console.table"),
    mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: "root",

//     // Your password
//     password: "Luffy1sKing",
//     database: "employee_trackerDB"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     runSearch();
// });

employeeTracker();

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
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Add department",
                "Add Role",
                "Remove department",
                "Remove role",
                "Remove employee",
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

                case "View all employees by department":
                    employeeDept();
                    break;

                case "View all employees by manager":
                    employeeMan();
                    break;

                case "Add employee":
                    employeeAdd();
                    break;

                case "Remove employee":
                    employeeRem();
                    break;

                case "Update employee role":
                    employeeRole();
                    break;

                case "Update employee manager":
                    updateMan();
                    break;

                case "View all roles":
                    allRoles();
                    break;

                // case "End":
            }
        });
};

function employeeSearch() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, data) {
        console.log("//pulling all Employee information");
        console.table(data);
    });
    employeeTracker();
};

function roleSearch() {
    connection.query("SELECT * FROM role", function (err, data) {
        console.log("//search for all company roles");
        console.table(data);
    });
    employeeTracker();
};

function deptSearch() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.log("//search for all departments");
        console.table(data);
    });
    employeeTracker();
};

function employeeDept() {

    employeeTracker();
};

function employeeMan() {

    employeeTracker();
};

function employeeAdd() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter employee first name",
            name: "firstname"
        },
        {
            type: "input",
            message: "Enter employee last name",
            name: "lastname"
        }
    ])

    employeeTracker();
};

function employeeRem() {

    employeeTracker();
};

function employeeRole() {

    employeeTracker();
};

function updateMan() {

    employeeTracker();
};

function allRoles() {

    employeeTracker();
};