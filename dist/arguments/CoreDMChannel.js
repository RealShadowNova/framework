"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'dmChannel' });
    }
    run(argument) {
        const channel = this.context.client.channels.cache.get(argument);
        if (!channel) {
            return this.error(argument, 'ArgumentChannelMissingChannel', 'The argument did not resolve to a channel.');
        }
        return discord_js_utilities_1.isDMChannel(channel)
            ? this.ok(channel)
            : this.error(argument, 'ArgumentDMChannelInvalidChannel', 'The argument did not resolve to a DM channel.');
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreDMChannel.js.map