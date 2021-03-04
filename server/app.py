from flask import Flask, jsonify
from routes.intakeform import intakeform
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(intakeform)
CORS(app)

@app.route('/test')
def index():
    return {"Test":"Hello World!"}


if __name__ == '__main__': 
  app.run(debug=True, host='0.0.0.0')

