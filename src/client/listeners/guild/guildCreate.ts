import { Guild } from 'discord.js';

import Listener from "#structures/Listener";

export default class GuildCreateListener extends Listener {
  public async exec(guild: Guild) {
    return this.client.getSlashCommands()
      .forEach(guild.commands.create)
  }
}
