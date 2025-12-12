


-- 1. How many tasks are in the task table?
SELECT COUNT(*) AS total_tasks
FROM task;


-- 2. How many tasks in the task table do not have a valid due date?
SELECT COUNT(*) AS tasks_without_due_date
FROM task
WHERE due_date IS NULL;


--3 Find all the tasks that are marked as done. 
-- (Assuming status_id = 3 means done)
SELECT id, title, status_id
FROM task
WHERE status_id = 3;



--4 Find all the tasks that are not marked as done.
-- (Assuming status_id = 3 means done)
SELECT id, title, status_id
FROM task
WHERE status_id != 3;


--5 Get all the tasks, sorted with the most recently created first.
SELECT *
FROM task
ORDER BY created DESC;


--6 Get the single most recently created task.
SELECT *
FROM task
ORDER BY created DESC
LIMIT 1;


--7 Get the title and due date of all tasks where the title or description contains database.
SELECT title, due_date
FROM task
WHERE LOWER(title) LIKE '%database%'
	OR LOWER(description) LIKE '%database%';  -- Matches "Database", "DATABASE", "database", or any combination of upper/lowercase letters.
	
	

--8 Get the title and status (as text) of all tasks.
SELECT t.title, s.name
FROM task t
JOIN status s
	ON 	t.status_id = s.id;

--9 Get the name of each status, along with a count of how many tasks have that status.
SELECT s.name , COUNT(t.id) AS task_count
FROM status s
LEFT JOIN task t 
	ON t.status_id = s.id
GROUP BY s.name;

--10 Get the names of all statuses, sorted by the status with most tasks first.
SELECT s.name, COUNT(t.id) AS task_count
FROM status s
LEFT JOIN task t
	ON t.status_id = s.id
GROUP BY s.name
ORDER BY task_count DESC;
