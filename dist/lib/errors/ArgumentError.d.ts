import type { IArgument } from '../structures/Argument';
import { UserError } from './UserError';
/**
 * Errors thrown by the argument parser
 * @property name This will be `'ArgumentError'` and can be used to distinguish the type of error when any error gets thrown
 */
export declare class ArgumentError<T> extends UserError {
    readonly argument: IArgument<T>;
    readonly parameter: string;
    constructor(argument: IArgument<T>, parameter: string, type: string, message: string);
}
//# sourceMappingURL=ArgumentError.d.ts.map