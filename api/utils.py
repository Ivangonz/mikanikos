import base64
import logging
import os
import sqlite3

from api.extensions import User, db

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

img_path = os.path.abspath('default-avatar')

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Exception as e:
        LOGGER.error(e)
    return conn


# def create_test_user():
#     if not User.query.filter(User.email == 'member@example.com').first():
#         user = User(
#             email='member@example.com',
#             firstname='Momo',
#             lastname='Man',
#             username='momoman'
#         )
#         user.hash_password('blue')
#         db.session.add(user)
#         db.session.commit()


def create_test_admin():
    if not User.query.filter(User.email == 'lfernandez@weber.edu').first():
        with open(img_path, 'rb') as avt:
            avatar_img = base64.b64encode(avt.read())
        user = User(
            email='lfernandez@weber.edu',
            firstname='Luke',
            lastname='Fern',
            username='lfernandez',
            role='admin',
            biography='',
            avatar=avatar_img,
        )
        user.hash_password('white')
        db.session.add(user)
        db.session.commit()
