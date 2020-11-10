import type { PieceContext } from '@sapphire/pieces';
import { Event } from '../../lib/structures/Event';
import { CommandAcceptedPayload, Events } from '../../lib/types/Events';
export declare class CoreEvent extends Event<Events.CommandAccepted> {
    constructor(context: PieceContext);
    run({ message, command, parameters, context }: CommandAcceptedPayload): Promise<void>;
}
//# sourceMappingURL=CoreCommandAccepted.d.ts.map