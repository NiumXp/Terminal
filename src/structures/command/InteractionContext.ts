import {
  CommandInteraction,
  CommandInteractionOptionResolver,
  InteractionReplyOptions
} from 'discord.js';

import TerminalClient from 'client/Client';

export default class InteractionContext {
  public constructor(
    public client: TerminalClient,
    public interaction: CommandInteraction
  ) {};

  get options(): CommandInteractionOptionResolver {
    return this.interaction.options;
  }

  async reply(options: InteractionReplyOptions): Promise<void> {
    return this.interaction.reply(options).catch(() => undefined);
  }

  async send(options: InteractionReplyOptions): Promise<void> {
    return this.interaction.followUp(options).catch(() => undefined);
  }

  async deleteReply(): Promise<void> {
    return this.interaction.deleteReply().catch(() => undefined);
  }

  async editReply(options: InteractionReplyOptions): Promise<void> {
    await this.interaction.editReply(options).catch(() => undefined);
  }
}
