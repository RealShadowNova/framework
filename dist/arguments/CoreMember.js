"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'member' });
    }
    async run(argument, context) {
        var _a, _b;
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentMemberMissingGuild', 'The argument must be run on a guild.');
        }
        const member = (_b = (_a = (await this.parseID(argument, guild))) !== null && _a !== void 0 ? _a : (await this.parseMention(argument, guild))) !== null && _b !== void 0 ? _b : (await this.parseQuery(argument, guild));
        return member ? this.ok(member) : this.error(argument, 'ArgumentMemberUnknownMember', 'The argument did not resolve to a member.');
    }
    async parseID(argument, guild) {
        if (/^\d{17,19}$/.test(argument)) {
            try {
                return await guild.members.fetch(argument);
            }
            catch {
                // noop
            }
        }
        return null;
    }
    async parseMention(argument, guild) {
        const mention = /^<@!?(\d{17,19})>$/.exec(argument);
        return mention ? this.parseID(mention[1], guild) : null;
    }
    async parseQuery(argument, guild) {
        var _a;
        const member = await guild.members.fetch({
            query: argument,
            limit: 1
        });
        return (_a = member.first()) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreMember.js.map