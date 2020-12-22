"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'user' });
        this.userOrMemberRegex = /^(?:<@!?)?(\d{17,19})>?$/;
    }
    async run(argument) {
        const userID = this.userOrMemberRegex.exec(argument);
        const user = userID ? await this.context.client.users.fetch(userID[1]).catch(() => null) : null;
        return user ? this.ok(user) : this.error(argument, 'ArgumentUserUnknownUser', 'The argument did not resolve to a user.');
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreUser.js.map