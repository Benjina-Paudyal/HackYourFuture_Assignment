
-- user table: stores user information
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT
);


-- status table: stores status of the task
CREATE TABLE status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

 
-- task table: stores task assigned to users
CREATE TABLE task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL,
    due_date DATETIME,
    status_id INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (status_id) REFERENCES status(id)
);


-- values into status table
INSERT INTO status (name) VALUES ('Not started');
INSERT INTO status (name) VALUES ('In progress');
INSERT INTO status (name) VALUES ('Done');


-- relationship table: user_task

CREATE TABLE user_task (
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- PART 1: BASIC CRUD OPERATIONS

-- Question 1: Insert a new user with your own name and email
INSERT INTO user (name, email, phone) VALUES ('Benjina', 'benjmix79@gmail.com','71619290');

-- Question 2:Insert a new task assigned to yourself with the following attributes: 1.Title: "Learn SQL" 2.Description: "Practice database queries" 3.Status: "In Progress" 4.Due date: One week from today
INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Learn SQL', 'Practice database queries', datetime('now'), datetime('now'), date('now', '+7 days'), 2);

-- Question 3: update the title of a task
UPDATE task SET title = 'Master SQL Basics' WHERE title = 'Learn SQL'; 

-- Question 4: Change the due date of your task to two weeks from today
UPDATE task SET due_date = DATE('now','+14 days') WHERE title = 'Master SQL Basics';

-- Question 5: Change the status of your task to "Done"
UPDATE task SET status_id = 3 WHERE title = 'Master SQL Basics';

-- Question 6: Delete one of the tasks in the database (choose any task)
DELETE FROM task WHERE title = 'Master SQL Basics';



-- Part 2:  WORKING WITH RELATIONSHIPS

-- Question 1: List all users who don't have any tasks assigned
SELECT u.* 
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id 
WHERE ut.task_id IS NULL;


-- Question 2: Find all tasks with a status of "Done"
SELECT t.*
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name = 'Done';


-- Question 3: Find all overdue tasks (due_date is earlier than today)
SELECT *
FROM task
WHERE due_date < DATE('now');



-- PART  3: MODIFYING THE DATABASE SCHEMA

-- Question 1: Add a new column called priority to the task table with possible values: 'Low', 'Medium', 'High'. 💡 Remember to provide default values.
ALTER TABLE task ADD COLUMN priority TEXT NOT NULL DEFAULT 'Medium';

-- Question 2: Update some existing tasks to have different priority values
UPDATE task SET priority = 'High' WHERE id = 1;
UPDATE task SET priority = 'Medium' WHERE id = 2;
UPDATE task SET priority = 'Low' WHERE id = 3;

-- Question 3: Create a new table called category with columns: 1. id (PRIMARY KEY) 2. name (e.g., "Work", "Personal", "Study") 3.color (e.g., "red", "blue", "green")
CREATE TABLE category (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
	color TEXT NOT NULL
);

-- Question 4: Create a linking table called task_category to establish a many-to-many relationship between tasks and categories: 1.task_id (FOREIGN KEY to task.id) 2.category_id (FOREIGN KEY to category.id)
CREATE TABLE task_category (
    task_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, category_id),
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Question 5: Insert at least 3 categories
INSERT OR IGNORE INTO category (name, color) VALUES ('Work', 'red');
INSERT OR IGNORE INTO category (name, color) VALUES ('Personal', 'blue');
INSERT OR IGNORE INTO category (name, color) VALUES ('Study', 'green');


-- Question 6: Assign categories to at least 5 different tasks
INSERT INTO task_category (task_id, category_id) VALUES (1, 3);
INSERT INTO task_category (task_id, category_id) VALUES (1, 1);
INSERT INTO task_category (task_id, category_id) VALUES (2, 3);
INSERT INTO task_category (task_id, category_id) VALUES (2, 2);
INSERT INTO task_category (task_id, category_id) VALUES (3, 1);


-- PART 4: ADVANCED QUIRIES

-- Question 1: 
Find all tasks in a specific category (e.g., "Work")
SELECT t.*
FROM task t
JOIN task_category tc ON t.id = tc.task_id
JOIN category c ON c.id = tc.category_id
WHERE c.name = 'Work';

-- Question 2: List tasks ordered by priority (High to Low) and by due date (earliest first)
SELECT *
FROM task
ORDER BY 
    CASE priority
        WHEN 'High' THEN 1
        WHEN 'Medium' THEN 2
        WHEN 'Low' THEN 3
        ELSE 4
    END,
    due_date ASC;


-- Question 3: Find which category has the most tasks
SELECT c.name, COUNT(tc.task_id) AS task_count
FROM category c
JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id
ORDER BY task_count DESC
LIMIT 1;


-- Question 4: Get all high priority tasks that are either "In Progress" or "To Do"
SELECT t.*
FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.priority = 'High'
AND s.name IN ('In progress', 'Not started');

-- Question 5: Find users who have tasks in more than one category
SELECT u.id, u.name, COUNT(DISTINCT tc.category_id) AS category_count
FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task_category tc ON ut.task_id = tc.task_id
GROUP BY u.id, u.name
HAVING COUNT(DISTINCT tc.category_id) > 1;



