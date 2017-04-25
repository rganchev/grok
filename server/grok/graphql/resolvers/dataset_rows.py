from graphene import resolve_only_args, Field, List, String
from grok.db.mongo import DB
from grok.db.util import generate_ds_name
from grok.graphql.types.dataset import Dataset
from grok.graphql.grok_plugin import GrokPlugin


@resolve_only_args
def resolve_rows(self, columns=None):
    ds_name = generate_ds_name(self.dsid)
    db = DB(ds_name)
    projection = {'_id': False}
    cols = columns or self.columns
    projection.update(dict(zip(cols, [True] * len(cols))))
    data = db['data'].find({}, projection)
    rows = []
    for row in data:
        rows.append([row[col] for col in cols])

    return rows


class Plugin(GrokPlugin):
    def register(self):
        Dataset.extend(
            'rows',
            Field(List(List(String)), args={'columns': List(String)}),
            resolve_rows)
