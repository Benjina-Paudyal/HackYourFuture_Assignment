-- Week 2 Assignment - Databases
-- Student: Benjina

-- Part A, Question 1: COunt the total number of tasks in the database
SELECT COUNT (*) AS total_tasks
FROM task;

-- Part A, Question 2: Count how many tasks each user has been assigned (include users with zero tasks)
SELECT u.name, COUNT(t.id) AS task_count
FROM user user
LEFT JOIN task t ON u.id = t.user_id
GROUP BY u.id, u.name

-- Part A, Question 3: Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")
SELECT s.name AS status_name, COUNT(t.id) AS task_count
FROM status status
LEFT JOIN task t ON s.id = t.status_id
GROUP BY s.id, s.name;

-- Part A, Question 4: Find the user who has the most tasks assigned
SELECT u.name, COUNT(t.id) AS task_count
FROM user user
JOIN task t ON u.id = t.user_id
GROUP BY u.id, u.name
ORDER BY task_count DESC
LIMIT 1;

-- Part A, Question 5: Calculate the average number of tasks per user (only count users who have at least one task)
SELECT AVG(task_count) AS average_tasks_per_active_user
FROM (
    SELECT COUNT(id) AS task_count
    FROM task
    WHERE user_id IS NOT NULL
    GROUP BY user_id
);

-- Part A, Question 6:  Find the earliest and latest due date across all tasks
SELECT MIN(due_date) AS earliest_due_date,
       MAX(due_date) AS latest_due_date
FROM task;


-- Part A, Question 7:  List each category along with the number of tasks it contains, ordered from most to least tasks
SELECT c.name, COUNT(tc.task_id) AS task_count
FROM category category
LEFT JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id, c.name
ORDER BY task_count DESC;

-- Part A, Question 8: Find all users who have more than 2 tasks assigned to them
SELECT u.name, COUNT(t.id) AS task_count
FROM user user
JOIN task t ON u.id = t.user_id
GROUP BY u.id, u.name
HAVING COUNT(t.id) > 2;

-- Part B, Question 1: SQL Injection Explanation
/*
1. What happens:
If userName is set to ' OR '1'='1, the resulting query becomes: 
SELECT * FROM task WHERE user_id = ( SELECT id FROM user WHERE name = '' OR '1'='1');

2. What data would be returned:
This will return IDs for every user in the database which in return could expose every task stored in the system to the attacker.

3. Why is this dangerous:
Instead of just searching for a name, the attacker can force the database to reveal hidden data, bypass security walls like 
login or even delete every information. 

4. Malicious string
' ; DELETE FROM task; --
By typing ' ;, they force the current command to end early. Then , they simply add their own command like DELETE right after it.
Finally, they use -- to delete the rest of the original code so the database doesn't get confused

5. Fixing vulnerability
To fix the vulnerability, we use Parametirized Quiries

SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = ?);
*/

-- Part C : Transactions : Question 1
BEGIN TRANSACTION;
  UPDATE task SET user_id = 2 WHERE user_id = 1;
  DELETE FROM user WHERE id = 1;
COMMIT;

-- Part C : Transactions : Question 2
BEGIN TRANSACTION; -- BEGIN
  UPDATE task SET user_id = 3 WHERE user_id = 1; -- COMMIT 
  UPDATE task SET status_id = 999 WHERE id = 1; -- TRIGGER A FAILURE
ROLLBACK;

-- Part D : Putting It All Together : Question 1
BEGIN TRANSACTION;
    INSERT INTO category (name) VALUES ('Urgent');
    INSERT INTO task:category (task_id, category_id)
    SELECT t.id, last_insert_rowid()
    FROM task t
    JOIN status s ON t.status_id = s.id
    WHERE s.name IN ('Not started', 'In progress');
COMMIT;

-- Part D : Putting It All Together : Question 2

SELECT 
    -- Total number of tasks
    (SELECT COUNT(*) FROM task) AS total_tasks,

    -- Number of completed tasks (status = "Done")
    (SELECT COUNT(*)
    FROM task t
    JOIN status s ON t.status_id = s.id
    WHERE s.name = 'Done') AS completed_tasks,
    
    -- Number of overdue tasks (due_date < today)
    (SELECT COUNT (*)
    FROM task
    WHERE due_date < DATE('now')
    AND due_date IS NOT NULL) AS overdue_tasks,

    -- Number of users with at least one task
    (SELECT COUNT(DISTINCT user_id)
    FROM task
    WHERE user_id IS NOT NULL) AS active_users;