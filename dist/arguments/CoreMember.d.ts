import type { PieceContext } from '@sapphire/pieces';
import type { GuildMember } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<GuildMember> {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): AsyncArgumentResult<GuildMember>;
    private parseID;
    private parseMention;
    private parseQuery;
}
//# sourceMappingURL=CoreMember.d.ts.map