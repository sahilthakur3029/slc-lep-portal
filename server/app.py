from flask import Flask, jsonify, request
from routes.algorithm import algorithm
from routes.intakeform import intakeform
from routes.timesheetform import timesheetform
from routes.studentdisplay import studentdisplay
from routes.pairsdisplay import pairsdisplay
from routes.unpaireddisplay import unpaireddisplay
<<<<<<< HEAD
from routes.settings import settings 
=======
from routes.timesheetdisplay import timesheetdisplay
>>>>>>> riddhipart2
from flask_cors import CORS
from flask_login import (
    LoginManager,
    UserMixin,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_wtf.csrf import CSRFProtect, generate_csrf
import psycopg2
import google_token

app = Flask(__name__, static_folder="public")
app.register_blueprint(intakeform)
app.register_blueprint(timesheetform)
app.register_blueprint(algorithm)
app.register_blueprint(studentdisplay)
app.register_blueprint(pairsdisplay)
app.register_blueprint(unpaireddisplay)
<<<<<<< HEAD
app.register_blueprint(settings)
=======
app.register_blueprint(timesheetdisplay)
>>>>>>> riddhipart2
CORS(app)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres password=ksshiraja")
# Open a cursor to perform database operations
cur = conn.cursor()

app.config.update(
    DEBUG=True,
    SECRET_KEY="secret_sauce",
    SESSION_COOKIE_HTTPONLY=True,
    REMEMBER_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong"

csrf = CSRFProtect(app)
cors = CORS(
    app,
    resources={r"*": {"origins": "http://localhost:3000"}},
    expose_headers=["Content-Type", "X-CSRFToken"],
    supports_credentials=True,
)

app.config['GOOGLE_CLIENT_ID'] = "400000931739-oqett115tft12ja9u5lehnimqu87bebd.apps.googleusercontent.com"

@login_manager.unauthorized_handler     
def unauthorized_callback():  
    print("User unauthorized - Something went wrong")          
    return jsonify({"login": False})


class User(UserMixin):
    def __init__(self, ident, email):
        self.id = ident
        self.email = email


def get_user(user_id: int):
    cur = conn.cursor()
    sql = """SELECT email FROM authusers WHERE id=%s"""
    # Execute a query
    cur.execute(sql, (user_id,))
    # Retrieve query results
    records = cur.fetchall()
    # Close cursor
    cur.close()
    try:
        if records[0][0]:
            return records[0][0]
    except:
        return None
    return None

# The user loader looks up a user by their user ID, and is called by
# flask-login to get the current user from the session.  Return None
# if the user ID isn't valid.
@login_manager.user_loader
def user_loader(id: int):
    user_email = get_user(id)
    if user_email:
        user_model = User(id, user_email)
        return user_model
    # If this is hit something went wrong with the database (will call unauthorized_callback)
    return None


@app.route("/api/ping", methods=["GET"])
def home():
    return jsonify({"ping": "pong!"})


@app.route("/api/getcsrf", methods=["GET"])
def get_csrf():
    token = generate_csrf()
    response = jsonify({"detail": "CSRF cookie set"})
    response.headers.set("X-CSRFToken", token)
    return response


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    id_token = data.get("id_token")

    # Case 1: Null Check
    if id_token is None:
        return jsonify({"login": False})

    # Case 2: Decodes Token + Checks For Invalid ID Token 
    try:
        identity = google_token.validate_id_token(
            id_token, app.config['GOOGLE_CLIENT_ID'])
    except ValueError:
        return jsonify({"login": False})
    
    # Case 3: Unexpected Response
    if ('email' not in identity):
        return jsonify({"login": False})

    # Case 4: Unauthorized @berkeley.edu email login
    cur = conn.cursor()
    sql = """SELECT id FROM authusers WHERE email=%s"""
    # Execute a query
    cur.execute(sql, (identity['email'],))
    # Retrieve query results
    records = cur.fetchall()
    # Close cursor
    cur.close()
    if len(records) == 0:
        return jsonify({"login": False})

    # Create user and signin
    user_model = User(records[0][0], identity['email'])
    login_user(user_model)
    return jsonify({"login": True})


@app.route("/api/data", methods=["GET"])
@login_required
def user_data():
    user = get_user(current_user.id)
    return jsonify({"email": user})


@app.route("/api/getsession", methods=["GET"])
def check_session():
    if current_user.is_authenticated:
        return jsonify({"login": True})

    return jsonify({"login": False})


@app.route("/api/logout", methods=["GET"])
@login_required
def logout():
    logout_user()
    return jsonify({"logout": True})


@app.route('/test')
def index():
  # Execute a query
  cur.execute("SELECT * FROM formmang")

  # Retrieve query results
  records = cur.fetchall()
  return {"Test":"Hello World!"}


if __name__ == '__main__': 
  app.run(debug=True, host='0.0.0.0')

