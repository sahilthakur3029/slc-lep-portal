from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

studentdisplay = Blueprint('studentdisplay', __name__, template_folder='templates')
CORS(studentdisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres password=ksshiraja")


@studentdisplay.route('/names', methods = ['GET', 'POST'])
def getStudents():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM intakeform")
    # Retrieve query results
    records = cur.fetchall()
    # Close cursor
    cur.close()
    return jsonify(records)