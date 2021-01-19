"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
const ExtendedArgument_1 = require("../lib/structures/ExtendedArgument");
class CoreArgument extends ExtendedArgument_1.ExtendedArgument {
    constructor(context) {
        super(context, {
            name: 'newsChannel',
            baseArgument: 'guildChannel'
        });
    }
    handle(channel, { argument }) {
        return discord_js_utilities_1.isNewsChannel(channel)
            ? this.ok(channel)
            : this.error(argument, 'ArgumentNewsChannelInvalidChannel', 'The argument did not resolve to a news channel.');
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreNewsChannel.js.map