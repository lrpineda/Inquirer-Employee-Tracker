const db = require('../db/connection');
const cTable = require('console.table');

// SQL role query
const wholeTable =`SELECT * FROM department`;
const departmentName = `SELECT name FROM department`;

const getDepartmentsTable = () => {

    return db.promise().query(wholeTable)
        .then(([rows]) => {
            return rows;
        });
    
};

const displayDepartmentsTable = () => {
    getDepartmentsTable().then(data => {
        console.log('\n');
        console.table(data);
        console.log('\n');
    });
};

const getDepartments = async () => {
    try {
        const departments = await db.promise().query(departmentName)
        return departments[0].map(item => item.name);
    } catch (err) {
        console.log(err);
    }
};

const addDepartment = async (name) => {
    const sql = `INSERT INTO department (name) VALUES ('${name}')`;
    try {
        const result = await db.promise().query(sql);
        console.log('\n');
        console.log(`Added ${name} to the department table`);
        console.log('\n');
    }
    catch (err) {
        console.log(err);
    }
};

const removeDepartment = async (name) => {
    const sql = `DELETE FROM department WHERE name = '${name}'`;
    try {
        const result = await db.promise().query(sql);
        console.log('\n');
        console.log(`Removed ${name} from the department table`);
        console.log('\n');
    }
    catch (err) {
        console.log(err);
    }
};

const findDepartmentByName = async (name) => {
    try {
        const department = await db.promise().query(`SELECT id FROM department WHERE name = '${name}'`)
        return department[0][0].id;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    displayDepartmentsTable,
    getDepartments,
    addDepartment,
    removeDepartment,
    findDepartmentByName
};