"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedArgument = void 0;
const Result_1 = require("../parsers/Result");
const Argument_1 = require("./Argument");
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
class ExtendedArgument extends Argument_1.Argument {
    constructor(context, options) {
        super(context, options);
        this.baseArgument = options.baseArgument;
    }
    /**
     * Represents the underlying argument that transforms the raw argument
     * into the value used to compute the extended argument's value.
     */
    get base() {
        return this.context.client.arguments.get(this.baseArgument);
    }
    async run(parameter, context) {
        const result = await this.base.run(parameter, context);
        // If the result was successful (i.e. is of type `Ok<ArgType[K]>`), pass its
        // value to [[ExtendedArgument#handle]] for further parsing. Otherwise, return
        // the error as is; it'll provide contextual information from the base argument.
        return Result_1.isOk(result) ? this.handle(result.value, { ...context, parameter }) : result;
    }
}
exports.ExtendedArgument = ExtendedArgument;
//# sourceMappingURL=ExtendedArgument.js.map