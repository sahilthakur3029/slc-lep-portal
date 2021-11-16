from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from flask_login.utils import login_required
import psycopg2
import json
import os

timesheetform = Blueprint('timesheetform', __name__, template_folder='templates')
CORS(timesheetform)

database_url = os.getenv(
    'DATABASE_URL',
    default='dbname=slcapplication',  # E.g., for local dev
)

# Connect to your postgres DB
conn = psycopg2.connect(database_url)

@timesheetform.route('/loghours', methods = ['POST'])
def insertApplicant():
        # Open a cursor to perform database operations
        cur = conn.cursor()
        data_json = request.get_json()
        sql = """INSERT INTO timesheet (first_name, last_name, partner_names, hours, week) VALUES (%s,%s,%s,%s,%s)"""
        cur.execute(sql, (data_json["firstName"], data_json["lastName"], data_json["partnerNames"], data_json["hours"], data_json["week"]))
        # Commit changes
        conn.commit()
        # Close cursor
        cur.close()
        return jsonify({'Successful': 'Successful'})

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
            "orientationKey": records[0][0],
        }

# this command corresponds to the admin timesheet page 
@timesheetform.route('/timesheetrecords')
@login_required
def timesheetData():
        # Open a cursor to perform database operations
        cur = conn.cursor()
        # Execute a query
        cur.execute("SELECT * FROM timesheet")
        # Retrieve query results
        records = cur.fetchall()
        # Close cursor
        cur.close()
        return jsonify(records)

# this command corresponds to the admin timesheet page 
@timesheetform.route('/updatetimesheet', methods=['POST'])
@login_required
def updateTimesheet():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()['timesheetdata']
    cur.execute("DELETE FROM timesheet")
    for student in data_json:
        sql = """INSERT INTO timesheet(first_name, last_name, partner_names, hours, week) VALUES(%s, %s, %s, %s, %s)"""
        cur.execute(sql, (student["first_name"], student["last_name"], student["partner_names"], 
        student.get("hours", "0"),  student.get("week", "Undefined Week")))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})