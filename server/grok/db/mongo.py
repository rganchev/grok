import json
from pymongo import MongoClient
from bson.objectid import ObjectId


class DB(object):
    client = MongoClient()

    """Represents a Mongo database with the given name"""
    def __init__(self, name):
        self._db = self.client[name]

    def __getitem__(self, key):
        return self._db[key]

    def drop(self):
        self.client.drop_database(self._db)


class DBJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
