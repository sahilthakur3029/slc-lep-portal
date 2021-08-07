from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2

intakeform = Blueprint('intakeform', __name__, template_folder='templates')
CORS(intakeform)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres password=ksshiraja")

@intakeform.route('/newapplicant', methods = ['POST'])
def insertApplicant():
    d_j = request.get_json()
    # Open a cursor to perform database operations
    cur = conn.cursor()
    if d_j["availability"] == "": 
      d_j["availability"] = []

    if d_j["firstChoiceLearnLevel"] == "":
      d_j["firstChoiceLearnLevel"] = '0'

    if d_j["secondChoiceLearnLevel"] == "":
      d_j["secondChoiceLearnLevel"] = '0'

    if d_j["firstChoiceTeachLevel"] == "":
      d_j["firstChoiceTeachLevel"] = '0'

    if d_j["secondChoiceTeachLevel"] == "":
      d_j["secondChoiceTeachLevel"] = '0'

    if d_j["preferredMajorWeight"] == "":
      d_j["preferredMajorWeight"] = '0'

    if d_j["preferredGenderWeight"] == "":
      d_j["preferredGenderWeight"] = '0' 
    # State changes
    sql = """INSERT INTO intakeform (first_name, last_name, email, academic_title, residency, major, gender, gender_custom, availability, hope_to_gain, plan_to_meet,
    f_c_learn, f_c_learn_other, f_c_learn_level, s_c_learn, s_c_learn_other, s_c_learn_level, f_c_teach, f_c_teach_other, f_c_teach_level, s_c_teach, s_c_teach_other,
    s_c_teach_level, comments, p_major, p_major_weight, p_gender, p_gender_custom, p_gender_weight, waiver_accept, timestamp) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
    %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, (select localtimestamp(0)))"""
    cur.execute(sql, (d_j["firstName"], d_j["lastName"], d_j["email"], d_j["academicTitle"], d_j["residency"], d_j["major"], d_j["gender"], d_j["genderCustom"], 
    d_j["availability"], d_j["hopeToGain"], d_j["planToMeet"], d_j["firstChoiceLearn"], d_j["firstChoiceLearnOther"], int(d_j["firstChoiceLearnLevel"]), d_j["secondChoiceLearn"], 
    d_j["secondChoiceLearnOther"], int(d_j["secondChoiceLearnLevel"]), d_j["firstChoiceTeach"], d_j["firstChoiceTeachOther"], int(d_j["firstChoiceTeachLevel"]), 
    d_j["secondChoiceTeach"], d_j["secondChoiceTeachOther"], int(d_j["secondChoiceTeachLevel"]), d_j["comments"], d_j["preferredMajor"], int(d_j["preferredMajorWeight"]), 
    d_j["preferredGender"], d_j["preferredGenderCustom"], int(d_j["preferredGenderWeight"]), d_j["waiverAccept"]))
    # Commit changes
    conn.commit()
    # Close cursor
    cur.close()
    return {'Successful': 'Successful'}

@intakeform.route('/intakerender')
def getSemester():
    # Open a cursor to perform database operations
    cur = conn.cursor()
    # Execute a query
    cur.execute("SELECT * FROM formmang")

    # Retrieve query results
    records = cur.fetchall() 
    # Close cursor
    cur.close()
    return {"currOrientationKey": records[0][0],
            "semester": records[0][1],
            }
