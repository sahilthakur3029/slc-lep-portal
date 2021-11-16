from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
from flask_login import (
    login_required,
)
from datetime import datetime
import os

studentdisplay = Blueprint('studentdisplay', __name__, template_folder='templates')
CORS(studentdisplay)

database_url = os.getenv(
    'DATABASE_URL',
    default='dbname=slcapplication',  # E.g., for local dev
)

# Connect to your postgres DB
conn = psycopg2.connect(database_url)


@studentdisplay.route('/names', methods = ['GET', 'POST'])
@login_required
def getStudents():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM intakeform")
    # Retrieve query results
    records = cur.fetchall()
    # Close cursor
    cur.close()
    return jsonify(records)

@studentdisplay.route('/updateform', methods = ['POST'])
@login_required
def updateIntake():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    data_json = request.get_json()['intakedata']
    cur.execute("DELETE FROM intakeform")
    for student in data_json:
        if "timestamp" in student:
            datetimeobject = datetime.strptime(student["timestamp"], '%a, %d %b %Y %H:%M:%S %Z')
            newformat = datetimeobject.strftime('%Y-%m-%d %H:%M:%S')
        else:
            newformat = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        student["timestamp"] = newformat
        if "class_standing" not in student:
            student["class_standing"] = ""
        if "domestic_status" not in student:
            student["domestic_status"] = ""
        if "major" not in student:
            student["major"] = ""
        if "gender" not in student:
            student["gender"] = ""
        if "gender_custom" not in student:
            student["gender_custom"] = ""
        if "days_of_week" not in student or student["days_of_week"].strip() == "":
            student["days_of_week"] = []
        else:
            student["days_of_week"] = student["days_of_week"].split(", ")
        if "hope_to_gain" not in student:
            student["hope_to_gain"] = ""
        if "plan_to_meet" not in student:
            student["plan_to_meet"] = ""
        if "lang_1_learn_other" not in student:
            student["lang_1_learn_other"] = ""
        if "lang_2_learn" not in student:
            student["lang_2_learn"] = ""
        if "lang_2_learn_other" not in student:
            student["lang_2_learn_other"] = ""
        if "lang_2_learn_level" not in student or str(student["lang_2_learn_level"]).strip() == "":
            student["lang_2_learn_level"] = "0"
        if "lang_1_teach_other" not in student:
            student["lang_1_teach_other"] = ""
        if "lang_2_teach" not in student:
            student["lang_2_teach"] = ""
        if "lang_2_teach_other" not in student:
            student["lang_2_teach_other"] = ""
        if "lang_2_teach_level" not in student or str(student["lang_2_teach_level"]).strip() == "":
            student["lang_2_teach_level"] = "0"
        if "comments" not in student:
            student["comments"] = ""
        if "partner_major" not in student:
            student["partner_major"] = ""
        if "partner_major_weight" not in student or str(student["partner_major_weight"]).strip() == "":
            student["partner_major_weight"] = "0"
        if "partner_gender" not in student:
            student["partner_gender"] = ""
        if "partner_gender_custom" not in student:
            student["partner_gender_custom"] = ""
        if "partner_gender_weight" not in student or str(student["partner_gender_weight"]).strip() == "":
            student["partner_gender_weight"] = "0"
        if "waiver_accept" not in student:
            student["waiver_accept"] = ""
        # State changes
        sql = """INSERT INTO intakeform (first_name, last_name, email, academic_title, residency, major, gender, gender_custom, availability, hope_to_gain, plan_to_meet,
        f_c_learn, f_c_learn_other, f_c_learn_level, s_c_learn, s_c_learn_other, s_c_learn_level, f_c_teach, f_c_teach_other, f_c_teach_level, s_c_teach, s_c_teach_other,
        s_c_teach_level, comments, p_major, p_major_weight, p_gender, p_gender_custom, p_gender_weight, waiver_accept, timestamp) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
        %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s)"""
        cur.execute(sql, (student["first_name"], student["last_name"], student["email"], student["class_standing"], student["domestic_status"], student["major"], student["gender"], student["gender_custom"], 
        student["days_of_week"], student["hope_to_gain"], student["plan_to_meet"], student["lang_1_learn"], student["lang_1_learn_other"], int(student["lang_1_learn_level"]), student["lang_2_learn"], 
        student["lang_2_learn_other"], int(student["lang_2_learn_level"]), student["lang_1_teach"], student["lang_1_teach_other"], int(student["lang_1_teach_level"]), 
        student["lang_2_teach"], student["lang_2_teach_other"], int(student["lang_2_teach_level"]), student["comments"], student["partner_major"], int(student["partner_major_weight"]), 
        student["partner_gender"], student["partner_gender_custom"], int(student["partner_gender_weight"]), student["waiver_accept"], student['timestamp']))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return jsonify({"success": True})
