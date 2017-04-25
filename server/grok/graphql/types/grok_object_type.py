import graphene
from graphene.types.utils import get_field_as


class GrokObjectType(graphene.ObjectType):
    @classmethod
    def extend(cls, fname, ftype, fresolver):
        if fname in cls._meta.fields:
            raise ValueError('Resolver for field {}.{} already exists!'
                             .format(cls.__name__, fname))

        field = {fname: get_field_as(ftype, graphene.Field)}
        cls._meta.local_fields.update(field)
        cls._meta.fields.update(field)
        setattr(cls, 'resolve_' + fname, fresolver)
