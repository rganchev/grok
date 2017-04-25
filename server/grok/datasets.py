import os
from flask import request, jsonify
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from bson.objectid import ObjectId
from . import app
from .data.parser import parseCSV
from .db.mongo import DB
from .db.util import generate_ds_id, generate_ds_name

ALLOWED_EXTENSIONS = set(['csv'])
db_datasets = DB('grok')['datasets']


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def process_dataset(csv_filepath):
    dsid = generate_ds_id()
    ds_name = generate_ds_name(dsid)
    db = DB(ds_name)
    data = parseCSV(csv_filepath)
    col_names = data.col_names()
    for row in data:
        document = dict(zip(col_names, row))
        db['data'].insert_one(document)
    return dsid


@app.route('/datasets', methods=['POST'])
@login_required
def upload():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400
    if 'name' not in request.form or not request.form['name']:
        return 'Dataset name is required', 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        dsid = process_dataset(filepath)
        dataset = {
            'dsid': dsid,
            'name': request.form['name'],
            'owner_id': ObjectId(current_user.id)
        }
        dataset['_id'] = db_datasets.insert_one(dataset).inserted_id
        return jsonify(dataset)
    else:
        return 'Extension not allowed', 400


@app.route('/datasets/<dsid>', methods=['DELETE'])
@login_required
def delete(dsid):
    dataset = db_datasets.find_one({'dsid': dsid})
    if not dataset:
        return 'Not found', 404
    if str(dataset['owner_id']) != current_user.id:
        return 'Not allowed', 401

    db_datasets.delete_one({'_id': dataset['_id']})
    db = DB(generate_ds_name(dsid))
    db.drop()
    return ''


@app.route('/datasets', methods=['GET'])
@login_required
def get():
    return jsonify(list(db_datasets.find({
        'owner_id': ObjectId(current_user.id)
    })))
