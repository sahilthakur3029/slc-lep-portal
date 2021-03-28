from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
import pandas as pd

algorithm = Blueprint('algorithm', __name__, template_folder='templates')
CORS(algorithm)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")

def postgresql_to_dataframe(conn, select_query, column_names):
    """
    Tranform a SELECT query into a pandas dataframe
    """
    cursor = conn.cursor()
    try:
        cursor.execute(select_query)
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        cursor.close()
        return 1
    
    # Naturally we get a list of tupples
    tupples = cursor.fetchall()
    cursor.close()
    
    # We just need to turn it into a pandas dataframe
    df = pd.DataFrame(tupples, columns=column_names)
    return df