from graphene import ID, String
from .grok_object_type import GrokObjectType


class User(GrokObjectType):
    id = ID()
    name = String()
