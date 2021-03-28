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

@algorithm.route('/algorithm')
def run_algorithm():
    column_names = ["First", "Last", "Email", "SID", "Academic Title", "Residency", "Major", "Gender", "Gender Custom", "Availability", "Hope To Gain", "Plan to Meet", "F_C_Learn", 
    "F_C_Learn_Other", "F_C_Learn_Level", "S_C_Learn", "S_C_Learn_Other", "S_C_Learn_Level", "F_C_Teach", "F_C_Teach_Other", "F_C_Teach_Level", "S_C_Teach", "S_C_Teach_Other",
    "S_C_Teach_Level", "Comments", "P_Major", "P_Major_Weight", "P_Gender", "P_Gender_Custom", "P_Gender_Weight", "Waiver Accept", "Timestamp"]
    df = postgresql_to_dataframe(conn, "select * from intakeform", column_names)
    print(df.head())
    return "Hello"