import graphene
from .grok_plugin import PluginManager
from .types.root import RootQuery

_pluginManager = PluginManager(['src/graphql/resolvers'])
_pluginManager.collectPlugins()
for plugin in _pluginManager.getAllPlugins():
    plugin.register()

schema = graphene.Schema(query=RootQuery)
