DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT manager_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

USE employeeTracker_DB;  

INSERT INTO department
    (name)
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Management');

INSERT INTO role 
    (title, salary, department_id)
VALUES  
    ('Lead Engineer', 150000, 1),
    ('Base Engineer', 100000, 1),
    ('Junior Engineer', 60000, 1),
    ('Lead Sales', 200000, 2),
    ('Base Sales', 100000, 2),
    ('Junior Sales', 60000, 2),
    ('Lead Management', 200000, 3),
    ('Base Management', 100000, 3),
    ('Junior Management', 60000, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Andy', 'Reid', 1, NULL),
    ('Matt', 'LaFleur', 2, 1),
    ('Mike', 'Zimmer', 3, 1),
    ('Jason', 'Garrett', 4, NULL),
    ('Bill', 'Belichek', 5, 2),
    ('Mike', 'Tomlin', 6, 2),
    ('Mike', 'Vrabel', 7, NULL),
    ('Pete', 'Carrol', 8, 3),
    ('John', 'Gruden', 8, 3);
    
  
    

  
