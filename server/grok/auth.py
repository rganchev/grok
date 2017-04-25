import bcrypt
from flask import request, jsonify
from flask_login import UserMixin, AnonymousUserMixin, LoginManager,\
    login_user, logout_user, login_required, current_user
from bson.objectid import ObjectId
from . import app
from .db.mongo import DB


class User(UserMixin):
    def __init__(self, db_user=None, **kwargs):
        self.id = str(db_user['_id'] if db_user else kwargs['id'])
        data = db_user or kwargs
        self.name = data['name']
        self.email = data['email']


class Anonymous(AnonymousUserMixin):
    def __init__(self):
        self.name = 'Guest'


db_users = DB('grok')['users']
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.anonymous_user = Anonymous


@login_manager.user_loader
def load_user(user_id):
    db_user = db_users.find_one({'_id': ObjectId(user_id)})
    return User(db_user) if db_user else None


@app.route('/auth/register', methods=['POST'])
def register():
    if any(k not in request.form for k in ('name', 'email', 'password')):
        return 'Name, email, and password are required to register!', 400

    name, email, pw = [request.form[k] for k in ('name', 'email', 'password')]

    if db_users.find_one({'email': email}):
        return 'Email already registered!', 400

    if len(pw) < 6:
        return 'Password too short!', 400

    salt = bcrypt.gensalt()
    pw_bytes = pw.encode('utf-8')
    res = db_users.insert_one({
        'name': name,
        'email': email,
        'password': bcrypt.hashpw(pw_bytes, salt)
    })

    login_user(User(id=res.inserted_id, name=name, email=email))

    return jsonify(current_user.__dict__)


@app.route('/auth/login', methods=['POST'])
def login():
    if any(k not in request.form for k in ('email', 'password')):
        return 'Email and password are required to login!', 400

    email, pw = [request.form[k] for k in ('email', 'password')]

    db_user = db_users.find_one({'email': email})
    if not db_user:
        return 'Invalid credentials!', 401

    pw_bytes = pw.encode('utf-8')
    db_pw = db_user['password']
    if bcrypt.hashpw(pw_bytes, db_pw) != db_pw:
        return 'Invalid credentials!', 401

    login_user(User(db_user))

    return jsonify(current_user.__dict__)


@app.route('/auth/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return 'OK'


@app.route('/auth/me', methods=['GET'])
def me():
    return jsonify(current_user.__dict__)
