USE Vle



#courses having 50 plus students 
CREATE VIEW course_50_plus AS
SELECT courseCode, COUNT(userID) as student_count
FROM Enrol
GROUP BY courseCode
HAVING COUNT(userID) >= 50;


#lecturers teaching 3 or more courses 
CREATE VIEW lecturers_3_plus AS
SELECT u.userID, u.fname, u.lname, COUNT(t.courseCode) AS num_courses
FROM UserAccount u
JOIN Teaches t ON u.userID = t.userID
GROUP BY u.userID, u.fname, u.lname
HAVING COUNT(t.courseCode) >= 3;