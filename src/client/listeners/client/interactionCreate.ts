import {
  ButtonInteraction,
  CommandInteraction,
  Interaction
} from "discord.js";

import Listener from "#structures/Listener";
import InteractionContext from "#structures/command/InteractionContext";

export default class InteractionCreateListener extends Listener {
  public exec(interaction: Interaction): any {
    if (interaction.isCommand() && interaction.inGuild())
      return this.executeSlashCommand(interaction);

    if (interaction.isButton() && interaction.channelId === '876864653085532210')
      return this.executeButtons(interaction);
  }

  private executeSlashCommand (interaction: CommandInteraction) {
    const command = this.client.commands.get(interaction.commandName);

    if (command?.config.onlyDevs && !process.env.OWNERS.includes(interaction.member.user.id))
      return interaction.reply({
        content: 'Esse comando está disponível somente para meus desenvolvedores!',
        ephemeral: true,
      });

    const context = new InteractionContext(this.client, interaction);

    try {
      return command.exec(context).catch(console.error);
    } catch (error) {
      return console.error(error.stack);
    }
  }

  private executeButtons (interaction: ButtonInteraction) {
    if (!process.env.OWNERS.includes(interaction.member.user.id)) {
      return interaction.reply({
        content: 'Epa epa... Só meus desenvolvedores podem utilizar estes botões!',
        ephemeral: true,
      });
    }

    switch (interaction.customId) {
      case 'developer_deploy_commands': {        
        this.client.application.commands.set(this.client.getSlashCommands());

        return interaction.reply({
          content: 'Prontinho! Agora todos os meus comandos estão sincronizados com o Discord 🥳',
          ephemeral: true,
        });
      }
    }
  }
}
