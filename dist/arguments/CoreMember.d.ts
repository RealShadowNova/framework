import type { PieceContext } from '@sapphire/pieces';
import type { GuildMember } from 'discord.js';
import { Argument, ArgumentContext, AsyncArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<GuildMember> {
    private readonly userOrMemberRegex;
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): AsyncArgumentResult<GuildMember>;
    private resolveByID;
    private resolveByQuery;
}
//# sourceMappingURL=CoreMember.d.ts.map