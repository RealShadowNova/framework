import type { PieceContext } from '@sapphire/pieces';
import { Argument, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<boolean> {
    constructor(context: PieceContext);
    run(argument: string): ArgumentResult<boolean>;
}
//# sourceMappingURL=CoreBoolean.d.ts.map