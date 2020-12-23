/// <reference types="node" />
import { Awaited, Piece, AliasPiece, PieceContext, AliasPieceOptions, AliasStore, PieceOptions, Store } from '@sapphire/pieces';
export { AliasPiece, AliasPieceOptions, AliasStore, Awaited, LoaderError, MissingExportsError, Piece, PieceContext, PieceOptions, Store, StoreOptions } from '@sapphire/pieces';
import { Message, Channel, DMChannel, GuildChannel, GuildMember, NewsChannel, Role, TextChannel, User, VoiceChannel, Client, ClientOptions, ClientEvents, PermissionResolvable } from 'discord.js';
import { Ok as Ok$1, Err as Err$1, Args as Args$1, UnorderedStrategy } from 'lexure';
import { URL } from 'url';
import { EventEmitter } from 'events';

/**
 * The UserError class to be emitted in the pieces.
 * @property name This will be `'UserError'` and can be used to distinguish the type of error when any error gets thrown
 */
declare class UserError extends Error {
    /**
     * An identifier, useful to localize emitted errors.
     */
    readonly identifier: string;
    /**
     * Constructs an UserError.
     * @param type The identifier, useful to localize emitted errors.
     * @param message The error message.
     */
    constructor(type: string, message: string);
}

/**
 * A type used to express computations that can fail.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
declare type Result<T, E> = Ok<T> | Err<E>;
/**
 * The computation is successful.
 * @typeparam T Type of results.
 */
declare type Ok<T> = Ok$1<T>;
/**
 * The computation failed.
 * @typeparam E Type of errors.
 */
declare type Err<E> = Err$1<E>;
/**
 * Creates an Ok with no value.
 * @return A successful Result.
 */
declare function ok(): Ok<unknown>;
/**
 * Creates an Ok.
 * @typeparam T The result's type.
 * @param x Value to use.
 * @return A successful Result.
 */
declare function ok<T>(x: T): Ok<T>;
/**
 * Creates an Err with no error.
 * @return An erroneous Result.
 */
declare function err(): Err<unknown>;
/**
 * Creates an Err.
 * @typeparam E The error's type.
 * @param x Value to use.
 * @return An erroneous Result.
 */
declare function err<E>(x: E): Err<E>;
/**
 * Determines whether or not a result is an Ok.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
declare function isOk<T, E>(x: Result<T, E>): x is Ok<T>;
/**
 * Determines whether or not a result is an Err.
 * @typeparam T The result's type.
 * @typeparam E The error's type.
 */
declare function isErr<T, E>(x: Result<T, E>): x is Err<E>;

/**
 * The argument parser to be used in [[Command]].
 */
declare class Args {
    /**
     * The original message that triggered the command.
     */
    readonly message: Message;
    /**
     * The command that is being run.
     */
    readonly command: Command;
    private readonly parser;
    private states;
    constructor(message: Message, command: Command, parser: Args$1);
    /**
     * Sets the parser to the first token.
     */
    start(): Args;
    /**
     * Retrieves the next parameter and parses it. Advances index on success.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !square 5
     * const resolver = Args.make((arg) => {
     *   const parsed = Number(argument);
     *   if (Number.isNaN(parsed)) return err(new UserError('ArgumentNumberNaN', 'You must write a valid number.'));
     *   return ok(parsed);
     * });
     * const a = await args.pickResult(resolver);
     * if (!a.success) throw new UserError('ArgumentNumberNaN', 'You must write a valid number.');
     *
     * await message.channel.send(`The result is: ${a.value ** 2}!`);
     * // Sends "The result is: 25"
     * ```
     */
    pickResult<T>(type: IArgument<T>, options?: ArgOptions): Promise<Result<T, UserError>>;
    /**
     * Retrieves the next parameter and parses it. Advances index on success.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !add 1 2
     * const a = await args.pickResult('integer');
     * if (!a.success) throw new UserError('AddArgumentError', 'You must write two numbers, but the first one did not match.');
     *
     * const b = await args.pickResult('integer');
     * if (!b.success) throw new UserError('AddArgumentError', 'You must write two numbers, but the second one did not match.');
     *
     * await message.channel.send(`The result is: ${a.value + b.value}!`);
     * // Sends "The result is: 3"
     * ```
     */
    pickResult<K extends keyof ArgType>(type: K, options?: ArgOptions): Promise<Result<ArgType[K], UserError>>;
    /**
     * Similar to [[Args.pickResult]] but returns the value on success, throwing otherwise.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !square 5
     * const resolver = Args.make((arg) => {
     *   const parsed = Number(argument);
     *   if (Number.isNaN(parsed)) return err(new UserError('ArgumentNumberNaN', 'You must write a valid number.'));
     *   return ok(parsed);
     * });
     * const a = await args.pick(resolver);
     *
     * await message.channel.send(`The result is: ${a ** 2}!`);
     * // Sends "The result is: 25"
     * ```
     */
    pick<T>(type: IArgument<T>, options?: ArgOptions): Promise<T>;
    /**
     * Similar to [[Args.pickResult]] but returns the value on success, throwing otherwise.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !add 1 2
     * const a = await args.pick('integer');
     * const b = await args.pick('integer');
     * await message.channel.send(`The result is: ${a + b}!`);
     * // Sends "The result is: 3"
     * ```
     */
    pick<K extends keyof ArgType>(type: K, options?: ArgOptions): Promise<ArgType[K]>;
    /**
     * Retrieves all the following arguments.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !reverse Hello world!
     * const resolver = Args.make((arg) => ok(arg.split('').reverse()));
     * const a = await args.restResult(resolver);
     * if (!a.success) throw new UserError('AddArgumentError', 'You must write some text.');
     *
     * await message.channel.send(`The reversed value is... ${a.value}`);
     * // Sends "The reversed value is... !dlrow olleH"
     * ```
     */
    restResult<T>(type: IArgument<T>, options?: ArgOptions): Promise<Result<T, UserError>>;
    /**
     * Retrieves all the following arguments.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !add 2 Hello World!
     * const a = await args.pickResult('integer');
     * if (!a.success) throw new UserError('AddArgumentError', 'You must write a number and a text, but the former did not match.');
     *
     * const b = await args.restResult('string', { minimum: 1 });
     * if (!b.success) throw new UserError('AddArgumentError', 'You must write a number and a text, but the latter did not match.');
     *
     * await message.channel.send(`The repeated value is... ${b.value.repeat(a.value)}!`);
     * // Sends "The repeated value is... Hello World!Hello World!"
     * ```
     */
    restResult<K extends keyof ArgType>(type: K, options?: ArgOptions): Promise<Result<ArgType[K], UserError>>;
    /**
     * Similar to [[Args.restResult]] but returns the value on success, throwing otherwise.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !reverse Hello world!
     * const resolver = Args.make((arg) => ok(arg.split('').reverse()));
     * const a = await args.rest(resolver);
     * await message.channel.send(`The reversed value is... ${a}`);
     * // Sends "The reversed value is... !dlrow olleH"
     * ```
     */
    rest<T>(type: IArgument<T>, options?: ArgOptions): Promise<T>;
    /**
     * Similar to [[Args.restResult]] but returns the value on success, throwing otherwise.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !add 2 Hello World!
     * const a = await args.pick('integer');
     * const b = await args.rest('string', { minimum: 1 });
     * await message.channel.send(`The repeated value is... ${b.repeat(a)}!`);
     * // Sends "The repeated value is... Hello World!Hello World!"
     * ```
     */
    rest<K extends keyof ArgType>(type: K, options?: ArgOptions): Promise<ArgType[K]>;
    /**
     * Retrieves all the following arguments.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !add 2 Hello World!
     * const resolver = Args.make((arg) => ok(arg.split('').reverse()));
     * const result = await args.repeatResult(resolver, { times: 5 });
     * if (!result.success) throw new UserError('CountArgumentError', 'You must write up to 5 words.');
     *
     * await message.channel.send(`You have written ${result.value.length} word(s): ${result.value.join(' ')}`);
     * // Sends "You have written 2 word(s): olleH !dlroW"
     * ```
     */
    repeatResult<T>(type: IArgument<T>, options?: RepeatArgOptions): Promise<Result<T[], UserError>>;
    /**
     * Retrieves all the following arguments.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !reverse-each 2 Hello World!
     * const result = await args.repeatResult('string', { times: 5 });
     * if (!result.success) throw new UserError('CountArgumentError', 'You must write up to 5 words.');
     *
     * await message.channel.send(`You have written ${result.value.length} word(s): ${result.value.join(' ')}`);
     * // Sends "You have written 2 word(s): Hello World!"
     * ```
     */
    repeatResult<K extends keyof ArgType>(type: K, options?: RepeatArgOptions): Promise<Result<ArgType[K][], UserError>>;
    /**
     * Similar to [[Args.repeatResult]] but returns the value on success, throwing otherwise.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !reverse-each 2 Hello World!
     * const resolver = Args.make((arg) => ok(arg.split('').reverse()));
     * const result = await args.repeatResult(resolver, { times: 5 });
     * await message.channel.send(`You have written ${result.length} word(s): ${result.join(' ')}`);
     * // Sends "You have written 2 word(s): Hello World!"
     * ```
     */
    repeat<T>(type: IArgument<T>, options?: RepeatArgOptions): Promise<T[]>;
    /**
     * Similar to [[Args.repeatResult]] but returns the value on success, throwing otherwise.
     * @param type The type of the argument.
     * @example
     * ```typescript
     * // !add 2 Hello World!
     * const words = await args.repeat('string', { times: 5 });
     * await message.channel.send(`You have written ${words.length} word(s): ${words.join(' ')}`);
     * // Sends "You have written 2 word(s): Hello World!"
     * ```
     */
    repeat<K extends keyof ArgType>(type: K, options?: RepeatArgOptions): Promise<ArgType[K][]>;
    /**
     * Checks if one or more flag were given.
     * @param keys The name(s) of the flag.
     * @example
     * ```ts
     * // Suppose args are from '--f --g'.
     * console.log(args.getFlags('f'));
     * >>> true
     *
     * console.log(args.getFlags('g', 'h'));
     * >>> true
     *
     * console.log(args.getFlags('h'));
     * >>> false
     * ```
     */
    getFlags(...keys: readonly string[]): boolean;
    /**
     * Gets the last value of one or more options.
     * @param keys The name(s) of the option.
     * @example
     * ```ts
     * // Suppose args are from '--a=1 --b=2 --c=3'.
     * console.log(args.getOption('a'));
     * >>> '1'
     *
     * console.log(args.getOption('b', 'c'));
     * >>> '2'
     *
     * console.log(args.getOption('d'));
     * >>> null
     * ```
     */
    getOption(...keys: readonly string[]): string | null;
    /**
     * Gets all the values of one or more option.
     * @param keys The name(s) of the option.
     * @example
     * ```ts
     * // Suppose args are from '--a=1 --a=1 --b=2 --c=3'.
     * console.log(args.getOptions('a'));
     * >>> ['1', '1']
     *
     * console.log(args.getOptions('b', 'c'));
     * >>> ['2', '3']
     *
     * console.log(args.getOptions('d'));
     * >>> null
     * ```
     */
    getOptions(...keys: readonly string[]): string[] | null;
    /**
     * Saves the current state into the stack following a FILO strategy (first-in, last-out).
     * @seealso [[Args.restore]]
     */
    save(): void;
    /**
     * Restores the previously saved state from the stack.
     * @seealso [[Args.save]]
     */
    restore(): void;
    /**
     * Resolves an argument.
     * @param arg The argument name or [[IArgument]] instance.
     */
    private resolveArgument;
    /**
     * Converts a callback into an usable argument.
     * @param cb The callback to convert into an [[IArgument]].
     */
    static make<T>(cb: IArgument<T>['run'], name?: string): IArgument<T>;
    /**
     * Constructs an [[ArgumentError]] with [[ArgumentError#type]] set to the [[IArgument<T>#name]].
     * @param argument The argument that caused the rejection.
     * @param parameter The parameter that triggered the argument.
     * @param message The description message for the rejection.
     */
    static error<T>(argument: IArgument<T>, parameter: string, message: string): ArgumentError<T>;
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param argument The argument that caused the rejection.
     * @param parameter The parameter that triggered the argument.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    static error<T>(argument: IArgument<T>, parameter: string, type: string, message: string): ArgumentError<T>;
}
interface ArgType {
    boolean: boolean;
    channel: Channel;
    date: Date;
    dmChannel: DMChannel;
    float: number;
    guildChannel: GuildChannel;
    hyperlink: URL;
    integer: number;
    member: GuildMember;
    message: Message;
    newsChannel: NewsChannel;
    number: number;
    role: Role;
    string: string;
    textChannel: TextChannel;
    user: User;
    voiceChannel: VoiceChannel;
}
interface ArgOptions extends Omit<ArgumentContext, 'message' | 'command'> {
}
interface RepeatArgOptions extends ArgOptions {
    /**
     * The maximum amount of times the argument can be repeated.
     * @default Infinity
     */
    times?: number;
}

interface IPreconditionContainer {
    run(message: Message, command: Command): Awaited<Result<unknown, UserError>>;
}

declare type PreconditionErrorExtras = object | null;

declare type PreconditionResult = Awaited<Result<unknown, UserError>>;
declare type AsyncPreconditionResult = Promise<Result<unknown, UserError>>;
declare abstract class Precondition extends Piece {
    abstract run(message: Message, command: Command, context: PreconditionContext): PreconditionResult;
    ok(): PreconditionResult;
    /**
     * Constructs an [[ArgumentError]] with [[ArgumentError#type]] set to the [[IArgument<T>#name]].
     * @param message The description message for the rejection.
     */
    error(message: string, extras?: PreconditionErrorExtras): PreconditionResult;
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    error(type: string, message: string, extras?: PreconditionErrorExtras): PreconditionResult;
}
interface PreconditionContext extends Record<PropertyKey, unknown> {
}

interface PreconditionContainerSingleEntry {
    entry: string;
    context: PreconditionContext;
}
declare type PreconditionContainerSingleResolvable = string | PreconditionContainerSingleEntry;
declare class PreconditionContainerSingle implements IPreconditionContainer {
    readonly client: Client;
    readonly context: PreconditionContext;
    readonly entry: string;
    constructor(client: Client, data: PreconditionContainerSingleResolvable);
    get precondition(): Precondition;
    run(message: Message, command: Command): Awaited<Result<unknown, UserError>>;
}

declare const enum PreconditionRunMode {
    Sequential = "sequential",
    Parallel = "parallel"
}
interface PreconditionContainerAnyDetailedData {
    entries: Entries;
    mode: PreconditionRunMode;
}
declare type Entry = PreconditionContainerSingleResolvable | PreconditionContainerResolvable;
declare type Entries = readonly Entry[];
declare type PreconditionContainerResolvable = Entries | PreconditionContainerAnyDetailedData;
declare class PreconditionContainerAny implements IPreconditionContainer {
    entries: IPreconditionContainer[];
    mode: PreconditionRunMode;
    constructor(client: Client, data: PreconditionContainerResolvable);
    run(message: Message, command: Command): Awaited<Result<unknown, UserError>>;
    protected runSequential(message: Message, command: Command): Promise<Result<unknown, UserError>>;
    protected runParallel(message: Message, command: Command): Promise<Result<unknown, UserError>>;
    private static resolveData;
}

declare class PreconditionContainerAll extends PreconditionContainerAny {
    protected runSequential(message: Message, command: Command): Promise<Result<unknown, UserError>>;
    protected runParallel(message: Message, command: Command): Promise<Result<unknown, UserError>>;
}

/**
 * The strategy options used in Sapphire.
 */
interface FlagStrategyOptions {
    /**
     * The accepted flags. Flags are key-only identifiers that can be placed anywhere in the command.
     * @default []
     */
    flags?: readonly string[];
    /**
     * The accepted options. Options are key-value identifiers that can be placed anywhere in the command.
     * @default []
     */
    options?: readonly string[];
    /**
     * The prefixes for both flags and options.
     * @default ['--', '-', '—']
     */
    prefixes?: string[];
    /**
     * The flag separators.
     * @default ['=', ':']
     */
    separators?: string[];
}

declare abstract class Command<T = Args> extends AliasPiece {
    #private;
    /**
     * A basic summary about the command
     * @since 1.0.0
     */
    description: string;
    /**
     * The preconditions to be run.
     * @since 1.0.0
     */
    preconditions: PreconditionContainerAll;
    /**
     * Longer version of command's summary and how to use it
     * @since 1.0.0
     */
    detailedDescription: string;
    /**
     * The strategy to use for the lexer.
     * @since 1.0.0
     */
    strategy: UnorderedStrategy;
    /**
     * @since 1.0.0
     * @param context The context.
     * @param options Optional Command settings.
     */
    protected constructor(context: PieceContext, { name, ...options }?: CommandOptions);
    /**
     * The pre-parse method. This method can be overriden by plugins to define their own argument parser.
     * @param message The message that triggered the command.
     * @param parameters The raw parameters as a single string.
     */
    preParse(message: Message, parameters: string): Awaited<T>;
    /**
     * Executes the command's logic.
     * @param message The message that triggered the command.
     * @param args The value returned by [[Command.preParse]], by default an instance of [[Args]].
     */
    abstract run(message: Message, args: T, context: CommandContext): Awaited<unknown>;
    /**
     * Defines the JSON.stringify behavior of the command.
     */
    toJSON(): Record<string, any>;
}
/**
 * The [[Command]] options.
 * @since 1.0.0
 */
interface CommandOptions extends AliasPieceOptions {
    /**
     * The description for the command.
     * @since 1.0.0
     * @default ''
     */
    description?: string;
    /**
     * The detailed description for the command.
     * @since 1.0.0
     * @default ''
     */
    detailedDescription?: string;
    /**
     * The [[Precondition]]s to be run, accepts an array of their names.
     * @since 1.0.0
     * @default []
     */
    preconditions?: PreconditionContainerResolvable;
    /**
     * The options for the lexer strategy.
     * @since 1.0.0
     * @default {}
     */
    strategyOptions?: FlagStrategyOptions;
    /**
     * The quotes accepted by this command, pass `[]` to disable them.
     * @since 1.0.0
     * @default
     * [
     *   ['"', '"'], // Double quotes
     *   ['“', '”'], // Fancy quotes (on iOS)
     *   ['「', '」'] // Corner brackets (CJK)
     * ]
     */
    quotes?: [string, string][];
}
interface CommandContext extends Record<PropertyKey, unknown> {
    /**
     * The prefix used to run this command
     */
    prefix: string;
    /**
     * The alias used to run this command
     */
    commandName: string;
}

/**
 * Defines a synchronous result of an [[Argument]], check [[AsyncArgumentResult]] for the asynchronous version.
 */
declare type ArgumentResult<T> = Awaited<Result<T, UserError>>;
/**
 * Defines an asynchronous result of an [[Argument]], check [[ArgumentResult]] for the synchronous version.
 */
declare type AsyncArgumentResult<T> = Promise<Result<T, UserError>>;
interface IArgument<T> {
    /**
     * The name of the argument, this is used to make the identification of an argument easier.
     */
    readonly name: string;
    /**
     * The method which is called when invoking the argument.
     * @param argument The argument to parse.
     * @param context The context for the method call, contains the message, command, and other options.
     */
    run(argument: string, context: ArgumentContext): ArgumentResult<T>;
}
/**
 * The base argument class. This class is abstract and is to be extended by subclasses implementing the methods. In
 * Sapphire's workflow, arguments are called when using [[Args]]'s methods (usually used inside [[Command]]s by default).
 *
 * @example
 * ```typescript
 * // TypeScript:
 * import { Argument, ArgumentResult, PieceContext } from '(at)sapphire/framework';
 * import { URL } from 'url';
 *
 * // Define a class extending `Argument`, then export it.
 * // NOTE: You can use `export default` or `export =` too.
 * export class CoreArgument extends Argument<URL> {
 *   public constructor(context: PieceContext) {
 *     super(context, { name: 'hyperlink', aliases: ['url'] });
 *   }
 *
 *   public run(argument: string): ArgumentResult<URL> {
 *     try {
 *       return this.ok(new URL(argument));
 *     } catch {
 *       return this.error(argument, 'ArgumentHyperlinkInvalidURL', 'The argument did not resolve to a valid URL.');
 *     }
 *   }
 * }
 *
 * // Augment the ArgType structure so `args.pick('url')`, `args.repeat('url')`
 * // and others have a return type of `URL`.
 * declare module 'sapphire/framework/dist/lib/utils/Args' {
 *   export interface ArgType {
 *     url: URL;
 *   }
 * }
 * ```
 *
 * @example
 * ```javascript
 * // JavaScript:
 * const { Argument } = require('(at)sapphire/framework');
 *
 * // Define a class extending `Argument`, then export it.
 * module.exports = class CoreArgument extends Argument {
 *   constructor(context) {
 *     super(context, { name: 'hyperlink', aliases: ['url'] });
 *   }
 *
 *   run(argument) {
 *     try {
 *       return this.ok(new URL(argument));
 *     } catch {
 *       return this.error(argument, 'ArgumentHyperlinkInvalidURL', 'The argument did not resolve to a valid URL.');
 *     }
 *   }
 * }
 * ```
 */
declare abstract class Argument<T = unknown> extends AliasPiece implements IArgument<T> {
    abstract run(argument: string, context: ArgumentContext): ArgumentResult<T>;
    /**
     * Wraps a value into a successful value.
     * @param value The value to wrap.
     */
    ok(value: T): ArgumentResult<T>;
    /**
     * Constructs an [[ArgumentError]] with [[ArgumentError#type]] set to the [[IArgument<T>#name]].
     * @param parameter The parameter that triggered the argument.
     * @param message The description message for the rejection.
     */
    error(parameter: string, message: string): ArgumentResult<T>;
    /**
     * Constructs an [[ArgumentError]] with a custom type.
     * @param parameter The parameter that triggered the argument.
     * @param type The identifier for the error.
     * @param message The description message for the rejection.
     */
    error(parameter: string, type: string, message: string): ArgumentResult<T>;
}
interface ArgumentOptions extends AliasPieceOptions {
}
interface ArgumentContext extends Record<PropertyKey, unknown> {
    message: Message;
    command: Command;
    minimum?: number;
    maximum?: number;
    inclusive?: boolean;
}

/**
 * Errors thrown by the argument parser
 * @property name This will be `'ArgumentError'` and can be used to distinguish the type of error when any error gets thrown
 */
declare class ArgumentError<T> extends UserError {
    readonly argument: IArgument<T>;
    readonly parameter: string;
    constructor(argument: IArgument<T>, parameter: string, type: string, message: string);
}

declare const enum CooldownLevel {
    Author = "author",
    Channel = "channel",
    Guild = "guild"
}
declare const enum PluginHook {
    PreGenericsInitialization = "preGenericsInitialization",
    PreInitialization = "preInitialization",
    PostInitialization = "postInitialization",
    PreLogin = "preLogin",
    PostLogin = "postLogin"
}
/**
 * The level the cooldown applies to
 */
declare const enum BucketType {
    /**
     * Per channel cooldowns
     */
    Channel = 0,
    /**
     * Global cooldowns
     */
    Global = 1,
    /**
     * Per guild cooldowns
     */
    Guild = 2,
    /**
     * Per user cooldowns
     */
    User = 3
}

declare type AsyncPluginHooks = PluginHook.PreLogin | PluginHook.PostLogin;
interface SapphirePluginAsyncHook {
    (this: SapphireClient, options: ClientOptions): Awaited<unknown>;
}
declare type SyncPluginHooks = Exclude<PluginHook, AsyncPluginHooks>;
interface SapphirePluginHook {
    (this: SapphireClient, options: ClientOptions): unknown;
}
interface SapphirePluginHookEntry<T = SapphirePluginHook | SapphirePluginAsyncHook> {
    hook: T;
    type: PluginHook;
    name?: string;
}
declare class PluginManager {
    readonly registry: Set<SapphirePluginHookEntry<SapphirePluginAsyncHook | SapphirePluginHook>>;
    registerHook(hook: SapphirePluginHook, type: SyncPluginHooks, name?: string): this;
    registerHook(hook: SapphirePluginAsyncHook, type: AsyncPluginHooks, name?: string): this;
    registerPreGenericsInitializationHook(hook: SapphirePluginHook, name?: string): this;
    registerPreInitializationHook(hook: SapphirePluginHook, name?: string): this;
    registerPostInitializationHook(hook: SapphirePluginHook, name?: string): this;
    registerPreLoginHook(hook: SapphirePluginAsyncHook, name?: string): this;
    registerPostLoginHook(hook: SapphirePluginAsyncHook, name?: string): this;
    use(plugin: typeof Plugin): this;
    values(): Generator<SapphirePluginHookEntry, void, unknown>;
    values(hook: SyncPluginHooks): Generator<SapphirePluginHookEntry<SapphirePluginHook>, void, unknown>;
    values(hook: AsyncPluginHooks): Generator<SapphirePluginHookEntry<SapphirePluginAsyncHook>, void, unknown>;
}

declare class ArgumentStore extends AliasStore<Argument> {
    constructor();
}

/**
 * Stores all Command pieces
 * @since 1.0.0
 */
declare class CommandStore extends AliasStore<Command> {
    constructor();
}

/**
 * The base event class. This class is abstract and is to be extended by subclasses, which should implement the methods. In
 * Sapphire's workflow, events are called when the emitter they listen on emits a new message with the same event name.
 *
 * @example
 * ```typescript
 * // TypeScript:
 * import { Event, Events, PieceContext } from '(at)sapphire/framework';
 *
 * // Define a class extending `CoreEvent`, then export it.
 * // NOTE: You can use `export default` or `export =` too.
 * export class CoreEvent extends Event<Events.Ready> {
 *   public constructor(context: PieceContext) {
 *     super(context, { event: Events.Ready, once: true });
 *   }
 *
 *   public run() {
 *     if (!this.client.id) this.client.id = this.client.user?.id ?? null;
 *   }
 * }
 * ```
 *
 * @example
 * ```javascript
 * // JavaScript:
 * const { Event, Events } = require('(at)sapphire/framework');
 *
 * // Define a class extending `CoreEvent`, then export it.
 * module.exports = class CoreEvent extends Event {
 *   constructor(context) {
 *     super(context, { event: Events.Ready, once: true });
 *   }
 *
 *   run() {
 *     if (!this.client.id) this.client.id = this.client.user?.id ?? null;
 *   }
 * }
 * ```
 */
declare abstract class Event<E extends keyof ClientEvents | symbol = ''> extends Piece {
    #private;
    readonly emitter: EventEmitter | null;
    readonly event: string;
    readonly once: boolean;
    constructor(context: PieceContext, options?: EventOptions);
    abstract run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): unknown;
    onLoad(): void;
    onUnload(): void;
    toJSON(): Record<PropertyKey, unknown>;
    private _run;
    private _runOnce;
}
interface EventOptions extends PieceOptions {
    readonly emitter?: keyof Client | EventEmitter;
    readonly event?: string;
    readonly once?: boolean;
}

declare class EventStore extends Store<Event> {
    constructor();
}

declare class PreconditionStore extends Store<Precondition> {
    constructor();
}

/**
 * The logger levels for the [[ILogger]].
 */
declare const enum LogLevel {
    /**
     * The lowest log level, used when calling [[ILogger.trace]].
     */
    Trace = 10,
    /**
     * The debug level, used when calling [[ILogger.debug]].
     */
    Debug = 20,
    /**
     * The info level, used when calling [[ILogger.info]].
     */
    Info = 30,
    /**
     * The warning level, used when calling [[ILogger.warn]].
     */
    Warn = 40,
    /**
     * The error level, used when calling [[ILogger.error]].
     */
    Error = 50,
    /**
     * The critical level, used when calling [[ILogger.fatal]].
     */
    Fatal = 60,
    /**
     * An unknown or uncategorized level.
     */
    None = 100
}
interface ILogger {
    /**
     * Alias of [[ILogger.write]] with [[LogLevel.Trace]] as level.
     * @param values The values to log.
     */
    trace(...values: readonly unknown[]): void;
    /**
     * Alias of [[ILogger.write]] with [[LogLevel.Debug]] as level.
     * @param values The values to log.
     */
    debug(...values: readonly unknown[]): void;
    /**
     * Alias of [[ILogger.write]] with [[LogLevel.Info]] as level.
     * @param values The values to log.
     */
    info(...values: readonly unknown[]): void;
    /**
     * Alias of [[ILogger.write]] with [[LogLevel.Warn]] as level.
     * @param values The values to log.
     */
    warn(...values: readonly unknown[]): void;
    /**
     * Alias of [[ILogger.write]] with [[LogLevel.Error]] as level.
     * @param values The values to log.
     */
    error(...values: readonly unknown[]): void;
    /**
     * Alias of [[ILogger.write]] with [[LogLevel.Fatal]] as level.
     * @param values The values to log.
     */
    fatal(...values: readonly unknown[]): void;
    /**
     * Writes the log message given a level and the value(s).
     * @param level The log level.
     * @param values The values to log.
     */
    write(level: LogLevel, ...values: readonly unknown[]): void;
}

/**
 * A valid prefix in Sapphire.
 * * `string`: a single prefix, e.g. `'!'`.
 * * `string[]`: an array of prefixes, e.g. `['!', '.']`.
 * * `null`: disabled prefix, locks the bot's command usage to mentions only.
 */
declare type SapphirePrefix = string | readonly string[] | null;
interface SapphirePrefixHook {
    (message: Message): Awaited<SapphirePrefix>;
}
interface SapphireClientOptions {
    /**
     * The base user directory, if set to `null`, Sapphire will not call [[SapphireClient.registerUserDirectories]],
     * meaning that you will need to manually set each folder for each store. Please read the aforementioned method's
     * documentation for more information.
     * @since 1.0.0
     * @default undefined
     */
    baseUserDirectory?: string | null;
    /**
     * Whether commands can be case insensitive
     * @since 1.0.0
     * @default false
     */
    caseInsensitiveCommands?: boolean | null;
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
declare class SapphireClient extends Client {
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
interface ClientLoggerOptions {
    level?: LogLevel;
    instance?: ILogger;
}
declare module 'discord.js' {
    interface Client {
        id: string | null;
        logger: ILogger;
        arguments: ArgumentStore;
        commands: CommandStore;
        events: EventStore;
        preconditions: PreconditionStore;
        fetchPrefix: SapphirePrefixHook;
    }
    interface ClientOptions extends SapphireClientOptions {
    }
}
declare module '@sapphire/pieces' {
    interface PieceContextExtras {
        client: SapphireClient;
    }
}

declare const preGenericsInitialization: unique symbol;
declare const preInitialization: unique symbol;
declare const postInitialization: unique symbol;
declare const preLogin: unique symbol;
declare const postLogin: unique symbol;

declare abstract class Plugin {
    static [preGenericsInitialization]?: (this: SapphireClient, options: ClientOptions) => void;
    static [preInitialization]?: (this: SapphireClient, options: ClientOptions) => void;
    static [postInitialization]?: (this: SapphireClient, options: ClientOptions) => void;
    static [preLogin]?: (this: SapphireClient, options: ClientOptions) => Awaited<void>;
    static [postLogin]?: (this: SapphireClient, options: ClientOptions) => Awaited<void>;
}

/**
 * The extended argument class. This class is abstract and is to be extended by subclasses which
 * will implement the [[ExtendedArgument#handle]] method.
 * Much like the [[Argument]] class, this class handles parsing user-specified command arguments
 * into typed command parameters. However, this class can be used to expand upon an existing
 * argument in order to process its transformed value rather than just the argument string.
 *
 * @example
 * ```typescript
 * // TypeScript:
 * import { ApplyOptions } from '@sapphire/decorators';
 * import { ArgumentResult, ExtendedArgument, ExtendedArgumentContext, ExtendedArgumentOptions } from '(at)sapphire/framework';
 * import type { Channel, TextChannel } from 'discord.js';
 *
 * // Just like with `Argument`, you can use `export default` or `export =` too.
 * @ApplyOptions<ExtendedArgumentOptions>({
 *   name: 'textChannel',
 *   baseArgument: 'channel'
 * })
 * export class TextChannelArgument extends ExtendedArgument<'channel', TextChannel> {
 *   public handle(parsed: Channel, { argument }: ExtendedArgumentContext): ArgumentResult<TextChannel> {
 *     return parsed.type === 'text'
 *       ? this.ok(parsed as TextChannel)
 *       : this.error(argument, 'ArgumentTextChannelInvalidTextChannel', 'The argument did not resolve to a text channel.');
 *   }
 * }
 * ```
 *
 * @example
 * ```javascript
 * // JavaScript:
 * const { ExtendedArgument } = require('(at)sapphire/framework');
 *
 * module.exports = class TextChannelArgument extends ExtendedArgument {
 *   constructor(context) {
 *     super(context, { name: 'textChannel', baseArgument: 'channel' });
 *   }
 *
 *   handle(parsed, { argument }) {
 *     return parsed.type === 'text'
 *       ? this.ok(parsed)
 *       : this.error(argument, 'ArgumentTextChannelInvalidTextChannel', 'The argument did not resolve to a text channel/');
 *   }
 * }
 * ```
 */
declare abstract class ExtendedArgument<K extends keyof ArgType, T> extends Argument<T> {
    baseArgument: K;
    constructor(context: PieceContext, options: ExtendedArgumentOptions<K>);
    /**
     * Represents the underlying argument that transforms the raw argument
     * into the value used to compute the extended argument's value.
     */
    get base(): IArgument<ArgType[K]>;
    run(argument: string, context: ArgumentContext): AsyncArgumentResult<T>;
    abstract handle(parsed: ArgType[K], context: ExtendedArgumentContext): ArgumentResult<T>;
}
interface ExtendedArgumentOptions<K extends keyof ArgType> extends ArgumentOptions {
    /**
     * The name of the underlying argument whose value is used to compute
     * the extended argument value; see [[ArgType]] for valid keys.
     */
    baseArgument: K;
}
interface ExtendedArgumentContext extends ArgumentContext {
    /**
     * The canonical argument specified by the user in the command, as
     * a string, equivalent to the first parameter of [[Argument#run]].
     * This allows [[ExtendedArgument#handle]] to access the original
     * argument, which is useful for returning [[Argument#error]] so
     * that you don't have to convert the parsed argument back into a
     * string.
     */
    argument: string;
}

declare enum Events {
    ChannelCreate = "channelCreate",
    ChannelDelete = "channelDelete",
    ChannelPinsUpdate = "channelPinsUpdate",
    ChannelUpdate = "channelUpdate",
    Debug = "debug",
    Warn = "warn",
    Disconnect = "disconnect",
    EmojiCreate = "emojiCreate",
    EmojiDelete = "emojiDelete",
    EmojiUpdate = "emojiUpdate",
    Error = "error",
    GuildBanAdd = "guildBanAdd",
    GuildBanRemove = "guildBanRemove",
    GuildCreate = "guildCreate",
    GuildDelete = "guildDelete",
    GuildUnavailable = "guildUnavailable",
    GuildIntegrationsUpdate = "guildIntegrationsUpdate",
    GuildMemberAdd = "guildMemberAdd",
    GuildMemberAvailable = "guildMemberAvailable",
    GuildMemberRemove = "guildMemberRemove",
    GuildMembersChunk = "guildMembersChunk",
    GuildMemberSpeaking = "guildMemberSpeaking",
    GuildMemberUpdate = "guildMemberUpdate",
    GuildUpdate = "guildUpdate",
    InviteCreate = "inviteCreate",
    InviteDelete = "inviteDelete",
    Message = "message",
    MessageDelete = "messageDelete",
    MessageReactionRemoveAll = "messageReactionRemoveAll",
    MessageReactionRemoveEmoji = "messageReactionRemoveEmoji",
    MessageDeleteBulk = "messageDeleteBulk",
    MessageReactionAdd = "messageReactionAdd",
    MessageReactionRemove = "messageReactionRemove",
    MessageUpdate = "messageUpdate",
    PresenceUpdate = "presenceUpdate",
    RateLimit = "rateLimit",
    Ready = "ready",
    Invalidated = "invalidated",
    RoleCreate = "roleCreate",
    RoleDelete = "roleDelete",
    RoleUpdate = "roleUpdate",
    TypingsStart = "typingStart",
    UserUpdate = "userUpdate",
    VoiceStateUpdate = "voiceStateUpdate",
    WebhookUpdate = "webhookUpdate",
    ShardDisconnect = "shardDisconnect",
    ShardError = "shardError",
    ShardReady = "shardReady",
    ShardReconnecting = "shardReconnecting",
    ShardResume = "shardResume",
    PieceUnload = "pieceUnload",
    PiecePostLoad = "piecePostLoad",
    MentionPrefixOnly = "mentionPrefixOnly",
    EventError = "eventError",
    PrefixedMessage = "prefixedMessage",
    UnknownCommandName = "unknownCommandName",
    UnknownCommand = "unknownCommand",
    PreCommandRun = "preCommandRun",
    CommandDenied = "commandDenied",
    CommandAccepted = "commandAccepted",
    CommandRun = "commandRun",
    CommandSuccess = "commandSuccess",
    CommandFinish = "commandFinish",
    CommandError = "commandError",
    PluginLoaded = "pluginLoaded"
}
interface IPieceError {
    piece: Piece;
}
interface EventErrorPayload extends IPieceError {
    piece: Event;
}
interface CommandErrorPayload extends IPieceError {
    piece: Command;
    message: Message;
}
interface ICommandPayload {
    message: Message;
    command: Command;
}
interface CommandDeniedPayload extends ICommandPayload {
    parameters: string;
    context: CommandContext;
}
interface CommandAcceptedPayload extends ICommandPayload {
    parameters: string;
    context: CommandContext;
}
interface CommandSuccessPayload extends ICommandPayload {
    result: unknown;
    parameters: string;
}
interface PreCommandRunPayload extends CommandDeniedPayload {
}
declare module 'discord.js' {
    interface ClientEvents {
        [Events.PieceUnload]: [Store<Piece>, Piece];
        [Events.PiecePostLoad]: [Store<Piece>, Piece];
        [Events.MentionPrefixOnly]: [Message];
        [Events.EventError]: [Error, EventErrorPayload];
        [Events.PrefixedMessage]: [Message, string];
        [Events.UnknownCommandName]: [Message, string];
        [Events.UnknownCommand]: [Message, string, string];
        [Events.PreCommandRun]: [PreCommandRunPayload];
        [Events.CommandDenied]: [UserError, CommandDeniedPayload];
        [Events.CommandAccepted]: [CommandAcceptedPayload];
        [Events.CommandRun]: [Message, Command];
        [Events.CommandSuccess]: [CommandSuccessPayload];
        [Events.CommandError]: [Error, CommandErrorPayload];
        [Events.CommandFinish]: [Message, Command];
        [Events.PluginLoaded]: [PluginHook, string | undefined];
        [K: string]: unknown[];
    }
}

declare class Logger implements ILogger {
    level: LogLevel;
    constructor(level: LogLevel);
    trace(...values: readonly unknown[]): void;
    debug(...values: readonly unknown[]): void;
    info(...values: readonly unknown[]): void;
    warn(...values: readonly unknown[]): void;
    error(...values: readonly unknown[]): void;
    fatal(...values: readonly unknown[]): void;
    write(level: LogLevel, ...values: readonly unknown[]): void;
    private static readonly levels;
}
declare type LogMethods = 'trace' | 'debug' | 'info' | 'warn' | 'error';

/**
 * Constructs a contextful permissions precondition requirement.
 * @example
 * ```typescript
 * export class CoreCommand extends Command {
 *   public constructor(context: PieceContext) {
 *     super(context, {
 *       preconditions: [
 *         'GuildOnly',
 *         new PermissionsPrecondition('ADD_REACTIONS')
 *       ]
 *     });
 *   }
 *
 *   public run(message: Message, args: Args) {
 *     // ...
 *   }
 * }
 * ```
 */
declare class PermissionsPrecondition implements PreconditionContainerSingleEntry {
    entry: string;
    context: PreconditionContext;
    /**
     * Constructs a precondition container entry.
     * @param permissions The permissions that will be required by this command.
     */
    constructor(permissions: PermissionResolvable);
}

export { ArgOptions, ArgType, Args, Argument, ArgumentContext, ArgumentError, ArgumentOptions, ArgumentResult, ArgumentStore, AsyncArgumentResult, AsyncPluginHooks, AsyncPreconditionResult, BucketType, ClientLoggerOptions, Command, CommandAcceptedPayload, CommandContext, CommandDeniedPayload, CommandErrorPayload, CommandOptions, CommandStore, CommandSuccessPayload, CooldownLevel, Err, Event, EventErrorPayload, EventOptions, EventStore, Events, ExtendedArgument, ExtendedArgumentContext, ExtendedArgumentOptions, IArgument, ICommandPayload, ILogger, IPieceError, IPreconditionContainer, LogLevel, LogMethods, Logger, Ok, PermissionsPrecondition, Plugin, PluginHook, PluginManager, PreCommandRunPayload, Precondition, PreconditionContainerAll, PreconditionContainerAny, PreconditionContainerResolvable, PreconditionContainerSingle, PreconditionContainerSingleEntry, PreconditionContainerSingleResolvable, PreconditionContext, PreconditionResult, PreconditionStore, RepeatArgOptions, Result, SapphireClient, SapphireClientOptions, SapphirePluginAsyncHook, SapphirePluginHook, SapphirePluginHookEntry, SapphirePrefix, SapphirePrefixHook, SyncPluginHooks, UserError, err, isErr, isOk, ok, postInitialization, postLogin, preGenericsInitialization, preInitialization, preLogin };
