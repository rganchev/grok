import os
import tempfile
from flask import Flask, request
from flask_graphql import GraphQLView
from flask_cors import CORS
from werkzeug.utils import secure_filename
from src.graphql.schema import schema
from src.data.process import process_dataset

UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = set(['csv'])

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


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return process_dataset(filepath)
    else:
        return 'Extension not allowed', 400


if __name__ == '__main__':
    app.run(debug=True, port=8080)
