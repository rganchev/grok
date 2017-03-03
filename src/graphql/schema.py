import graphene
from pprint import pprint
from graphene import resolve_only_args
from .dataset import Dataset
from src.db.mongo import DB
from src.db.util import generate_ds_name


class Query(graphene.ObjectType):
    show = graphene.Field(Dataset,
                          dsid=graphene.NonNull(graphene.ID),
                          columns=graphene.List(graphene.String)
                          )

    @resolve_only_args
    def resolve_show(self, dsid, columns=None):
        ds_name = generate_ds_name(dsid)
        db = DB(ds_name)
        projection = { '_id': False }
        if columns:
            projection.update(dict(zip(columns, [True] * len(columns))))
        row = db['data'].find_one({}, projection)
        if row:
            row_keys = list(row.keys())
            if columns:
                col_names = [c for c in columns if c in row_keys]
            else:
                col_names = sorted(row_keys)
        else:
            col_names = []
        return Dataset(dsid=dsid, colNames=col_names)


schema = graphene.Schema(query=Query)
