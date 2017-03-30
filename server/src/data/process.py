from src.data import parser
from src.db.mongo import DB
from src.db.util import generate_ds_id, generate_ds_name

def process_dataset(csv_filepath):
    dsid = generate_ds_id()
    ds_name = generate_ds_name(dsid)
    db = DB(ds_name)
    data = parser.parseCSV(csv_filepath)
    col_names = data.col_names()
    for row in data:
        document = dict(zip(col_names, row))
        db['data'].insert_one(document)
    return dsid
    