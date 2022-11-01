from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from flask_login.utils import login_required
from datetime import datetime
import psycopg2
from psycopg2.extensions import AsIs
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
        sql = """INSERT INTO timesheet (first_name, last_name, partner_names, hours, week, timestamp) VALUES (%s,%s,%s,%s,%s, (select localtimestamp(0)))"""
        cur.execute(sql, (data_json["firstName"], data_json["lastName"], data_json["partnerNames"], data_json["hours"], data_json["week"]))
        # Commit changes
        conn.commit()
        # Close cursor
        cur.close()
        # Updating timesheet v2
        updateTimesheetv2Hours(data_json["email"], data_json["hours"], data_json["week"])
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
        cur.execute("SELECT * FROM timesheet ORDER BY timestamp")
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
        if "timestamp" in student:
            try:
                datetimeobject = datetime.strptime(student["timestamp"], '%a, %d %b %Y %H:%M:%S %Z')
                newformat = datetimeobject.strftime('%Y-%m-%d %H:%M:%S')
            except:
                newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        else:
            newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        student["timestamp"] = newformat
        sql = """INSERT INTO timesheet(first_name, last_name, partner_names, hours, week, timestamp) VALUES(%s, %s, %s, %s, %s, %s)"""
        cur.execute(sql, (student["first_name"], student["last_name"], student["partner_names"], 
        student.get("hours", "0"),  student.get("week", "Undefined Week"), student["timestamp"]))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})

# this command corresponds to the admin timesheet page 
@timesheetform.route('/timesheetrecordsv2')
@login_required
def timesheetDatav2():
        # Open a cursor to perform database operations
        cur = conn.cursor()
        # Execute a query
        cur.execute("SELECT * FROM timesheet_v2 ORDER BY pair_id")
        # Retrieve query results
        records = cur.fetchall()
        # Close cursor
        cur.close()
        return jsonify(records)

# this command corresponds to the admin timesheet page 
@timesheetform.route('/updatetimesheetv2', methods=['POST'])
@login_required
def updateTimesheetv2():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()['timesheetdatav2']
    cur.execute("DELETE FROM timesheet_v2")
    for student in data_json:
        print(student)
        sql = """INSERT INTO timesheet_v2 (pair_id, first_name, last_name, email, week_0, week_1, week_2, week_3, week_4, week_5, week_6, week_7,
        week_8, week_9, week_10, week_11, week_12, week_13, week_14, week_15, week_16, week_17, week_18,
        week_19, week_20) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        cur.execute(sql, (student["pair_id"], student["first_name"], student["last_name"], student["email"],
        student["week_0"], student["week_1"], student["week_2"], student["week_3"], student["week_4"], student["week_5"], student["week_6"], student["week_7"],
        student["week_8"], student["week_9"], student["week_10"], student["week_11"], student["week_12"], student["week_13"], student["week_14"], student["week_15"],
        student["week_16"], student["week_17"], student["week_18"], student["week_19"], student["week_20"]))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})

@login_required
def reorganizeRowsTimesheetv2():
    cur = conn.cursor()
    # Delete records that exist in timesheet_v2 but not in paired table
    cur.execute("SELECT email FROM timesheet_v2 EXCEPT (SELECT email FROM pairs UNION ALL SELECT email_1 FROM pairs UNION ALL SELECT email_2 FROM pairs WHERE email_2 != '')")
    toDeleteRecords = cur.fetchall()
    for i in toDeleteRecords:
        sql = """DELETE FROM timesheet_v2 WHERE email = %s"""
        cur.execute(sql, (i[0],))
    # Records that have been added to the paired table
    cur.execute("SELECT first, last, email FROM pairs UNION ALL SELECT first_1, last_1, email_1 FROM pairs UNION ALL SELECT first_2, last_2, email_2 FROM pairs WHERE email_2 != '' EXCEPT (SELECT first_name, last_name, email FROM timesheet_v2)")
    toAddRecords = cur.fetchall()
    for i in toAddRecords:
        sql = """INSERT INTO timesheet_v2 (pair_id, first_name, last_name, email, week_0, week_1, week_2, week_3, week_4, week_5, week_6, week_7,
        week_8, week_9, week_10, week_11, week_12, week_13, week_14, week_15, week_16, week_17, week_18,
        week_19, week_20) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        cur.execute(sql, (0, i[0], i[1], i[2],
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0))
    # Reordering records that have been edited/moved around in paired + assigning new pair numbers to records
    cur.execute("SELECT email, email_1, email_2 FROM pairs ORDER BY timestamp")
    toEditPairId = cur.fetchall()
    for i in range(len(toEditPairId)):
        for j in toEditPairId[i]:
            if j == None or j == "":
                continue
            else:
                sql = """UPDATE timesheet_v2 SET pair_id = %s WHERE email = %s"""
                cur.execute(sql, (i+1, j))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return

@login_required
def updateTimesheetv2Hours(email, hours, week):
    week = week.lower().replace(' ', '_')
    # Open a cursor to perform database operations
    cur = conn.cursor()
    sql = """SELECT MAX(%s) FROM timesheet_v2 WHERE pair_id = (SELECT pair_id FROM timesheet_v2 WHERE email = %s)"""
    cur.execute(sql, (AsIs(week), email))
    cur_max_hours_for_week = cur.fetchone()[0]
    if cur_max_hours_for_week is None:
        cur.close()
        return 
    new_max_hours = max(cur_max_hours_for_week, hours)
    if (str(new_max_hours).endswith('.0')):
        new_max_hours = int(new_max_hours)
    sql = """UPDATE timesheet_v2 SET %s = %s WHERE pair_id = (SELECT pair_id FROM timesheet_v2 WHERE email = %s)"""
    cur.execute(sql, (AsIs(week), new_max_hours, email))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return