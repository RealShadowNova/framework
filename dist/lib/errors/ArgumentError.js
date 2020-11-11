"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentError = void 0;
const UserError_1 = require("./UserError");
/**
 * Errors thrown by the argument parser
 * @property name This will be `'ArgumentError'` and can be used to distinguish the type of error when any error gets thrown
 */
class ArgumentError extends UserError_1.UserError {
    constructor(argument, parameter, type, message) {
        super(type, message);
        this.name = 'ArgumentError';
        this.argument = argument;
        this.parameter = parameter;
    }
}
exports.ArgumentError = ArgumentError;
//# sourceMappingURL=ArgumentError.js.map