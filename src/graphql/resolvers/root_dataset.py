from graphene import resolve_only_args, Field, ID
from src.db.mongo import DB
from src.db.util import generate_ds_name
from src.graphql.types.dataset import Dataset
from src.graphql.types.root import RootQuery
from src.graphql.grok_plugin import GrokPlugin


@resolve_only_args
def resolve_dataset(self, dsid):
    ds_name = generate_ds_name(dsid)
    db = DB(ds_name)
    row = db['data'].find_one({}, {'_id': False})
    col_names = sorted(list(row.keys())) if row else []
    return Dataset(dsid=dsid, columns=col_names)


class Plugin(GrokPlugin):
    def register(self):
        RootQuery.extend(
            'dataset',
            Field(Dataset, args={'dsid': ID()}),
            resolve_dataset)
