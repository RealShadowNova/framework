"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreArgument = void 0;
const Argument_1 = require("../lib/structures/Argument");
class CoreArgument extends Argument_1.Argument {
    constructor(context) {
        super(context, { name: 'number' });
    }
    run(parameter, context) {
        const parsed = Number(parameter);
        if (Number.isNaN(parsed)) {
            return this.error({
                parameter,
                identifier: 'ArgumentNumberInvalidNumber',
                message: 'The argument did not resolve to a valid number.',
                context
            });
        }
        if (typeof context.minimum === 'number' && parsed < context.minimum) {
            return this.error({
                parameter,
                identifier: 'ArgumentNumberTooSmall',
                message: `The argument must be greater than ${context.minimum}.`,
                context
            });
        }
        if (typeof context.maximum === 'number' && parsed > context.maximum) {
            return this.error({
                parameter,
                identifier: 'ArgumentNumberTooBig',
                message: `The argument must be smaller than ${context.maximum}.`,
                context
            });
        }
        return this.ok(parsed);
    }
}
exports.CoreArgument = CoreArgument;
//# sourceMappingURL=CoreNumber.js.map