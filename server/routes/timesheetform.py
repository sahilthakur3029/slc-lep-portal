from flask import Flask, Blueprint, jsonify

timesheetform = Blueprint('timesheetform', __name__, template_folder='templates')

@timesheetform.route('/tsrender')
def updatepage():
    return {"allWeeks": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            "calendarLink": "bit.ly/slc-sp21",
            "semester": "Spring 2021",
    }