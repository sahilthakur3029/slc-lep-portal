from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
import json

timesheetform = Blueprint('timesheetform', __name__, template_folder='templates')
CORS(timesheetform)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")

@timesheetform.route('/loghours', methods = ['POST'])
def insertApplicant():
        # Open a cursor to perform database operations
        cur = conn.cursor()
        data_json = request.get_json()
        print(data_json)
        # Close cursor
        cur.close()
        return 'Successful'

@timesheetform.route('/tsrender')
def updatepage():
        # Open a cursor to perform database operations
        cur = conn.cursor()
        # Execute a query
        cur.execute("SELECT * FROM formmang")
        # Retrieve query results
        records = cur.fetchall()
        # Close cursor
        cur.close()
        return {"allWeeks": json.loads(records[0][2]),
            "calendarLink": records[0][3],
            "semester": records[0][1],
        }