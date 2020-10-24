"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'role' });
    }
    async run(argument, context) {
        var _a, _b;
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentRoleMissingGuild', 'The argument must be run on a guild.');
        }
        const role = (_b = (_a = (await this.parseID(argument, guild))) !== null && _a !== void 0 ? _a : (await this.parseMention(argument, guild))) !== null && _b !== void 0 ? _b : (await this.parseQuery(argument, guild));
        return role ? this.ok(role) : this.error(argument, 'ArgumentRoleUnknownRole', 'The argument did not resolve to a role.');
    }
    async parseID(argument, guild) {
        if (/^\d{17,19}$/.test(argument)) {
            try {
                return await guild.roles.fetch(argument);
            }
            catch {
                // noop
            }
        }
        return null;
    }
    async parseMention(argument, guild) {
        const mention = /^<@&(\d{17,19})>$/.exec(argument);
        return mention ? this.parseID(mention[1], guild) : null;
    }
    async parseQuery(argument, guild) {
        const lowerCaseArgument = argument.toLowerCase();
        const role = await guild.roles.cache.find((role) => role.name.toLowerCase() === lowerCaseArgument);
        return role !== null && role !== void 0 ? role : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreRole.js.map