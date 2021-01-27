import os
from typing import Dict

from flask import Flask
from flask_cors import CORS

from api.auth_views import auth_views
from api.extensions import db, User, Role
from api.utils import create_test_user, create_test_admin

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_views)

# TODO: Need to change some of these to environment variables.
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
with app.app_context():
    db.create_all()
    create_test_user()
    create_test_admin()

if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()

    app.run(debug=True)
