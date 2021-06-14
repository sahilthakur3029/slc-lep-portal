from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

pairsdisplay = Blueprint('pairsdisplay', __name__, template_folder='templates')
CORS(pairsdisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")


@pairsdisplay.route('/paired', methods = ['GET', 'POST'])
def getPairs():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM pairs")
    # Retrieve query results
    records = cur.fetchall()
    print(records)
    # Close cursor
    cur.close()
    return jsonify(records)