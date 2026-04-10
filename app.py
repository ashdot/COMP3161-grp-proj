import os
from flask import Flask
from flask import render_template, request, redirect, url_for, flash, session, abort, send_from_directory, jsonify
from flask_login import login_user, logout_user, current_user, login_required
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

# POST /auth/login - login only
@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({"message": "Login successful", "user": user}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# GET /users/{userID} - fetch user profile
# GET /courses - list all courses
# GET /students/{userID}/courses - get the courses done by a student
# GET /lecturers/{userID}/courses - get the courses a lecturer teachers

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

# POST /courses/{courseCode}/enrollments - needed if you want to actually place students into courses. Without it, they cant see content
# GET /courses/{courseCode}/sections - useful for structuring the course (modules, weeks, topics)
# GET /courses/{courseCode}/content - this is hoe students access lecture notes, readings, etc 

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


# PUT /submissions/{subID}/grade - lecturers need to grade

# GET /courses/{courseCode}/forums

# POST /forums/{dfID}/threads ( ASH )
@app.route('/forums/<dfID>/threads', methods=['GET','POST']) 
def threads():





    pass

# POST /threads/{dtID}/replies

# GET /courses/{courseCode}/calendar-events
# GET /students/{userID}/calendar-events

# GET /reports/courses-50plus ( ASH )
@app.route('/reports/courses-50', methods=['GET']) 
def top_fifty_courses():
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("SELECT courseCode and student_count FROM course_50_plus")
    top_fifty = cursor.fetchall() 
    cursor.close() 
    conn.close()

    return(top_fifty)

# GET /reports/students-5plus

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

# GET /reports/most-enrolled

# GET /reports/top-students-by-average

if __name__ =='__main__':
    app.run(debug=True)
