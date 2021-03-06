import type { PieceContext } from '@sapphire/pieces';
import type { Channel } from 'discord.js';
import { Argument, ArgumentContext, ArgumentResult } from '../lib/structures/Argument';

export class CoreArgument extends Argument<Channel> {
	public constructor(context: PieceContext) {
		super(context, { name: 'channel' });
	}

	public run(parameter: string, context: ArgumentContext): ArgumentResult<Channel> {
		const channel = (context.message.guild ? context.message.guild.channels : this.context.client.channels).cache.get(parameter);

		if (!channel) {
			return this.error({
				parameter,
				identifier: 'ArgumentChannelMissingChannel',
				message: 'The argument did not resolve to a channel.',
				context
			});
		}

		return this.ok(channel);
	}
}
