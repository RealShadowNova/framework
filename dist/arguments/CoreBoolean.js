"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
const truths = ['1', 'true', '+', 't', 'yes', 'y'];
const falses = ['0', 'false', '-', 'f', 'no', 'n'];
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'boolean' });
    }
    run(argument) {
        const boolean = argument.toLowerCase();
        if (truths.includes(boolean))
            return this.ok(true);
        if (falses.includes(boolean))
            return this.ok(false);
        return this.error('ArgumentBooleanInvalidBoolean', 'The argument did not resolve to a boolean.');
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreBoolean.js.map