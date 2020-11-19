import type { PieceContext } from '@sapphire/pieces';
import type { GuildChannel, TextChannel } from 'discord.js';
import type { ArgumentResult } from '../lib/structures/Argument';
import { ExtendedArgument, ExtendedArgumentContext } from '../lib/structures/ExtendedArgument';
export declare class CoreArgument extends ExtendedArgument<'guildChannel', TextChannel> {
    constructor(context: PieceContext);
    handle(channel: GuildChannel, { argument }: ExtendedArgumentContext): ArgumentResult<TextChannel>;
}
//# sourceMappingURL=CoreTextChannel.d.ts.map