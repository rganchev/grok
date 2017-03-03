import os
import tempfile
import random
from flask import Flask, request
from flask_graphql import GraphQLView
from flask_cors import CORS
from werkzeug.utils import secure_filename
from schema import schema
from src.data import parser
from src.db.mongo import DB

UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = set(['csv'])
DB_UID_SYMBOLS = ([chr(c) for c in range(ord('A'), ord('Z'))] +
                  [chr(c) for c in range(ord('a'), ord('z'))])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True)
)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_ds_id():
    return ''.join(random.choice(DB_UID_SYMBOLS) for _ in range(8))


def generate_ds_name(dsid):
    return ('grok-dataset-' + dsid)


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    print(file)
    if file.filename == '':
        return 'No file selected', 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        dsid = generate_ds_id()
        ds_name = generate_ds_name(dsid)
        db = DB(ds_name)
        data = parser.parseCSV(filepath)
        col_names = data.col_names()
        for row in data:
            document = dict(zip(col_names, row))
            db['data'].insert_one(document)
        return dsid
    else:
        return 'Extension not allowed', 400


if __name__ == '__main__':
    app.run(debug=True)
