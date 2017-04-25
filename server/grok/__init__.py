import logging
import tempfile
from flask import Flask
from flask_cors import CORS
from grok.db.mongo import DBJSONEncoder

log = logging.getLogger('grok')
log.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
log.addHandler(console_handler)

app = Flask(__name__)
app.config.update(
    UPLOAD_FOLDER=tempfile.gettempdir(),
    SECRET_KEY='f2c58f164b264229'
)
app.json_encoder = DBJSONEncoder

CORS(app, supports_credentials=True)

import grok.auth      # noqa
import grok.datasets  # noqa
import grok.graph     # noqa
