from graphene import resolve_only_args, Field, ID
from grok.db.mongo import DB
from grok.db.util import generate_ds_name
from grok.graphql.types.dataset import Dataset
from grok.graphql.types.root import RootQuery
from grok.graphql.grok_plugin import GrokPlugin


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
