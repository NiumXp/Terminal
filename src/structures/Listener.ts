import { Awaited } from 'discord.js';

import TerminalClient from 'client/Client';

export default class Listener {
  public constructor (public client: TerminalClient) {}

  public exec(...parameters: unknown[]): Awaited<void> {
    throw new Error('Name function "exec" has not been defined');
  }
}
