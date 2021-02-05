import base64
from api.extensions import User, db


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
        with open('/home/navi/Personal/repos/mikanikos/default-avatar.png', 'rb') as avt:
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
