import os
from flask import Flask
from flask import render_template, request, redirect, url_for, flash, session, abort, send_from_directory, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from datetime import date
import mysql.connector


app = Flask(__name__)



def get_db_connection():
    connection = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="your_database")
    return connection

#Test Route 
@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello world"})


#Test Route 
@app.route('/users', methods=['GET']) 
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall() 
    cursor.close() 
    conn.close()
    return jsonify(users)

# POST /auth/login - login only (Ashani)
@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT userID, fname, lname, accessLvl FROM UserAccount WHERE email=%s AND password=%s",
                   (email, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({"message": "Login successful", "user": user}), 200
    return jsonify({"error": "Invalid credentials"}), 401


# GET /users/{userID} - fetch user profile (Ashani)
@app.route("/users/<int:userID>", methods=["GET"])
def get_user(userID):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT userID, fname, lname, email, accessLvl FROM UserAccount WHERE userID=%s", (userID,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


# GET /courses - list all courses (Ashani)
@app.route("/courses", methods=["GET"])
def list_courses():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT courseCode, courseName, department FROM Course")
    courses = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(courses), 200


# GET /students/{userID}/courses - get the courses done by a student
@app.route("/students/<int:userID>/courses", methods=["GET"])
def student_courses(userID):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.courseCode, c.courseName, c.department
        FROM Course c
        JOIN CourseMember cm ON c.courseCode = cm.courseCode
        WHERE cm.userID = %s AND cm.memberRole = 'student'
    """, (userID,))
    courses = cursor.fetchall()
    cursor.close()
    conn.close()

    if courses:
        return jsonify(courses), 200
    return jsonify({"error": "No courses found for student"}), 404
    

# GET /lecturers/{userID}/courses - get the courses a lecturer teachers (Ashani)
@app.route("/lecturers/<int:userID>/courses", methods=["GET"])
def lecturer_courses(userID):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.courseCode, c.courseName, c.department
        FROM Course c
        JOIN CourseMember cm ON c.courseCode = cm.courseCode
        WHERE cm.userID = %s AND cm.memberRole = 'lecturer'
    """, (userID,))
    courses = cursor.fetchall()
    cursor.close()
    conn.close()

    if courses:
        return jsonify(courses), 200
    return jsonify({"error": "No courses found for lecturer"}), 404


# GET /courses/{courseCode}/members - view other participants in the course ( ASH )
@app.route('/courses/<courseCode>/members', methods=['GET']) 
def get_members(courseCode):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute(("""SELECT u.fname, u.lname
                        FROM UserAccount u
                        JOIN CourseMember cm 
                        ON u.userID = cm.userID
                        WHERE cm.courseCode = %s;""",(courseCode,)))
    members = cursor.fetchall() 
    cursor.close() 
    conn.close()


    return jsonify(members)


# GET /students/{userID}/grades - student grades for each course ( ASH )
@app.route('/students/<userID>/grades', methods=['GET']) 
def get_student_grades(userID):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 

    cursor.execute(("""SELECT grade, courseCode 
                        FROM Enrol
                        WHERE userID = %s;""",(userID,)))
    
    grades = cursor.fetchall() 
    cursor.close() 
    conn.close()

    return jsonify(grades)


# GET /students/{userID}>/{courseCode}/grades - student grades for one course ( ASH )
@app.route('/students/<userID>/<courseCode>/grades', methods=['GET'])
def get_student_course_grades(userID, courseCode):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT grade
        FROM Enrol
        WHERE userID = %s AND courseCode = %s
    """, (userID, courseCode))

    grades = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(grades)

# POST /courses/{courseCode}/enrollments - needed if you want to actually place students into courses. Without it, they cant see content (Ashani)
@app.route("/courses/<string:courseCode>/enrollments", methods=["POST"])
def enroll_student(courseCode):
    data = request.get_json()
    userID = data.get("userID")
    grade = data.get("grade")  # optional, can be NULL initially

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO Enrol (userID, courseCode, grade)
            VALUES (%s, %s, %s)
        """, (userID, courseCode, grade))
        conn.commit()
    except mysql.connector.Error as err:
        cursor.close()
        conn.close()
        return jsonify({"error": str(err)}), 400

    cursor.close()
    conn.close()
    return jsonify({"message": "Enrollment successful", "userID": userID, "courseCode": courseCode}), 201

# GET /courses/{courseCode}/sections - useful for structuring the course (modules, weeks, topics)
# GET /courses/{courseCode}/content - this is how students access lecture notes, readings, etc 

# POST /assignments/{secItemID}/submissions - Students need to submit work ( ASH ) 
@app.route('/assignments/<secItemID>/submissions', methods=['POST'])
def submit_submission(secItemID):
    data = request.get_json()  # get JSON payload from client
    userID = data.get("userID")
    subText = data.get("subText")
    subContent = data.get("subContent")  # could be base64 if file

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Submission (userID, secItemID, subText, subContent, submDate, grade)
        VALUES (%s, %s, %s, %s, NOW(), NULL)
    """, (userID, secItemID, subText, subContent))

    conn.commit()  # commit the insert
    inserted_id = cursor.lastrowid  # get auto-incremented subID

    cursor.close()
    conn.close()

    return jsonify({"message": "Submission created", "subID": inserted_id}), 201


# PUT /submissions/{subID}/grade - grade an assignment(Jada-Marie)
@app.route('/submissions/<int:subID>/grade', methods=['PUT'])
def grade_assignment(subID):
    data = request.get_json()

    if not data or "grade" not in data:
        abort(400, description="Must include a 'grade' field")

    grade = data.get("grade")

    if not isinstance(grade, int) or not (0 <= grade <= 100):
        abort(400, description="Grade must be an integer between 0 and 100")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT subID FROM Submission WHERE subID = %s", (subID,)) 
    if not cursor.fetchone():
        abort(404, description=f"Submission {subID} not found")
    cursor.execute("""
                    UPDATE Submission
                    SET grade = %s
                    WHERE subID = %s""", (grade, subID))
    conn.commit()
    cursor.execute("SELECT * FROM Submission WHERE subID = %s", (subID,)) 
    gradedAssignemnt = cursor.fetchone() 
    cursor.close()
    conn.close()

    return jsonify({"message": "Submission graded successfully", "submission": gradedAssignemnt}), 200


# GET /courses/{courseCode}/forums (Jada-Marie)
@app.route('/courses/<courseCode>/forums')
def get_course_forums(courseCode):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT f.dfID, f.dfname
                    FROM DiscussionForum f
                    WHERE f.courseCode = %s""",(courseCode,))
    courseForums = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(courseForums)


# POST /forums/{dfID}/threads ( ASH )
@app.route('/forums/<dfID>/threads', methods=['GET','POST']) 
def threads():





    pass


# POST /threads/{dtID}/replies (Jada-Marie)
@app.route('/threads/<dtID>/replies', methods=['POST'])
def reply_to_thread(dtID):
    data = request.get_json()

    userID = data.get("userID")
    threadbody = data.get("threadbody")
    topic = data.get("topic", None)

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
                    INSERT INTO DiscussionThread (dfID, parentpostID, userID, threadbody, topic, date_created)
                    VALUES (%s, NULL, %s, %s, %s, CURDATE())""", (dfID, userID, threadbody, topic))
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({"message": "Reply created successfully"})


# GET /courses/{courseCode}/calendar-events (Jada-Marie)
@app.route('/courses/<courseCode>/calendar-events', methods=['GET'])
def course_events(courseCode):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    #working w/ this spelling (calenderID) for now just so we can test it; change back if & when we fix the scripts
    cursor.execute("""
                    SELECT ce.eventTitle, ce.eventDate
                    FROM CalendarEvents ce
                    JOIN CourseCalendar cc
                    ON ce.calenderID = cc.calenderID       
                    WHERE cc.courseCode = %s
                    ORDER BY ce.eventDate ASC""",(courseCode,))
    courseEvents = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(courseEvents)


# GET /students/{userID}/calendar-events (Jada-Marie)
@app.route('/students/<userID>/calendar-events', methods=['GET'])
def student_events(userID):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
                    SELECT ce.eventTitle, ce.eventDate, cc.courseCode, c.courseName
                    FROM CalendarEvents ce
                    JOIN CourseCalendar cc
                    ON ce.calenderID = cc.calenderID
                    JOIN Course c
                    ON cc.courseCode = c.courseCode
                    JOIN ENrol e
                    ON c.courseCode = e.courseCode
                    WHERE e.userID = %s
                    ORDER BY cc.courseCode ASC, ce.eventDate ASC""",(userID,))
    studentEvents = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(studentEvents)


# GET /reports/courses-50plus ( ASH )
@app.route('/reports/courses-50', methods=['GET']) 
def top_fifty_courses(): #i think we should find a better function name
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("SELECT courseCode and student_count FROM course_50_plus")
    top_fifty = cursor.fetchall() 
    cursor.close() 
    conn.close()

    return(top_fifty)


# GET /reports/students-5plus (Ashani)
@app.route("/reports/students-5plus", methods=["GET"])
def students_5plus():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT ua.userID, ua.fname, ua.lname, COUNT(cm.courseCode) AS course_count
        FROM UserAccount ua
        JOIN CourseMember cm ON ua.userID = cm.userID
        WHERE cm.memberRole = 'student'
        GROUP BY ua.userID, ua.fname, ua.lname
        HAVING COUNT(cm.courseCode) >= 5
    """)
    #cursor.execute("SELECT * FROM students_5_plus_courses") i think you can just put this since the views are like tables
    students = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(students), 200


# GET /reports/lecturers-3plus ( ASH )
@app.route('/reports/lecturers-3', methods=['GET']) 
def top_3_lecturers():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("SELECT fname, lname, num_courses FROM lecturers_3_plus")
    top_3 = cursor.fetchall() 
    cursor.close() 
    conn.close()

    return jsonify(top_3)


# GET /reports/most-enrolled (Ashani)
@app.route("/reports/most-enrolled", methods=["GET"])
def most_enrolled_course():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.courseCode, c.courseName, COUNT(cm.userID) AS enrollment_count
        FROM Course c
        JOIN CourseMember cm ON c.courseCode = cm.courseCode
        WHERE cm.memberRole = 'student'
        GROUP BY c.courseCode, c.courseName
        ORDER BY enrollment_count DESC
        LIMIT 1
    """)
    #cursor.execute("SELECT * FROM ten_most_enrolled")
    course = cursor.fetchone()
    cursor.close()
    conn.close()
    return jsonify(course), 200


# GET /reports/top-students-by-average (Ashani)
@app.route("/reports/top-students-by-average", methods=["GET"])
def top_students_by_average():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT ua.userID, ua.fname, ua.lname, AVG(s.grade) AS avg_grade
        FROM UserAccount ua
        JOIN Submission s ON ua.userID = s.userID
        WHERE ua.accessLvl = 'student' AND s.grade IS NOT NULL
        GROUP BY ua.userID, ua.fname, ua.lname
        ORDER BY avg_grade DESC
        LIMIT 10
    """)
    #cursor.execute("SELECT * FROM top_ten_students")
    students = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(students), 200


if __name__ =='__main__':
    app.run(debug=True)
