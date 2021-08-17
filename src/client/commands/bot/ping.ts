import InteractionCommand from "#structures/command/InteractionCommand";
import InteractionContext from "#structures/command/InteractionContext";

export default class PingCommand extends InteractionCommand {
  config = {
    name: 'ping',
    description: 'Show my latency!'
  }

  public async exec(context: InteractionContext) {
    return context.interaction.reply({ content: `Minha latência é \`${this.client.ws.ping}\` ms!` });
  }
}
