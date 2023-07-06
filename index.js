const { prompt } = require("inquirer");
const { createConnection } = require("mysql");

const connection = createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Chipotle123!",
  database: "employeeTrackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the Employee Tracker!");
  generateMenu()
});

const ShowDepts = () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    generateMenu();
  });
};
const showEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    generateMenu()
  });
};
const showRoles = () => {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    generateMenu()
  });
};
const addDept = () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the department you would like to add?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO department (name) VALUES (?)",
          [answer.deptName], 
          function (err, res) {
            if (err) throw err;
            console.table(res);
            generateMenu()
          }
        );
      });
  });
};
const addRole = () => {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role you would like to add?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the role you would like to add?",
        },
        {
          type: "input",
          name: "roleDept",
          message:
            "What is the department ID of the role you would like to add?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
          [answer.roleName, answer.roleSalary, answer.roleDept],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            generateMenu();
          }
        );
      });
  });
};
const makeEmployee = () => {
  prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "roleID",
      type: "input",
      message: "What is the employee's role ID?",
    },
    {
      name: "managerID",
      type: "input",
      message: "What is the employee's manager ID?",
    }
  ]).then(function (answer) {
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
      function (err, res) {
        if (err) throw err;
        generateMenu();
      }      
    );
  });
};
const updateEmployeeRole = () => {
  prompt([
    {
      name: "roleID",
      type: "input",
      message: "What is the employees id?",
    },
    {
      name: "newRoleID",
      type: "input",
      message: "What is the employees new role ID?",
    }
  ])
  .then(function (answer) {
    connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [answer.newRoleID, answer.roleID],
      function (err, res) {
        if (err) throw err;
        generateMenu();
      }
    )
  });
};
const generateMenu = () => {
  prompt([
    {
      message: 'Please select one of the following options:',
      name: "menuChoice",
      type: "list",
      choices: [
        'All departments',
        'All roles',
        'All employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(function (answer) {
    switch (answer.menuChoice) {
      case 'All departments':
        ShowDepts()
        break;
      case 'All roles':
        showRoles()
        break;
      case 'All employees':
        showEmployees();
        break;
      case 'Add a department':
        addDept();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        makeEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        connection.end();
    }
  });
};
