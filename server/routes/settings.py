from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
import json

settings = Blueprint('settings', __name__, template_folder='templates')
CORS(settings)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")


# Change to Post later
@settings.route('/save', methods = ['GET'])
def saveInfo():
    return jsonify({"save": True})