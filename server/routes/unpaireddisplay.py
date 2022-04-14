from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
from datetime import datetime
from flask_login.utils import login_required
import os

unpaireddisplay = Blueprint('unpaireddisplay', __name__, template_folder='templates')
CORS(unpaireddisplay)

database_url = os.getenv(
    'DATABASE_URL',
    default='dbname=slcapplication',  # E.g., for local dev
)

# Connect to your postgres DB
conn = psycopg2.connect(database_url)


@unpaireddisplay.route('/unpairedb', methods = ['GET', 'POST'])
@login_required
def getPairs():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM unpaired ORDER BY timestamp")
    # Retrieve query results
    records = cur.fetchall()
    # Close cursor
    cur.close()
    return jsonify(records)

@unpaireddisplay.route('/updateunpaired', methods=['POST'])
@login_required
def updatePairs():
     # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()['unpaireddata']
    cur.execute("DELETE FROM unpaired")
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
        sql = """INSERT INTO unpaired(timestamp, first, last, email, level, teach, learn, comments) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"""
        cur.execute(sql, (student["timestamp"], student["first_name"], student["last_name"], student.get("email", None),  student.get("level", None),
        student.get("teach", None), student.get("learn", None), student.get("comments", None)))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})