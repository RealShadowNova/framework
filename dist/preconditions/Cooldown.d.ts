import { Precondition, PreconditionContext } from '../lib/structures/Precondition';
import { BucketType } from '../lib/types/Enums';
import type { Message } from 'discord.js';
import type { Command } from '../lib/structures/Command';
import { Bucket } from '@sapphire/ratelimits';
export interface CooldownContext extends PreconditionContext {
    bucketType?: BucketType;
    delay?: number;
    limit?: number;
}
export declare class CorePrecondition extends Precondition {
    buckets: WeakMap<Command<import("..").Args>, Bucket<string>>;
    run(message: Message, command: Command, context: CooldownContext): import("..").Awaited<import("..").Result<unknown, import("..").UserError>>;
    private getID;
    private getBucket;
}
//# sourceMappingURL=Cooldown.d.ts.map