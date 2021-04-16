from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

studentdisplay = Blueprint('studentdisplay', __name__, template_folder='templates')
CORS(studentdisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")


@studentdisplay.route('/names')
def getSemester():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT first_name FROM intakeform")
    # Retrieve query results
    records = cur.fetchall() 
    print(records)
    # Close cursor
    cur.close()
    return jsonify(records)