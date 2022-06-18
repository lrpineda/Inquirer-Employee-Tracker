const inquirer = require("inquirer");
const {
    displayDepartmentsTable,
    getDepartments,
    getDepartmentsTable,
    addDepartment,
    removeDepartment,
    findDepartmentByName,
} = require("../lib/departmentQueries");

class employeeTracker {
    constructor() {
        this.employees = [];
    }

    mainMenu() {
        const options = [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees by Manager",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Role",
            "Delete a Department",
            "Delete a Role",
            "Delete an Employee",
            "Exit"
        ];
        const mainOptions = [
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: options
            }
        ];
        inquirer.prompt(mainOptions).then(({ choice }) => {
            switch (choice) {
                case 'View All Departments':
                    this.displayDepartments();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit();
                    break;
            }
        });
    }

    displayDepartments() {
        console.log('\n');
        console.log('Departments');
        getDepartmentsTable().then(data => {
            console.table(data);
        });
        this.mainMenu();
    }

};

module.exports = employeeTracker;