USE employee_trackerDB,

INSERT INTO department (name)
VALUES ("Accounting"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000,1), ("Team Lead", 80000,2), ("Employee", 65000,2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe",1,NULL), ("Mary", "Elizabeth",2,1), ("Jason", "Billingsley",3,1)

