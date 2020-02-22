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
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
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
        case "View All Employees By Manager":
          employeeManager();
          break;
        case "Add Employee":
          addEmployee();
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
        case "View All Roles":
          viewRoles();
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
function employeeView() {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
}
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
function employeeManager(manager_id) {
  connection.query(
    "SELECT * FROM employee WHERE manager_id = ?",
    { manager_id },
    (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}
function addEmployee() {}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  const query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products updated!\n`);
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream because it's gross...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products deleted!\n`);
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}
