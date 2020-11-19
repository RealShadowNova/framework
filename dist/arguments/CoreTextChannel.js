"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const ExtendedArgument_1 = require("../lib/structures/ExtendedArgument");
class CoreArgument extends ExtendedArgument_1.ExtendedArgument {
    constructor(context) {
        super(context, {
            name: 'textChannel',
            baseArgument: 'guildChannel'
        });
    }
    handle(channel, { argument }) {
        return channel.type === 'text'
            ? this.ok(channel)
            : this.error(argument, 'ArgumentTextChannelInvalidChannel', 'The argument did not resolve to a text channel.');
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreTextChannel.js.map