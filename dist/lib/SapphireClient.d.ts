import type { Piece, Store } from '@sapphire/pieces';
import { Client, ClientOptions, Message } from 'discord.js';
import type { Plugin } from './plugins/Plugin';
import { PluginManager } from './plugins/PluginManager';
import { ArgumentStore } from './structures/ArgumentStore';
import { CommandStore } from './structures/CommandStore';
import { EventStore } from './structures/EventStore';
import { PreconditionStore } from './structures/PreconditionStore';
import type { IInternationalization } from './utils/i18n/IInternationalization';
import { ILogger, LogLevel } from './utils/logger/ILogger';
import type { Awaited } from './utils/Types';
import './extensions/SapphireMessage';
/**
 * A valid prefix in Sapphire.
 * * `string`: a single prefix, e.g. `'!'`.
 * * `string[]`: an array of prefixes, e.g. `['!', '.']`.
 * * `null`: disabled prefix, locks the bot's command usage to mentions only.
 */
export declare type SapphirePrefix = string | readonly string[] | null;
export interface SapphirePrefixHook {
    (message: Message): Awaited<SapphirePrefix>;
}
export interface SapphireClientOptions {
    /**
     * The base user directory, if set to `null`, Sapphire will not call [[SapphireClient.registerUserDirectories]],
     * meaning that you will need to manually set each folder for each store. Please read the aforementioned method's
     * documentation for more information.
     * @since 1.0.0
     * @default undefined
     */
    baseUserDirectory?: string | null;
    /**
     * The default prefix, in case of `null`, only mention prefix will trigger the bot's commands.
     * @since 1.0.0
     * @default null
     */
    defaultPrefix?: SapphirePrefix;
    /**
     * The prefix hook, by default it is a callback function that returns [[SapphireClientOptions.defaultPrefix]].
     * @since 1.0.0
     * @default () => client.options.defaultPrefix
     */
    fetchPrefix?: SapphirePrefixHook;
    /**
     * The internationalization options, defaults to an instance of [[Internationalization]] when
     * [[ClientInternationalizationOptions.instance]] is not specified.
     * @since 1.0.0
     * @default { instance: new Internationalization('en-US') }
     */
    i18n?: ClientInternationalizationOptions;
    /**
     * The client's ID, this is automatically set by the CoreReady event.
     * @since 1.0.0
     * @default this.client.user?.id ?? null
     */
    id?: string;
    /**
     * The logger options, defaults to an instance of [[Logger]] when [[ClientLoggerOptions.instance]] is not specified.
     * @since 1.0.0
     * @default { instance: new Logger(LogLevel.Info) }
     */
    logger?: ClientLoggerOptions;
}
/**
 * The base [[Client]] extension that makes Sapphire work. When building a Discord bot with the framework, the developer
 * must either use this class, or extend it.
 *
 * Sapphire also automatically detects the folders to scan for pieces, please read
 * [[SapphireClient.registerUserDirectories]] for reference. This method is called at the start of the
 * [[SapphireClient.login]] method.
 *
 * @since 1.0.0
 * @example
 * ```typescript
 * const client = new SapphireClient({
 *   presence: {
 *     activity: {
 *       name: 'for commands!',
 *       type: 'LISTENING'
 *     }
 *   }
 * });
 *
 * client.login(process.env.DISCORD_TOKEN)
 *   .catch(console.error);
 * ```
 *
 * @example
 * ```typescript
 * // Automatically scan from a specific directory, e.g. the main
 * // file is at `/home/me/bot/index.js` and all your pieces are at
 * // `/home/me/bot/pieces` (e.g. `/home/me/bot/pieces/commands/MyCommand.js`):
 * const client = new SapphireClient({
 *   baseUserDirectory: join(__dirname, 'pieces'),
 *   // More options...
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Opt-out automatic scanning:
 * const client = new SapphireClient({
 *   baseUserDirectory: null,
 *   // More options...
 * });
 * ```
 */
export declare class SapphireClient extends Client {
    /**
     * The client's ID, used for the user prefix.
     * @since 1.0.0
     */
    id: string | null;
    /**
     * The method to be overriden by the developer.
     * @since 1.0.0
     * @return A string for a single prefix, an array of strings for matching multiple, or null for no match (mention prefix only).
     * @example
     * ```typescript
     * // Return always the same prefix (unconfigurable):
     * client.fetchPrefix = () => '!';
     * ```
     * @example
     * ```typescript
     * // Retrieving the prefix from a SQL database:
     * client.fetchPrefix = async (message) => {
     *   // note: driver is something generic and depends on how you connect to your database
     *   const guild = await driver.getOne('SELECT prefix FROM public.guild WHERE id = $1', [message.guild.id]);
     *   return guild?.prefix ?? '!';
     * };
     * ```
     * @example
     * ```typescript
     * // Retrieving the prefix from an ORM:
     * client.fetchPrefix = async (message) => {
     *   // note: driver is something generic and depends on how you connect to your database
     *   const guild = await driver.getRepository(GuildEntity).findOne({ id: message.guild.id });
     *   return guild?.prefix ?? '!';
     * };
     * ```
     */
    fetchPrefix: SapphirePrefixHook;
    /**
     * The logger to be used by the framework and plugins. By default, a [[Logger]] instance is used, which emits the
     * messages to the console.
     * @since 1.0.0
     */
    logger: ILogger;
    /**
     * The internationalization handler to be used by the framework and plugins.
     * @since 1.0.0
     */
    i18n: IInternationalization;
    /**
     * The arguments the framework has registered.
     * @since 1.0.0
     */
    arguments: ArgumentStore;
    /**
     * The commands the framework has registered.
     * @since 1.0.0
     */
    commands: CommandStore;
    /**
     * The events the framework has registered.
     * @since 1.0.0
     */
    events: EventStore;
    /**
     * The precondition the framework has registered.
     * @since 1.0.0
     */
    preconditions: PreconditionStore;
    /**
     * The registered stores.
     * @since 1.0.0
     */
    stores: Set<Store<Piece>>;
    constructor(options?: ClientOptions);
    /**
     * Registers all user directories from the process working directory, the default value is obtained by assuming
     * CommonJS (high accuracy) but with fallback for ECMAScript Modules (reads package.json's `main` entry, fallbacks
     * to `process.cwd()`).
     *
     * By default, if you have this folder structure:
     * ```
     * /home/me/my-bot
     * ├─ src
     * │  ├─ commands
     * │  ├─ events
     * │  └─ main.js
     * └─ package.json
     * ```
     *
     * And you run `node src/main.js`, the directories `/home/me/my-bot/src/commands` and `/home/me/my-bot/src/events` will
     * be registered for the commands and events stores respectively, since both directories are located in the same
     * directory as your main file.
     *
     * **Note**: this also registers directories for all other stores, even if they don't have a folder, this allows you
     * to create new pieces and hot-load them later anytime.
     * @param rootDirectory The root directory to register pieces at.
     */
    registerUserDirectories(rootDirectory?: string): void;
    /**
     * Registers a store.
     * @param store The store to register.
     */
    registerStore<T extends Piece>(store: Store<T>): this;
    /**
     * Loads all pieces, then logs the client in, establishing a websocket connection to Discord.
     * @since 1.0.0
     * @param token Token of the account to log in with.
     * @retrun Token of the account used.
     */
    login(token?: string): Promise<string>;
    static plugins: PluginManager;
    static use(plugin: typeof Plugin): typeof SapphireClient;
}
export interface ClientLoggerOptions {
    level?: LogLevel;
    instance?: ILogger;
}
export interface ClientInternationalizationOptions {
    defaultName?: string;
    instance?: IInternationalization;
}
declare module 'discord.js' {
    interface Client {
        id: string | null;
        logger: ILogger;
        i18n: IInternationalization;
        arguments: ArgumentStore;
        commands: CommandStore;
        events: EventStore;
        preconditions: PreconditionStore;
        fetchPrefix: SapphirePrefixHook;
    }
    interface ClientOptions extends SapphireClientOptions {
    }
    interface Message {
        fetchLanguage(): Awaited<string>;
        fetchLanguageKey(key: string, ...values: readonly unknown[]): Promise<string>;
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
        sendTranslated(key: string, options?: MessageOptions | (MessageOptions & {
            split?: false;
        }) | MessageAdditions): Promise<Message>;
        sendTranslated(key: string, options?: MessageOptions & {
            split: true | SplitOptions;
        }): Promise<Message[]>;
    }
}
//# sourceMappingURL=SapphireClient.d.ts.map