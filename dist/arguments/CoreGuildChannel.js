"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'guildChannel' });
        this.channelRegex = /^(?:<#)?(\d{17,19})>?$/;
    }
    run(argument, context) {
        var _a;
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentGuildChannelMissingGuild', 'The argument must be run in a guild.');
        }
        const channel = (_a = this.resolveByID(argument, guild)) !== null && _a !== void 0 ? _a : this.resolveByQuery(argument, guild);
        return channel
            ? this.ok(channel)
            : this.error(argument, 'ArgumentGuildChannelUnknownChannel', 'The argument did not resolve to a guild channel.');
    }
    resolveByID(argument, guild) {
        var _a;
        const channelID = this.channelRegex.exec(argument);
        return channelID ? (_a = guild.channels.cache.get(channelID[1])) !== null && _a !== void 0 ? _a : null : null;
    }
    resolveByQuery(argument, guild) {
        var _a;
        const lowerCaseArgument = argument.toLowerCase();
        return (_a = guild.channels.cache.find((channel) => channel.name.toLowerCase() === lowerCaseArgument)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreGuildChannel.js.map