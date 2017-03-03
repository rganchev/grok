import graphene
from graphene import resolve_only_args
from src.db.mongo import DB
from src.db.util import generate_ds_name
from pprint import pprint


class Dataset(graphene.ObjectType):
    dsid = graphene.ID()
    colNames = graphene.List(graphene.String)
    rows = graphene.List(graphene.List(graphene.String))

    @resolve_only_args
    def resolve_rows(self):
        ds_name = generate_ds_name(self.dsid)
        db = DB(ds_name)
        projection = { '_id': False }
        projection.update(dict(zip(self.colNames,
                                   [True] * len(self.colNames))))
        data = db['data'].find({}, projection)
        rows = []
        for row in data:
            rows.append([row[col] for col in self.colNames])

        return rows
