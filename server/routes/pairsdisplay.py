from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
from flask_login.utils import login_required
import psycopg2

pairsdisplay = Blueprint('pairsdisplay', __name__, template_folder='templates')
CORS(pairsdisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres password=ksshiraja")


@pairsdisplay.route('/paired', methods = ['GET', 'POST'])
def getPairs():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM pairs")
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
    print(data_json)
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})
