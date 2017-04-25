from graphene import resolve_only_args, Field
from flask_login import current_user
from grok.graphql.types.user import User
from grok.graphql.types.root import RootQuery
from grok.graphql.grok_plugin import GrokPlugin


@resolve_only_args
def resolve_me(self):
    return User(id=current_user.id, name=current_user.name)


class Plugin(GrokPlugin):
    def register(self):
        RootQuery.extend('me', Field(User), resolve_me)
