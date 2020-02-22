USE employeeTracker_DB  

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
    ('John', 'Code', 1, NULL),
    ('Jeff', 'Code', 1, NULL),
    ('John', 'Code', 1, NULL),
    ('John', 'Code', 1, NULL),
    ('John', 'Code', 1, NULL),
    ('John', 'Code', 1, NULL),
    ('John', 'Code', 1, NULL),
    ('John', 'Code', 1, NULL),
    

  


