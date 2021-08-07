from functools import partial
from decouple import config

_       = lambda t: partial(config, cast=t)
_Int    = _(int)
_Str    = _(str)
_Bool   = _(bool)

# Config values
DEBUG = _Bool("DEBUG", default=True)

DISCORD_TOKEN  = _Str("DISCORD_TOKEN")
DISCORD_PREFIX = _Str("DISCORD_PREFIX", default=';')

LOAD_COGS = _Bool("LOAD_COGS", default=True)
IGNORE_INITIAL_ERRORS = _Bool("IGNORE_INITIAL_ERRORS", default=False)
