import type { PieceContext } from '@sapphire/pieces';
import type { GuildChannel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<GuildChannel> {
    private readonly channelRegex;
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): ArgumentResult<GuildChannel>;
    private resolveByID;
    private resolveByQuery;
}
//# sourceMappingURL=CoreGuildChannel.d.ts.map