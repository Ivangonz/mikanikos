import logging
from typing import Dict, Any

from api.extensions import User, db
from flask import Flask, abort, request, jsonify, url_for, render_template, make_response, Blueprint, g
from flask_httpauth import HTTPBasicAuth
import copy
import json
import simplejson as sjson
import sqlite3 as sql

from api.utils import create_connection

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)

db_views = Blueprint('db_views', __name__)


@db_views.route('/api/user/profile', methods=['GET'])
def get_user_profile() -> Dict[str, Any]:
    json_data = []
    try:
        with sql.connect('./db.sqlite') as conn:
            resp = conn.execute("SELECT * FROM Users")
        names = list(map(lambda x: x[0], resp.description))

        data = resp.fetchall()[0]
        json_data = sjson.dumps(dict(zip(names, data)))
    except ConnectionError as e:
        LOGGER.exception(e)

    return json_data
