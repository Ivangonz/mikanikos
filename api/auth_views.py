from api.extensions import User, Role, db
from flask import Flask, abort, request, jsonify, url_for, render_template, make_response, Blueprint
from flask_httpauth import HTTPBasicAuth
import copy
import json

auth_views = Blueprint('auth_views', __name__)
auth = HTTPBasicAuth()


@auth_views.route('/test')
def get_test():
    return {'greeting': 'HELLO!!!!!'}


@auth_views.route('/api/admin/user', methods=['POST'])
@auth.login_required(role='admin')
@auth.login_required
def create_user():
    print('creating user')
    username = request.json.get('username')
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')
    email = request.json.get('email')
    password = request.json.get('password')

    if username is None or password is None:
        abort(400)  # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)  # existing user
    user = User(username=username, firstname=firstname, lastname=lastname, email=email)
    user.hash_password(password)

    roles_json = request.json.get('roles')
    for role in roles_json:
        role_obj = Role.query.filter(Role.id == role['id']).first()
        user.roles.append(role_obj)

    db.session.add(user)
    db.session.commit()
    return jsonify({'operation': 'success'})
