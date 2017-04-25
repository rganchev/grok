import inspect
import re
import os
import importlib.util
from grok import log


class GrokPlugin(object):
    def register(self):
        pass


class PluginManager(object):
    def __init__(self, dirs):
        self._dirs = dirs
        self._plugins = None

    def collectPlugins(self):
        self._plugins = []
        for directory in map(os.path.abspath, self._dirs):
            if not os.path.isdir(directory):
                log.debug('Skipping %s (not a directory)' % directory)
                continue
            iterator = os.walk(directory, followlinks=True)
            for (dirpath, dirnames, filenames) in iterator:
                for filename in filenames:
                    if re.search('\.py$', filename):
                        module_name = inspect.getmodulename(filename)
                        spec = importlib.util.spec_from_file_location(
                            module_name,
                            os.path.join(dirpath, filename))
                        module = importlib.util.module_from_spec(spec)
                        spec.loader.exec_module(module)
                        if issubclass(module.Plugin, GrokPlugin):
                            self._plugins.append(module.Plugin())

    def getAllPlugins(self):
        if not self._plugins:
            raise ValueError('Call collectPlugins first!')

        return self._plugins
