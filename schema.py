import graphene


class Query(graphene.ObjectType):
    hello = graphene.String()

    def resolve_hello(self, args, info):
        return 'World'


schema = graphene.Schema(query=Query)
