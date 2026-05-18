-- THESE ARE FOR THE PRESENTATION - MONDAY 5/18/2026

-- a.At least 100,000 students

SELECT COUNT(*) AS total_students
FROM UserAccount
WHERE accessLvl = 'student';

-- b. At least 200 courses
SELECT COUNT(*) AS total_courses
FROM Course;

-- c. No student can do more than 6 courses
-- SHOULD RETURN NOTHING 

SELECT userID, COUNT(*) AS course_count
FROM Enrol
GROUP BY userID
HAVING COUNT(*) > 6;



-- d. A student must be enrolled in at least 3 courses
-- ( SHOULD RETURN NOTHING ) 

SELECT userID, COUNT(*) AS course_count
FROM Enrol
GROUP BY userID
HAVING COUNT(*) < 3;


-- ( SHOULD RETURN MOST STUDENTS ) 
SELECT userID, COUNT(*) AS course_count
FROM Enrol
GROUP BY userID
HAVING COUNT(*) > 3;



-- e. Each Course must have at least 10 members 
SELECT courseCode, COUNT(*) AS member_count
FROM Enrol
GROUP BY courseCode
HAVING COUNT(*) < 10;

-- f. No lecturer can teach more than 5 courses
-- ( SHOULD RETURN NOTHING )
SELECT userID, COUNT(*) AS course_count
FROM Teaches
GROUP BY userID
HAVING COUNT(*) > 5;


-- g. A lecturer must teach at least 1 course
-- ( SHOULD RETURN NOTHING )
SELECT u.userID
FROM UserAccount u
LEFT JOIN Teaches t ON u.userID = t.userID
WHERE u.accessLvl = 'lecturer'
GROUP BY u.userID
HAVING COUNT(t.courseCode) = 0;

-- SHOULD RETURN MOST LECTURERS 
SELECT u.userID, u.fname, u.lname
FROM UserAccount u
LEFT JOIN Teaches t ON u.userID = t.userID
WHERE u.accessLvl = 'lecturer'
GROUP BY u.userID
HAVING COUNT(t.courseCode) > 0;