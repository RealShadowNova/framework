"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'role' });
        this.roleRegex = /^(?:<@&)?(\d{17,19})>?$/;
    }
    async run(argument, context) {
        var _a;
        const { guild } = context.message;
        if (!guild) {
            return this.error(argument, 'ArgumentRoleMissingGuild', 'The argument must be run on a guild.');
        }
        const role = (_a = (await this.resolveByID(argument, guild))) !== null && _a !== void 0 ? _a : this.resolveByQuery(argument, guild);
        return role ? this.ok(role) : this.error(argument, 'ArgumentRoleUnknownRole', 'The argument did not resolve to a role.');
    }
    async resolveByID(argument, guild) {
        const roleID = this.roleRegex.exec(argument);
        return roleID ? guild.roles.fetch(roleID[1]).catch(() => null) : null;
    }
    resolveByQuery(argument, guild) {
        var _a;
        const lowerCaseArgument = argument.toLowerCase();
        return (_a = guild.roles.cache.find((role) => role.name.toLowerCase() === lowerCaseArgument)) !== null && _a !== void 0 ? _a : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreRole.js.map