from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
from datetime import datetime
from flask_login.utils import login_required

unpaireddisplay = Blueprint('unpaireddisplay', __name__, template_folder='templates')
CORS(unpaireddisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres password=ksshiraja")


@unpaireddisplay.route('/unpaired', methods = ['GET', 'POST'])
def getPairs():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM unpaired")
    # Retrieve query results
    records = cur.fetchall()
    print(records)
    # Close cursor
    cur.close()
    return jsonify(records)

@unpaireddisplay.route('/updateunpaired', methods=['POST'])
@login_required
def updatePairs():
     # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()['unpaireddata']
    print(data_json)
    # cur.execute("DELETE FROM unpaired")
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})