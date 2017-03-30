from graphene import ID, List, String
from .grok_object_type import GrokObjectType


class Dataset(GrokObjectType):
    dsid = ID()
    columns = List(String)
