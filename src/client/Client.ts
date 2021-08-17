import { ApplicationCommandData, Client, ClientEvents, Collection, Intents, Options } from 'discord.js';
import { resolve } from 'path';

import FileUtils from '#utils/FileUtils';
import InteractionCommand from "#structures/command/InteractionCommand";
import Listener from '#structures/Listener';

export default class TerminalClient extends Client {
  public commands: Collection<string, InteractionCommand>;

  public constructor() {
    super({
      intents: [Intents.FLAGS.GUILD_MEMBERS],
      makeCache: Options.cacheWithLimits({
        BaseGuildEmojiManager: 0,
        GuildBanManager: 0,
        GuildInviteManager: 0,
        GuildMemberManager: 0,
        GuildStickerManager: 0,
        PresenceManager: 0,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 0,
        VoiceStateManager: 0,
      }),
      allowedMentions: { parse: ['users'], repliedUser: true },
      failIfNotExists: true,
    });

    this.token = process.env[`BOT_${process.env.NODE_ENV !== 'production' ? 'DEV_' : ''}TOKEN`];
    this.commands = new Collection();
  }

  init() {
    super.login(this.token);

    this.loadCommands(resolve(__dirname, 'commands'));
    this.loadListeners(resolve(__dirname, 'listeners'));
  }

  public loadCommands(directory: string): void {
    return FileUtils.readDirectory<typeof InteractionCommand>(
      directory,
      (SlashCommand: typeof InteractionCommand) => {
        // @ts-expect-error Abstract class cannot be invoked
        const command: InteractionCommand = new SlashCommand(this);

        return this.commands.set(command.config.name, command);
      }
    )
  }

  public loadListeners(directory: string) {
    return FileUtils.readDirectory(directory,
      (ListenerClass: typeof Listener, filepath: string) => {
        const listener: Listener = new ListenerClass(this);

        listener.exec = listener.exec.bind(listener);

        this.on(FileUtils.filename(filepath) as keyof ClientEvents, listener.exec);
      }
    );
  }

  public getSlashCommands() {
    return this.commands.reduce<ApplicationCommandData[]>((p, c) => {
      if (c.config.onlyDevs) return p;
    
      p.push({
        name: c.config.name,
        description: c.config.description,
        options: c.config.options,
        defaultPermission: c.config.defaultPermission,
      });
    
      return p;
    }, []);
  }
}
