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

# Used to turn comma seperated list into a set
def comma_parser(cslist):
    if cslist == "":
        return set()
    cslist = cslist.title()
    return set(cslist.split(", "))

# When adding to dictionary, make sure key and value are in title case
common_errors = {"Eecs": "Computer Science",
                 "Cs": "Computer Science",
                 "Stats": "Statistics",
                 "Psych": "Psychology",
                 "Phil": "Philosophy ",
                 "Econ": "Economics",
                 "Mcb": "Molecular and Cell Biology",
                 "Math": "Mathematics",
                 "Cheme": "Chemical Engineering",
                 "Ds": "Data Science",
                 "Polisci": "Political Science",
                 "Meche": "Mechanical Engineering",
                 "Comp.lit.": "Comparative Literature",
                 "Complit": "Comparative Literature",
                 "App Math": "Applied Mathematics"}
# Guards against common ways to write major differently
def error_major_fixer(major_set):
    updated_set = []
    for i in major_set:
        if i in common_errors:
            updated_set.append(common_errors[i])
        else:
            updated_set.append(i)
    if (len(updated_set) == 0):
        return set(["No Response"])
    return set(updated_set)

@algorithm.route('/algorithm')
def run_algorithm():
    column_names = ["First", "Last", "Email", "SID", "Academic Title", "Residency", "Major", "Gender", "Gender Custom", "Availability", "Hope To Gain", "Plan to Meet", "F_C_Learn", 
    "F_C_Learn_Other", "F_C_Learn_Level", "S_C_Learn", "S_C_Learn_Other", "S_C_Learn_Level", "F_C_Teach", "F_C_Teach_Other", "F_C_Teach_Level", "S_C_Teach", "S_C_Teach_Other",
    "S_C_Teach_Level", "Comments", "P_Major", "P_Major_Weight", "P_Gender", "P_Gender_Custom", "P_Gender_Weight", "Waiver Accept", "Timestamp"]
    df = postgresql_to_dataframe(conn, "select * from intakeform", column_names)
    # TODO Have to remove people from if already paired and maybe duplicate applicants (Step 1)
    print(df.head())
    # Step 2 of algorithm
    formatted_data = []
    for index, row in df.iterrows():
        comments = row["Comments"]
        teach_dict = {}
        try:
            teach1 = row["F_C_Teach"]
            if row["F_C_Teach"] == "Other" or row["F_C_Teach"] == "":
                teach1 = row["F_C_Teach_Other"].title()
            teach1_level = row["F_C_Teach_Level"]
            if teach1 != "":
                teach_dict[teach1] = teach1_level
        except:
            pass
        try:
            teach2 = row["S_C_Teach"]
            if row["S_C_Teach"] == "Other" or row["S_C_Teach"] == "":
                teach2 = row["S_C_Teach_Other"].title()
            teach2_level = row["S_C_Teach_Level"]
            if teach2 != "":
                teach_dict[teach2] = teach2_level
        except:
            pass
        learn_dict = {}
        try:
            learn1 = row["F_C_Learn"]
            if row["F_C_Learn"] == "Other" or row["F_C_Learn"] == "":
                learn1 = row["F_C_Learn_Other"].title()
            learn1_level = row["F_C_Learn_Level"]
            if learn1 != "":
                learn_dict[learn1] = learn1_level
        except:
            pass
        try:
            learn2 = row["S_C_Learn"]
            if row["S_C_Learn"] == "Other" or row["S_C_Learn"] == "":
                learn2 = row["S_C_Learn_Other"].title()
            learn2_level = row["S_C_Learn_Level"]
            if learn2 != "":
                learn_dict[learn2] = learn2_level
        except:
            pass
        try:
            d_o_w_set = set(row["Availability"])
        except:
            pass
        try:
            row["Major"] = error_major_fixer(comma_parser(row["Major"]))
            if row["Gender"] == "Custom" or row["Gender"] == "":
                row["Gender"] = row["Gender Custom"].title().strip()
        except:
            pass
        try:
            if row["P_Major"] == "" or row["P_Major_Weight"] == "":
                row["P_Major_Weight"] = 0
            row["P_Major"] = error_major_fixer(comma_parser(row["P_Major"]))
        except:
            pass
        try:
            if row["P_Gender"] == "Custom" or row["P_Gender"] == "":
                row["P_Gender"] = row["P_Gender_Custom"].title().strip()
            if row["P_Gender"] == "" or row["P_Gender_Weight"] == "":
                row["P_Gender_Weight"] = 0
        except:
            pass
        formatted_data.append({"Timestamp": row["Timestamp"], "First":row["First"], "Last":row["Last"], "Email":row["Email"], "SID":row["SID"], "Level": row["Academic Title"], 
        "Gender": row["Gender"].strip(), "Major":row["Major"], "Teach":teach_dict, "Learn":learn_dict, "Comments":comments, "Days Available": d_o_w_set, "Partner Major": row["P_Major"], 
        "Partner Major Weight": row["P_Major_Weight"], "Partner Gender": row["P_Gender"].strip(), "Partner Gender Weight": row["P_Gender_Weight"]})
        print({"Timestamp": row["Timestamp"], "First":row["First"], "Last":row["Last"], "Email":row["Email"], "SID":row["SID"], "Level": row["Academic Title"], 
        "Gender": row["Gender"].strip(), "Major":row["Major"], "Teach":teach_dict, "Learn":learn_dict, "Comments":comments, "Days Available": d_o_w_set, "Partner Major": row["P_Major"], 
        "Partner Major Weight": row["P_Major_Weight"], "Partner Gender": row["P_Gender"].strip(), "Partner Gender Weight": row["P_Gender_Weight"]})
    step_2 = pd.DataFrame(formatted_data, columns=["Timestamp", "First", "Last", "Email", "SID", "Level", "Gender", "Major", "Teach", "Learn", "Comments", "Days Available", 
    "Partner Major", "Partner Major Weight", "Partner Gender", "Partner Gender Weight"])
    print(step_2)
    return "Complete"