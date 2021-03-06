import base64
import time
from dataclasses import dataclass

import jwt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


@dataclass
class User(db.Model):
    __tablename__ = 'users'

    id: int
    username: str
    # password_hash: str (we leave this out for security reasons so as not to return it to the browser)
    email: str
    firstname: str
    lastname: str
    role: str
    avatar: bytes
    biography: str
    email: str

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, nullable=False, unique=True)
    password_hash = db.Column(db.String(64))
    email = db.Column(db.String(255, collation='NOCASE'), nullable=False, unique=True)
    firstname = db.Column(
        db.String(100, collation='NOCASE'), nullable=False, server_default=''
    )
    lastname = db.Column(
        db.String(100, collation='NOCASE'), nullable=False, server_default=''
    )
    # Define the relationship to Role via UserRoles
    role = db.Column(db.String(32, collation='NOCASE'), nullable=False, server_default='')
    avatar = db.Column(db.BLOB(), nullable=True)
    biography = db.Column(db.String(8000, collation='NOCASE'), nullable=False, server_default='')

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, app: Flask, expires_in=600):
        return jwt.encode({
            'id': self.id,
            'exp': time.time() + expires_in
        },
                          app.config['SECRET_KEY'],
                          algorithm='HS256')

    @staticmethod
    def verify_auth_token(token, app: Flask):
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return "Invalid Token"
        return User.query.get(data['id'])
