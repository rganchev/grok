from pymongo import MongoClient


class DB(object):
    client = MongoClient()

    """Represents a Mongo database with the given name"""
    def __init__(self, name):
        self._db = self.client[name]

    def __getitem__(self, key):
        return self._db[key]
