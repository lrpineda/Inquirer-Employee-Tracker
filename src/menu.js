const {
    displayDepartmentsTable,
    getDepartments,
    addDepartment,
    removeDepartment,
    findDepartmentByName,
} = require("../lib/departmentQueries");
const {
    displayRolesTable,
    getRoles,
    findRoleByTitle,
    addRole,
    removeRole,
} = require("../lib/roleQueries");
const {
    viewAllEmployees,
    findEmployyeByName,
    getEmployees,
    addEmployee,
    updateEmployeeRole,
    sortByManager,
    deleteEmployee,
} = require("../lib/employeeQueries");
const inquirer = require("inquirer");

const logo = `
.---------------------------------------------------------------------------.
|     ______  __  __  _____   _        ____  __     __  ______   ______     |
|    |  ____||  \\/  ||  __ \\ | |      / __ \\ \\ \\   / / |  ____| |  ____|    |
|    | |__   | \\  / || |__) || |     | |  | | \\ \\_/ /  | |__    | |__       |
|    |  __|  | |\\/| ||  ___/ | |     | |  | |  \\   /   |  __|   |  __|      |
|    | |____ | |  | || |     | |____ | |__| |   | |    | |____  | |____     |
|    |______||_|  |_||_|     |______| \\____/    |_|    |______| |______|    |
|                                                                           |
|            __  __   ___   _   _   ___    _____  ______  _____             |
|           |  \\/  | / _ \\ | \\ | | / _ \\  / ____||  ____||  __ \\            |
|           | \\  / || |_| ||  \\| || |_| || |  __ | |__   | |__) |           |
|           | |\\/| ||  _  || .   ||  _  || | |_ ||  __|  |  _  /            |
|           | |  | || | | || |\\  || | | || |__| || |____ | | \\ \\            |
|           |_|  |_||_| |_||_| \\_||_| |_| \\_____||______||_|  \\_\\           |
.---------------------------------------------------------------------------.
`;

// Add employee function
const addEmployeePrompt = async () => {
    const roles = await getRoles();
    const managers = ["None"].concat(await getEmployees());
    const { firstName, lastName, selectedRole, selectedManager } =
        await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                validate: (firstNameInput_1) => {
                    if (firstNameInput_1) {
                        return true;
                    } else {
                        return "Please enter a first name.";
                    }
                },
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: (lastNameInput_1) => {
                    if (lastNameInput_1) {
                        return true;
                    } else {
                        return "Please enter a last name.";
                    }
                },
            },
            {
                type: "list",
                name: "selectedRole",
                message: "What is the employee's role?",
                choices: roles,
            },
            {
                type: "list",
                name: "selectedManager",
                message: "Who is the employee's manager?",
                choices: managers,
            },
        ]);
    // Split the manager name into first and last name
    const splitName = selectedManager.split(" ");
    const roleId = await findRoleByTitle(selectedRole);
    const managerId =
        selectedManager === "None" ? null : await findEmployyeByName(splitName);
    const newEmployee = {
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId,
    };
    addEmployee(newEmployee);
    mainMenu();
};

// Add department function
const addDepartmentPrompt = async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?",
            validate: (nameInput_1) => {
                if (nameInput_1) {
                    return true;
                } else {
                    console.log("Please enter a name");
                    return false;
                }
            },
        },
    ]);
    addDepartment(name);
    mainMenu();
};
// Add role function
const addRolePrompt = async () => {
    const departments = await getDepartments();
    const { title, salary, selectedDepartment } = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role's title?",
            validate: (titleInput_1) => {
                if (titleInput_1) {
                    return true;
                } else {
                    console.log("Please enter a title");
                    return false;
                }
            },
        },
        {
            type: "number",
            name: "salary",
            message: "What is the role's salary?",
            validate: (salaryInput_1) => {
                if (salaryInput_1) {
                    return true;
                } else {
                    console.log("Please enter a salary");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "selectedDepartment",
            message: "What is the role's department?",
            choices: departments,
        },
    ]);
    const departmentId = await findDepartmentByName(selectedDepartment);
    const newRole = {
        title: title,
        salary: salary,
        departmentId: departmentId,
    };
    addRole(newRole);
    mainMenu();
};
// Update employee role function
const updateEmployeeRolePrompt = async () => {
    const employees = await getEmployees();
    const roles = await getRoles();
    const { employee, role } = await inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role would you like to update?",
            choices: employees,
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's new role?",
            choices: roles,
        },
    ]);
    const splitName = employee.split(" ");
    const employeeId = await findEmployyeByName(splitName);
    const roleId = await findRoleByTitle(role);
    updateEmployeeRole(employeeId, roleId);
    mainMenu();
};
// Delete department function
const deleteDepartmentPrompt = async () => {
    const departments = await getDepartments();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "What is the name of the department you want to remove?",
            choices: departments,
        },
    ]);
    removeDepartment(name);
    mainMenu();
};

// Delete role function
const deleteRolePrompt = async () => {
    const roles = await getRoles();
    const { title } = await inquirer.prompt([
        {
            type: "list",
            name: "title",
            message: "What is the title of the role you want to remove?",
            choices: roles,
        },
    ]);
    const roleId = await findRoleByTitle(title);
    removeRole(roleId);
    mainMenu();
};

// Delete role function
const deleteEmployeePrompt = async () => {
    const employees = await getEmployees();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "What is the name of the employee you want to remove?",
            choices: employees,
        },
    ]);
    const splitName = name.split(" ");
    const employeeId = await findEmployyeByName(splitName);
    deleteEmployee(employeeId);
    mainMenu();
};

// Main menu function
const mainMenu = () => {
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
        "Exit",
    ];
    console.log("\n");
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: options,
            },
        ])
        .then(({ choice }) => {
            switch (choice) {
                case "View All Departments":
                    displayDepartmentsTable();
                    return mainMenu();
                case "View All Roles":
                    displayRolesTable();
                    return mainMenu();
                case "View All Employees":
                    viewAllEmployees();
                    console.log("\n");
                    return mainMenu();
                case "View Employees by Manager":
                    sortByManager();
                    return mainMenu();
                case "Add a Department":
                    addDepartmentPrompt();
                    break;
                case "Add a Role":
                    addRolePrompt();
                    break;
                case "Add an Employee":
                    addEmployeePrompt();
                    break;
                case "Update Employee Role":
                    updateEmployeeRolePrompt();
                    break;
                case "Delete a Department":
                    deleteDepartmentPrompt();
                    break;
                case "Delete a Role":
                    deleteRolePrompt();
                    break;
                case "Delete an Employee":
                    deleteEmployeePrompt();
                    break;
                case "Exit":
                    process.exit();
            }
        });
};

module.exports = {
    mainMenu,
    logo,
};
