"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'member' });
        this.userOrMemberRegex = /^(?:<@!?)?(\d{17,19})>?$/;
    }
    async run(argument, context) {
        var _a;
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentMemberMissingGuild', 'The argument must be run on a guild.');
        }
        const member = (_a = (await this.resolveByID(argument, guild))) !== null && _a !== void 0 ? _a : (await this.resolveByQuery(argument, guild));
        return member ? this.ok(member) : this.error(argument, 'ArgumentMemberUnknownMember', 'The argument did not resolve to a member.');
    }
    async resolveByID(argument, guild) {
        const memberID = this.userOrMemberRegex.exec(argument);
        return memberID ? guild.members.fetch(memberID[1]).catch(() => null) : null;
    }
    async resolveByQuery(argument, guild) {
        var _a;
        const members = await guild.members
            .fetch({
            query: argument,
            limit: 1
        })
            .catch(() => null);
        return (_a = members === null || members === void 0 ? void 0 : members.first()) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreMember.js.map