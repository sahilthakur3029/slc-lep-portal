from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

timesheetdisplay = Blueprint('timesheetdisplay', __name__, template_folder='templates')
CORS(timesheetdisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres password=ksshiraja")

@timesheetdisplay.route('/timesheetdata', methods = ['GET', 'POST'])
def getTimesheetData():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM timesheet")
    # Retrieve query results
    records = cur.fetchall()
    print(records)
    # Close cursor
    cur.close()
    return jsonify(records)