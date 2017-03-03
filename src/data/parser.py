import csv
from .frame import DataFrame


def parseCSV(file):
    with open(file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        iterator = iter(reader)
        dataFrame = DataFrame(next(iterator))
        for row in iterator:
            dataFrame.add(row)

        return dataFrame
