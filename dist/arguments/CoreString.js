"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'string' });
    }
    run(parameter, context) {
        if (typeof context.minimum === 'number' && parameter.length < context.minimum) {
            return this.error({
                parameter,
                identifier: 'ArgumentStringTooShort',
                message: `The argument must be greater than ${context.minimum} characters.`,
                context
            });
        }
        if (typeof context.maximum === 'number' && parameter.length > context.maximum) {
            return this.error({
                parameter,
                identifier: 'ArgumentStringTooLong',
                message: `The argument must be less than ${context.maximum} characters.`,
                context
            });
        }
        return this.ok(parameter);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreString.js.map