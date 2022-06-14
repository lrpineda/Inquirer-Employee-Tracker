INSERT INTO department (name) 
VALUES 
('Sales'),
('IT'),
('Finance'),
('Marketing'),
('HR'),
('Development'),
('Administrative');

INSERT INTO role (title, salary, department_id)
VALUES 
 ('Sales Representative', 50000, 1),
 ('Sales Manager', 75000, 1),
 ('Sales Administrator', 65000, 1),
 ('IT Manager', 85000, 2),
 ('IT Administrator', 65000, 2),
 ('IT Cyber Security', 75000, 2),
 ('Accountant', 80000, 3),
 ('Accounts Manager', 90000, 3),
 ('Accounts Administrator', 65000, 3),
 ('Marketing Manager', 90000, 4),
 ('Marketing Administrator', 80000, 4),
 ('Marketing Representative', 60000, 4),
 ('HR Manager', 75000, 5),
 ('HR Administrator', 60000, 5),
 ('HR Representative', 55000, 5),
 ('Software Engineer', 120000, 6),
 ('Software Architect', 100000, 6),
 ('Software Quality Assurance', 60000, 6),
 ('Software Quality Engineer', 75000, 6),
 ('CEO', 200000, 7),
 ('CFO', 150000, 7),
 ('CIO', 105000, 7),
 ('CTO', 100000, 7),
 ('COO', 175000, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tony', 'Stark', 20, NULL),
('Steve', 'Rogers', 21, 1),
('Bruce', 'Banner', 22, 1),
('Natasha', 'Romanov', 23, 1),
('Peter', 'Parker', 24, 1),
('Thor', 'Odinson', 2, 2),
('Luke', 'Charles' ,4, 5),
('Carol', 'Danvers', 10, 3),
('Scott', 'Summers', 13, 3),
('Peter', 'Quill', 16, 4),
('Steven', 'Strange', 19, 10),
('Clint', 'Barton', 6, 7),
('Scott', 'Lang', 5, 7),
('Wanda', 'Maximoff', 7, 2),
('Kate', 'Bishop', 8, 14),
('Steven', 'Grant', 1, 3),
('Marc', 'Spector', 3, 3);

SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee m ON m.id = e.manager_id;