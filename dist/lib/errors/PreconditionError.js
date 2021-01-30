"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionError = void 0;
const UserError_1 = require("./UserError");
/**
 * Errors thrown by preconditions
 * @property name This will be `'PreconditionError'` and can be used to distinguish the type of error when any error gets thrown
 */
class PreconditionError extends UserError_1.UserError {
    constructor(options) {
        var _a;
        super({ ...options, identifier: (_a = options.identifier) !== null && _a !== void 0 ? _a : options.precondition.name });
        this.precondition = options.precondition;
    }
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get name() {
        return 'PreconditionError';
    }
}
exports.PreconditionError = PreconditionError;
//# sourceMappingURL=PreconditionError.js.map