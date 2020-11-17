import type { PieceContext } from '@sapphire/pieces';
import type { User } from 'discord.js';
import { Argument, AsyncArgumentResult } from '../lib/structures/Argument';
export declare class CoreArgument extends Argument<User> {
    private readonly userOrMemberRegex;
    constructor(context: PieceContext);
    run(argument: string): AsyncArgumentResult<User>;
}
//# sourceMappingURL=CoreUser.d.ts.map