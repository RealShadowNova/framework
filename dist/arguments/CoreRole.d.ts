import type { PieceContext } from '@sapphire/pieces';
import type { Role } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<Role> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): AsyncArgumentResult<Role>;
    private parseID;
    private parseMention;
    private parseQuery;
}
//# sourceMappingURL=CoreRole.d.ts.map