"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreconditionError = void 0;
const UserError_1 = require("./UserError");
/**
 * Errors thrown by preconditions
 * @property name This will be `'PreconditionError'` and can be used to distinguish the type of error when any error gets thrown
 */
class PreconditionError extends UserError_1.UserError {
    constructor(argument, type, message, extras = null) {
        super(type, message);
        this.name = 'PreconditionError';
        this.precondition = argument;
        this.extras = extras;
    }
}
exports.PreconditionError = PreconditionError;
//# sourceMappingURL=PreconditionError.js.map