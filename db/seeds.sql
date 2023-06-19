use employees_db;

INSERT INTO department 
    (name)
VALUES 
    ('Fundraising'),
    ('Compliance'),
    ('Digital');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Partner', 150000, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('', '', )