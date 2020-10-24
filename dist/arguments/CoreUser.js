"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'user' });
    }
    async run(argument) {
        var _a;
        const user = (_a = (await this.parseID(argument))) !== null && _a !== void 0 ? _a : (await this.parseMention(argument));
        return user ? this.ok(user) : this.error(argument, 'ArgumentUserUnknownUser', 'The argument did not resolve to a user.');
    }
    async parseID(argument) {
        if (/^\d{17,19}$/.test(argument)) {
            try {
                return await this.client.users.fetch(argument);
            }
            catch {
                // noop
            }
        }
        return null;
    }
    async parseMention(argument) {
        const mention = /^<@!?(\d{17,19})>$/.exec(argument);
        return mention ? this.parseID(mention[1]) : null;
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreUser.js.map