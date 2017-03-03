class DataFrame(object):

    def __init__(self, columnNames):
        self._colNames = [c.strip() for c in columnNames]
        self._data = []

    def add(self, row):
        assert len(row) == len(self._colNames)
        self._data.append(row)

    def get(self, i):
        return self._data[i]

    def ncols(self):
        return len(self._colNames)

    def col_names(self):
        return self._colNames

    def __len__(self):
        return len(self._data)

    def __getitem__(self, i):
        return self._data[i]

    def __str__(self):
        headerLens = [len(c) for c in self._colNames]
        maxColLens = [max(len(str(c)) for c in col)
                      for col in zip(*self._data)]
        colWidths = [max(n for n in l) for l in zip(headerLens, maxColLens)]
        s = '  ' + '   '.join('{0:{1}}'.format(x, colWidths[i])
                              for i, x in enumerate(self._colNames))
        for row in self._data:
            s += '\n| ' + ' | '.join('{:{}}'.format(x, colWidths[i])
                                     for i, x in enumerate(row)) + ' |'
        return s
