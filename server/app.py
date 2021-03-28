from flask import Flask, jsonify
from routes.intakeform import intakeform
from routes.timesheetform import timesheetform
from routes.algorithm import algorithm
from flask_cors import CORS
import psycopg2


app = Flask(__name__)
app.register_blueprint(intakeform)
app.register_blueprint(timesheetform)
app.register_blueprint(algorithm)
CORS(app)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")
# Open a cursor to perform database operations
cur = conn.cursor()

@app.route('/test')

def index():
  # Execute a query
  cur.execute("SELECT * FROM formmang")

  # Retrieve query results
  records = cur.fetchall()
  print(records)
  return {"Test":"Hello World!"}


if __name__ == '__main__': 
  app.run(debug=True, host='0.0.0.0')

