import type { PieceContext } from '@sapphire/pieces';
import type { GuildChannel, NewsChannel } from 'discord.js';
import type { ArgumentResult } from '../lib/structures/Argument';
import { ExtendedArgument, ExtendedArgumentContext } from '../lib/structures/ExtendedArgument';
export declare class CoreArgument extends ExtendedArgument<'guildChannel', NewsChannel> {
    constructor(context: PieceContext);
    handle(channel: GuildChannel, { argument }: ExtendedArgumentContext): ArgumentResult<NewsChannel>;
}
//# sourceMappingURL=CoreNewsChannel.d.ts.map