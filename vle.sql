DROP DATABASE IF EXISTS Vle; 
CREATE DATABASE Vle;
USE Vle;

-- Users

CREATE TABLE UserAccount(
    userID INT PRIMARY KEY, -- userID is 9 digits long ( 620 students, 200 - staff, 111 - admin )
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    accessLvl ENUM('student','lecturer','admin') NOT NULL, --They go to uwi and uwi makes the account for them
    password VARCHAR(100) NOT NULL
);

-- Courses
CREATE TABLE Course(
    courseCode VARCHAR(8) PRIMARY KEY,
    courseName VARCHAR(50) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL
);

-- Course Membership (students/roles)
CREATE TABLE CourseMember(
    userID INT NOT NULL,
    memberRole ENUM('student','lecturer') NOT NULL,
    courseCode VARCHAR(8) NOT NULL,
    FOREIGN KEY (userID) REFERENCES UserAccount(userID) ON DELETE CASCADE,
    FOREIGN KEY (courseCode) REFERENCES Course(courseCode) ON DELETE CASCADE,
    PRIMARY KEY (userID, courseCode) -- ensures no duplicates
);

-- Discussion Forums
CREATE TABLE DiscussionForum(
    dfID INT PRIMARY KEY, 
    dfname VARCHAR(50) NOT NULL,
    courseCode VARCHAR(8) NOT NULL,
    FOREIGN KEY (courseCode) REFERENCES Course(courseCode) ON DELETE CASCADE
);

-- Discussion Threads
CREATE TABLE DiscussionThread(
    dtID INT PRIMARY KEY, 
    dfID INT NOT NULL, 
    parentpostID INT NULL,
    userID INT NOT NULL,
    threadbody VARCHAR(500),
    topic VARCHAR(20),
    date_created DATE,
    FOREIGN KEY (dfID) REFERENCES DiscussionForum(dfID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES UserAccount(userID) ON DELETE CASCADE,
    FOREIGN KEY (parentpostID) REFERENCES DiscussionThread(dtID) ON DELETE CASCADE
);

-- Sections
CREATE TABLE CourseSection(
    secID INT PRIMARY KEY,
    secname VARCHAR(50) NOT NULL,
    courseCode VARCHAR(8) NOT NULL,
    FOREIGN KEY (courseCode) REFERENCES Course(courseCode) ON DELETE CASCADE
);

-- Section Items
CREATE TABLE SectionItems(
    secItemID INT PRIMARY KEY,
    secID INT NOT NULL,
    title VARCHAR(50),
    secBody VARCHAR(500),
    secContent LONGBLOB, -- Use a fake docment generator 
    itemtype VARCHAR(15), -- assignment, links, files, slides
    dueDate DATE,
    FOREIGN KEY (secID) REFERENCES CourseSection(secID) ON DELETE CASCADE
);

-- Course Calendar
CREATE TABLE CourseCalendar(
    calenderID INT PRIMARY KEY,      --fixspelling
    courseCode VARCHAR(8) NOT NULL,
    FOREIGN KEY (courseCode) REFERENCES Course(courseCode) ON DELETE CASCADE
);

-- Calendar Events
CREATE TABLE CalendarEvents(
    eventID INT PRIMARY KEY,
    calenderID INT NOT NULL,
    eventDate DATE,
    eventTitle VARCHAR(50),
    secItemID INT,
    FOREIGN KEY (calenderID) REFERENCES CourseCalendar(calenderID) ON DELETE CASCADE
);

-- Submissions
CREATE TABLE Submission(
    subID INT PRIMARY KEY,
    userID INT NOT NULL,
    secItemID INT NOT NULL,
    subText VARCHAR(200),
    subContent LONGBLOB,-- Use a fake document generator 
    submDate DATE,
    grade INT,
    FOREIGN KEY (userID) REFERENCES UserAccount(userID) ON DELETE CASCADE,
    FOREIGN KEY (secItemID) REFERENCES SectionItems(secItemID) ON DELETE CASCADE
);

-- Enrollment
CREATE TABLE Enrol(
    userID INT NOT NULL,
    courseCode VARCHAR(8) NOT NULL,
    grade INT,
    FOREIGN KEY (userID) REFERENCES UserAccount(userID) ON DELETE CASCADE,
    FOREIGN KEY (courseCode) REFERENCES Course(courseCode) ON DELETE CASCADE,
    PRIMARY KEY (userID, courseCode) 
);

-- Teaching Assignment
CREATE TABLE Teaches(
    userID INT NOT NULL,
    courseCode VARCHAR(8) NOT NULL,
    FOREIGN KEY (userID) REFERENCES UserAccount(userID) ON DELETE CASCADE,
    FOREIGN KEY (courseCode) REFERENCES Course(courseCode) ON DELETE CASCADE,
    PRIMARY KEY (userID, courseCode)
);
