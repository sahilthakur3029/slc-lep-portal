from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

intakeform = Blueprint('intakeform', __name__, template_folder='templates')
CORS(intakeform)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")
# Open a cursor to perform database operations
cur = conn.cursor()


@intakeform.route('/newapplicant', methods = ['POST'])
def insertApplicant():
    data_json = request.get_json()
    print(data_json)
    return 'Successful'

@intakeform.route('/intakerender')
def getSemester():
    # Execute a query
    cur.execute("SELECT * FROM formmang")

    # Retrieve query results
    records = cur.fetchall() 
    return {"currOrientationKey": records[0][0],
            "semester": records[0][1],
            }
