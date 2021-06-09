from flask import Flask, jsonify, request
from routes.algorithm import algorithm
from routes.intakeform import intakeform
from routes.timesheetform import timesheetform
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

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")
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

# database
users = [
    {
        "id": 1,
        "username": "test",
        "password": "test",
    }
]


class User(UserMixin):
    ...


def get_user(user_id: int):
    for user in users:
        if int(user["id"]) == int(user_id):
            return user
    return None


@login_manager.user_loader
def user_loader(id: int):
    user = get_user(id)
    if user:
        user_model = User()
        user_model.id = user["id"]
        return user_model
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
    username = data.get("username")
    password = data.get("password")
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
    if ('sub' not in identity or
            'name' not in identity or
            'picture' not in identity):
        return jsonify({"login": False})

    print(identity['sub'])
    print(identity['name'])
    print(identity['picture'])
    for user in users:
        if user["username"] == username and user["password"] == password:
            user_model = User()
            user_model.id = user["id"]
            user_model.name = identity['name']
            login_user(user_model)
            return jsonify({"login": True})

    return jsonify({"login": False})


@app.route("/api/data", methods=["GET"])
@login_required
def user_data():
    print(current_user.id)
    user = get_user(current_user.id)
    return jsonify({"username": current_user.name})


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
  print(records)
  return {"Test":"Hello World!"}


if __name__ == '__main__': 
  app.run(debug=True, host='0.0.0.0')

