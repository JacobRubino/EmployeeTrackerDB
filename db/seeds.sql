INSERT INTO department (dept_name)
VALUES 
('Finance'),
('Human Resources'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES 
('Finance Manager', 175000, 2),
('HR Specialist', 145000, 3),
('Marketing Coordinator', 118000, 2),
('Digital Marketing Analyst', 100000, 3),
('Financial Analyst', 90000, 2),
('HR Director', 95000, 1),
('Marketing Manager', 60000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Alice', 'Anderson', 1, NULL),
('Bob', 'Brown', 2, 1),
('Catherine', 'Clark', 3, 2),
('Daniel', 'Davis', 4, NULL),
('Emma', 'Evans', 5, 4),
('Frank', 'Foster', 6, NULL),
('Grace', 'Gonzalez', 7, NULL);