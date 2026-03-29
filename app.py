from flask import Flask, request, make_response, jsonify
import mysql.connector
from dotenv import load_dotenv
import os 

load_dotenv()

app = Flask(__name__)





if __name__ == "__main__":
    app.run(port=8000, debug=True)