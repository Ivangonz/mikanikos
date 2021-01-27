from api.extensions import User, Role, db


def create_test_user():
    if not User.query.filter(User.email == 'member@example.com').first():
        user = User(
            email='member@example.com',
            firstname='Momo',
            lastname='Man',
            username='momoman'
        )
        user.hash_password('blue')
        user.roles.append(Role(name='member'))
        db.session.add(user)
        db.session.commit()


def create_test_admin():
    if not User.query.filter(User.email == 'lfernandez@weber.edu').first():
        user = User(
            email='lfernandez@weber.edu',
            firstname='Luke',
            lastname='Fern',
            username='lfernandez'
        )
        user.hash_password('white')
        user.roles.append(Role(name='admin'))
        user.roles.append(Role(name='agent'))
        db.session.add(user)
        db.session.commit()
