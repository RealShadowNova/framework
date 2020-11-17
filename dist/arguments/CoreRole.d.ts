import type { PieceContext } from '@sapphire/pieces';
import type { Role } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<Role> {
    private readonly roleRegex;
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): AsyncArgumentResult<Role>;
    private resolveByID;
    private resolveByQuery;
}
//# sourceMappingURL=CoreRole.d.ts.map