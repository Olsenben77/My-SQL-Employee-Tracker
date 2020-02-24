"use strict";

const CFonts = require("cfonts");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

CFonts.say("Employee|Manager", {
  font: "block", // define the font face
  align: "center", // define text alignment
  colors: ["system"], // define all colors
  background: "transparent", // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: "0", // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false // define if you want to recalculate the gradient for each new line
});
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  database: "employeeTracker_DB",
  user: "root",
  password: "Summer2019!",
  database: "employeeTracker_DB"
});

connection.connect(err => {
  if (err) throw err;

  start();
});

function start() {
  inquirer
    .prompt({
      name: "employeeSelections",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Roles",
        "View All Employees By Manager",
        "Add Employee",
        "Add Department",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Add Role",
        "Remove Role"
      ]
    })
    .then(answer => {
      switch (answer.employeeSelections) {
        case "View All Employees":
          employeeView();
          break;
        case "View All Employees By Department":
          employeeDepartment();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees By Manager":
          employeeManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Update Employee Manager":
          updateManager();
          break;
        case "Add Role":
          addRole();
          break;
        case "Remove Role":
          removeRole();
          break;
        default:
          connection.end();
      }
    });
}
//view all employees
function employeeView() {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}
//view by department
function employeeDepartment() {
  connection.query(
    `
  SELECT  
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title,
    department.name AS department
  FROM
   employee
  LEFT JOIN
    role ON employee.role_id = role.id
  LEFT JOIN
    department ON role.department_id = department.id;
  `,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}
//View all roles
function viewRoles() {
  connection.query(
    `
   SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS role
  FROM
    employee
  LEFT JOIN
    role ON employee.role_id
`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}
// view by manager
// function employeeManager() {
//   connection.query(
//     `
//   SELECT
//     employee.id
//     employee.first_name,
//     employee.last_name,
//     employee.manager_id,
//     role.title AS role
//   FROM
//     employee
//   LEFT JOIN
//   role ON employee.role_id
//     `,
//     (err, results) => {
//       if (err) throw err;
//       console.table(results);
//       start();
//     }
//   );
// }

//Add Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee you would like to add?"
      },
      {
        name: "role",
        type: "rawlist",
        choices: [
          "Lead Engineer",
          "Base Engineer",
          "Junior Engineer",
          "Lead Sales",
          "Base Sales",
          "Junior Sales",
          "Lead Management",
          "Base Management",
          "Junior Management"
        ],
        message: "What is their role?"
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager?"
      }
    ])
    .then(answer => {
      connection.query(
        `
  SELECT  
    employee.id,
    employee.first_name, 
    employee.last_name, 
    role.title,
    role.title AS role
  FROM
   employee
   LEFT JOIN
   role ON employee.role_id = role.id
        `,
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          manager_id: answer.manager
        },
        "INSERT INTO role SET ?",
        {
          title: answer.role
        },
        err => {
          if (err) throw err;
          console.log("Employee successfully added!");
          start();
        }
      );
    });
}
//Add role
function addRole() {
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What is the role you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role you would like to add?",
        validate: value => !isNaN(value)
      },
      {
        name: "department",
        type: "rawlist",
        choices: ["Engineering", "Sales", "Managemnt"],
        message: "What department are they in?"
      }
    ])
    .then(answer => {
      connection.query(
        `
    SELECT  
      role.id,
      role.title, 
      role.salary, 
      role.department_id,
      department.name,
      role.title AS role
    FROM
     role
    LEFT JOIN
     department ON role.id = department.id
          `,
        "INSERT INTO role SET ?",
        {
          title: answer.addRole,
          salary: answer.salary,
          name: answer.department
        },
        err => {
          if (err) throw err;
          console.log("Role successfully added!");
          start();
        }
      );
    });
}
//Add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?"
      }
    ])
    .then(answer => {
      connection.query(
        `
    SELECT  
      department.name,
          `,
        "INSERT INTO department SET ?",
        {
          name: answer.department
        },
        err => {
          if (err) throw err;
          console.log("Department successfully added!");
          start();
        }
      );
    });
}
//Update employee role
function updateRole() {
  connection.query(
    `
  SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS role
  FROM
    employee
    LEFT JOIN
    role ON employee.role_id = role.id
  LEFT JOIN
    department ON role.department_id = department.id;
  `,
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: () => results.map(result => result.last_name),
            message: "By last name, whose role would you like to change?"
          },
          {
            name: "role-change",
            type: "rawlist",
            choices: [
              "Lead Engineer",
              "Base Engineer",
              "Junior Engineer",
              "Lead Sales",
              "Base Sales",
              "Junior Sales",
              "Lead Management",
              "Base Management",
              "Junior Management"
            ],
            message: "Select their updated role:"
          }
        ])
        .then(answer => {
          let chosenRole = results.filter(
            result => result.last_name === answer.choice
          );
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role: chosenRole.role
              }
            ],
            error => {
              if (error) throw err;
              console.log("Employee role changed!");
              start();
            }
          );
        });
    }
  );
}
//Remove Employee
// function removeEmployee() {
//   connection.query(
//     "DELETE FROM employee WHERE ?",
//     {
//
//     },
//     (err, res) => {
//       if (err) throw err;
//       console.log(`${res.affectedRows} products deleted!\n`);
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }
