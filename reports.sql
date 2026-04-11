USE Vle

--All courses that have 50 or more students(ASH)
CREATE VIEW course_50_plus AS
SELECT courseCode, COUNT(userID) as student_count
FROM Enrol
GROUP BY courseCode
HAVING COUNT(userID) >= 50;

--All students that do 5 or more courses.(Jada-Marie)
CREATE VIEW students_5_plus_courses AS
SELECT u.userID, u.fname, u.lname, COUNT(e.courseCode) AS numCourses
FROM UserAccount u
JOIN Enrol e ON u.userID = e.userID
GROUP BY u.userID, u.fname, u.lname
HAVING COUNT(e.courseCode) >= 5;

--All lecturers that teach 3 or more courses.(ASH)
CREATE VIEW lecturers_3_plus AS
SELECT u.userID, u.fname, u.lname, COUNT(t.courseCode) AS num_courses
FROM UserAccount u
JOIN Teaches t ON u.userID = t.userID
GROUP BY u.userID, u.fname, u.lname
HAVING COUNT(t.courseCode) >= 3;

--The 10 most enrolled courses.(Jada-Marie)
CREATE VIEW ten_most_enrolled AS
SELECT c.courseCode, c.CourseName, c.department, COUNT(e.userID) AS totalStudents
FROM Course c
JOIN Enrol e ON c.courseCode = e.courseCode
GROUP BY c.courseCode, c.courseName
ORDER BY totalStudents DESC
LIMIT 10;

--The top 10 students with the highest overall averages.(Jada-Marie)
CREATE VIEW top_ten_students AS
SELECT u.userID, u.fname, u.lname, AVG(e.grade) AS average
FROM UserAccount u
JOIN Enrol e ON u.userID = e.userID
GROUP BY u.userID, u.fname, u.lname
ORDER BY average DESC
LIMIT 10;
