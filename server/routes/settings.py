from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
import json

settings = Blueprint('settings', __name__, template_folder='templates')
CORS(settings)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")

# ON DEPLOYMENT UNCOMMENT DELETING INTAKEFORM
@settings.route('/savedata', methods=["POST"])
def delete():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()
    allWeeksArray = []
    for i in range(int(data_json["startWeek"]), int(data_json["endWeek"]) + 1):
        allWeeksArray.append(i)
    cur.execute("DELETE FROM formmang")
    sql = """INSERT INTO formmang (orientation_key, semester, all_weeks, calendar_link) VALUES (%s,%s,%s,%s)"""
    cur.execute(sql, (data_json["orientationKey"], data_json["currSem"], str(allWeeksArray), data_json["calendarLink"]))
    booleanConv = data_json["deleteData"]
    if booleanConv:
        cur.execute("DELETE FROM pairs")
        cur.execute("DELETE FROM timesheet")
        cur.execute("DELETE FROM unpaired")
        # cur.execute("DELETE FROM intakeform")
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"Success": True})