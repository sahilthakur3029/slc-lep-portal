from flask import Flask, Blueprint, jsonify

intakeform = Blueprint('intakeform', __name__, template_folder='templates')

@intakeform.route('/applicant')
def insertApplicant():
    return {"Applicant":"Sahil"}

@intakeform.route('/intakerender')
def getSemester():
    return {"semester": "Spring 2021"}
