from flask import Flask, Blueprint, jsonify

timesheetform = Blueprint('timesheetform', __name__, template_folder='templates')

@timesheetform.route('/updatepage')
def updatepage():
    return {"Semester":"Spring 2021"}