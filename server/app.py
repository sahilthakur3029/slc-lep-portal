from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/test')
def index():
    a = {"Test":"Hello World!"}
    return jsonify(a)


if __name__ == '__main__': 
  app.run(debug=True, host='0.0.0.0')

