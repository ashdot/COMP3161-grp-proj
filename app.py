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

# GET /courses/{courseCode}/members - view other participants in the course ( ASH )
@app.route('/courses/<courseCode>/members', methods=['GET']) 
def get_members():


    pass 


# GET /students/{userID}/grades - student grades for the course ( ASH )

@app.route('/students/<userID>/grades', methods=['GET']) 
def get_student_grades():

    pass 

# POST /assignments/{secItemID}/submissions - Students need to submit work ( ASH ) 

@app.route('/assignments/<secItemID>/submissions', methods=['GET']) 
def get_submissions():

    pass 

# / POST /forums/{dfID}/threads ( ASH )
@app.route('/forums/<dfID>/threads', methods=['GET','POST']) 


# GET    /reports/courses-50plus ( ASH )
@app.route('/reports/courses-50', methods=['GET','POST']) 

# GET    /reports/lecturers-3plus ( ASH )
@app.route('/reports/lecturers-3', methods=['GET','POST']) 



if __name__ =='__main__':
    app.run(debug=True)