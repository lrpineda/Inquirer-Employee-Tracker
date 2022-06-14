const db = require('./db/connection');
const cTable = require('console.table');

const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
               FROM employee e
               LEFT JOIN role ON e.role_id = role.id
               LEFT JOIN department ON role.department_id = department.id
               LEFT JOIN employee m ON m.id = e.manager_id`;

db.query(sql, (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        console.table(rows);
    }
});