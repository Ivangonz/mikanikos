from api.extensions import User, db
from flask import Flask, abort, request, jsonify, url_for, render_template, make_response, Blueprint, g
from flask_httpauth import HTTPBasicAuth

auth_views = Blueprint('auth_views', __name__)
auth = HTTPBasicAuth()


@auth_views.route('/api/greeting')
def get_test():
    return {'greeting': 'Hello.'}


@auth_views.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})


@auth_views.route('/api/account')
@auth.login_required()
def get_account():
    return jsonify({
        'username': g.user.username,
        'email': g.user.email,
        'firstname': g.user.firstname,
        'lastname': g.user.lastname,
        'roles': g.user.roles,
    })


@auth_views.route('/api/profile', methods=['PUT'])
@auth.login_required
def profile():
    user_obj = User.query.filter(User.username == g.user.username).first()
    user_obj.firstname = request.json.get('firstname')
    user_obj.lastname = request.json.get('lastname')
    db.session.add(user_obj)
    return jsonify({
        'username': g.user.username,
        'email': g.user.email,
        'firstname': g.user.username
    })


@auth_views.route('/api/profile', methods=['GET'])
@auth.login_required
def profile_img():
    user_obj = User.query.filter(User.username == g.user.username).first()


# @auth_views.route('/api/profile', methods=['PUT'])
# @auth.login_required
# def update_user():
#     user_obj = User.query.filter(User.username == g.user.username).first()
#     user_obj.firstname = request.json.get('firstname')
#     user_obj.lastname = request.json.get('lastname')
#     user_obj.username = request.json.get('username')
#
#     user_obj.roles[:] = []
#     roles_json = request.json.get('roles')
#     for role in roles_json:
#         role_obj = Role.query.filter(Role.id == role['id']).first()
#         user_obj.roles.append(role_obj)
#
#     try:
#         user_obj.hash_password(request.json.get('password'))
#     except:
#         print("Password param was not passed in json. So not updating it")
#     db.session.add(user_obj)
#     db.session.commit()
#     return jsonify({
#         'operation': 'success',
#     })
#
#
# @auth_views.route('/api/admin/user', methods=['POST'])
# @auth.login_required(role='admin')
# @auth.login_required
# def create_user():
#     print('creating user')
#     username = request.json.get('username')
#     firstname = request.json.get('firstname')
#     lastname = request.json.get('lastname')
#     email = request.json.get('email')
#     password = request.json.get('password')
#
#     if username is None or password is None:
#         abort(400)  # missing arguments
#     if User.query.filter_by(username=username).first() is not None:
#         abort(400)  # existing user
#     user = User(username=username, firstname=firstname, lastname=lastname, email=email)
#     user.hash_password(password)
#
#     roles_json = request.json.get('roles')
#     for role in roles_json:
#         role_obj = Role.query.filter(Role.id == role['id']).first()
#         user.roles.append(role_obj)
#
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({'operation': 'success'})
