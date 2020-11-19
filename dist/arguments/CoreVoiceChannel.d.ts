import type { PieceContext } from '@sapphire/pieces';
import type { GuildChannel, VoiceChannel } from 'discord.js';
import type { ArgumentResult } from '../lib/structures/Argument';
import { ExtendedArgument, ExtendedArgumentContext } from '../lib/structures/ExtendedArgument';
export declare class CoreArgument extends ExtendedArgument<'guildChannel', VoiceChannel> {
    constructor(context: PieceContext);
    handle(channel: GuildChannel, { argument }: ExtendedArgumentContext): ArgumentResult<VoiceChannel>;
}
//# sourceMappingURL=CoreVoiceChannel.d.ts.map