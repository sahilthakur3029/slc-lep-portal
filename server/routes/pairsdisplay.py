from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from flask_login.utils import login_required
from datetime import datetime
from server.routes.timesheetform import reorganizeRowsTimesheetv2
import psycopg2
import os

pairsdisplay = Blueprint('pairsdisplay', __name__, template_folder='templates')
CORS(pairsdisplay)

database_url = os.getenv(
    'DATABASE_URL',
    default='dbname=slcapplication',  # E.g., for local dev
)

# Connect to your postgres DB
conn = psycopg2.connect(database_url)


@pairsdisplay.route('/pairedb', methods = ['GET', 'POST'])
@login_required
def getPairs():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM pairs ORDER BY timestamp")
    # Retrieve query results
    records = cur.fetchall()
    # Close cursor
    cur.close()
    return jsonify(records)

@pairsdisplay.route('/updatepairs', methods=['POST'])
@login_required
def updatePairs():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()['pairsdata']
    cur.execute("DELETE FROM pairs")
    # TODO: Update timestamps here for when updating pairs esp with new pair (use try/except in studentdisplay)
    for student in data_json:
        if "timestamp_1" in student:
            try:
                datetimeobject = datetime.strptime(student["timestamp_1"], '%a, %d %b %Y %H:%M:%S %Z')
                newformat = datetimeobject.strftime('%Y-%m-%d %H:%M:%S')
            except:
                newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        else:
            newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        student["timestamp_1"] = newformat
        if "timestamp_2" in student:
            try:
                datetimeobject = datetime.strptime(student["timestamp_2"], '%a, %d %b %Y %H:%M:%S %Z')
                newformat = datetimeobject.strftime('%Y-%m-%d %H:%M:%S')
            except:
                newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        else:
            newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        student["timestamp_2"] = newformat
        if "first_name_3" in student and student["first_name_3"] != None:
            if "timestamp_3" in student:
                try:
                    datetimeobject = datetime.strptime(student["timestamp_3"], '%a, %d %b %Y %H:%M:%S %Z')
                    newformat = datetimeobject.strftime('%Y-%m-%d %H:%M:%S')
                except:
                    newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            else:
                newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            student["timestamp_3"] = newformat
            student["first_name_3"] = student["first_name_3"].title()
        if "last_name_3" in student and student["last_name_3"] != None:
            student["last_name_3"] = student["last_name_3"].title()
        if "email_3" not in student or student["email_3"] == None or student["email_3"] == "":
            sql = """INSERT INTO pairs(timestamp, first, last, email, level, teach, learn, comments, timestamp_1, first_1, last_1, email_1, level_1, teach_1, learn_1, comments_1) VALUES(%s, %s, %s, %s, %s, %s, %s, 
            %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            cur.execute(sql, (student["timestamp_1"], student["first_name_1"], student["last_name_1"], student["email_1"], student.get("class_standing_1", None),
            student.get("teach_1", None), student.get("learn_1", None), student.get("comments_1", None), student["timestamp_2"], student["first_name_2"], student["last_name_2"], student["email_2"], student.get("class_standing_2", None),
            student.get("teach_2", None), student.get("learn_2", None), student.get("comments_2", None)))
        else:
            sql = """INSERT INTO pairs(timestamp, first, last, email, level, teach, learn, comments, timestamp_1, first_1, last_1, email_1, level_1, teach_1, learn_1, comments_1, 
            timestamp_2, first_2, last_2, email_2, level_2, teach_2, learn_2, comments_2) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
            %s, %s)"""
            cur.execute(sql, (student["timestamp_1"], student["first_name_1"], student["last_name_1"], student["email_1"], student.get("class_standing_1", None),
            student.get("teach_1", None), student.get("learn_1", None), student.get("comments_1", None), student["timestamp_2"], student["first_name_2"], student["last_name_2"], student["email_2"], student.get("class_standing_2", None),
            student.get("teach_2", None), student.get("learn_2", None), student.get("comments_2", None), student.get("timestamp_3", None), student.get("first_name_3", None), student.get("last_name_3", None), student.get("email_3", None), student.get("class_standing_3", None),
            student.get("teach_3", None), student.get("learn_3", None), student.get("comments_3", None)))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    # Calling function to update timesheet v2
    reorganizeRowsTimesheetv2()
    return jsonify({"success": True})
