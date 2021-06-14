from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

unpaireddisplay = Blueprint('unpaireddisplay', __name__, template_folder='templates')
CORS(unpaireddisplay)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")


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