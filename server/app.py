from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/sahil')
def index():
    a = {"sahil":"hi"}
    return jsonify(a)


if __name__ == '__main__': 
  app.run(debug=True, host='0.0.0.0')

