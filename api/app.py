from typing import Dict

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/greeting")
def greeting() -> Dict[str, str]:
    return {"greeting": "Hello from Flask!"}
