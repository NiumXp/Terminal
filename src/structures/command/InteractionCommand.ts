import { ChatInputApplicationCommandData /* , PermissionResolvable */ } from 'discord.js';

import TerminalClient from 'client/Client';
import InteractionContext from './InteractionContext';

export default class InteractionCommand {
  public constructor(
    public client: TerminalClient,
    public config: InteractionData
  ) {}

  public exec(context: InteractionContext): Promise<void> {
    throw new Error('Name function "exec" has not been defined');
  }
}

interface InteractionData extends ChatInputApplicationCommandData {
  onlyDevs?: boolean;
  // userPermissions?: PermissionResolvable[];
  // clientPermissions?: PermissionResolvable[];
}
