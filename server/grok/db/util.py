import random

DB_UID_SYMBOLS = ([chr(c) for c in range(ord('A'), ord('Z'))] +
                  [chr(c) for c in range(ord('a'), ord('z'))])


def generate_ds_id():
    return ''.join(random.choice(DB_UID_SYMBOLS) for _ in range(8))


def generate_ds_name(dsid):
    return 'grok-dataset-' + dsid
