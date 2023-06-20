USE employees_db;

INSERT INTO department (name)
VALUES ('Fundraising'), ('Compliance'), ('Digital');

INSERT INTO role (title, salary, department_id)
VALUES ('Partner', 150000, 3), ('Digital Director', 100000, 3), ('Compliance Asst', 70000, 2), ('Major Gifts Coordinator', 85000, 1), ('Digital Content Manager', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Samantha', 'Peterson', 1, NULL), ('Kirstyn', 'Rowen', 5, 1), ('Camille', 'Jones', 4, NULL);
