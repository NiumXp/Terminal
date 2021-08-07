import settings  # Need to be first :D

from terminal import Terminal

bot = Terminal(settings.DISCORD_PREFIX)

if settings.LOAD_COGS:
    ...

bot.run(settings.DISCORD_TOKEN)
