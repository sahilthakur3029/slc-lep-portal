from flask import Flask, Blueprint, jsonify
from flask_cors import CORS
import psycopg2
import json

timesheetform = Blueprint('timesheetform', __name__, template_folder='templates')
CORS(timesheetform)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")
# Open a cursor to perform database operations
cur = conn.cursor()

@timesheetform.route('/tsrender')
def updatepage():
        # Execute a query
        cur.execute("SELECT * FROM formmang")
        # Retrieve query results
        records = cur.fetchall()
        return {"allWeeks": json.loads(records[0][2]),
            "calendarLink": records[0][3],
            "semester": records[0][1],
        }