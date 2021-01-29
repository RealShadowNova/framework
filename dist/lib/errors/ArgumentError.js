"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = void 0;
const UserError_1 = require("./UserError");
/**
 * Errors thrown by the argument parser
 * @since 1.0.0
 * @property name This will be `'ArgumentError'` and can be used to distinguish the type of error when any error gets thrown
 */
class ArgumentError extends UserError_1.UserError {
    constructor(options) {
        var _a;
        super({ ...options, identifier: (_a = options.identifier) !== null && _a !== void 0 ? _a : options.argument.name });
        this.argument = options.argument;
        this.parameter = options.parameter;
    }
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get name() {
        return 'ArgumentError';
    }
}
exports.ArgumentError = ArgumentError;
//# sourceMappingURL=ArgumentError.js.map