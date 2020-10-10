import type { PieceContext } from '@sapphire/pieces';
import { Event } from '../../lib/structures/Event';
import { Events, PreCommandRunPayload } from '../../lib/types/Events';
export declare class CoreEvent extends Event<Events.PreCommandRun> {
    constructor(context: PieceContext);
    run({ message, command, parameters, commandName, prefix }: PreCommandRunPayload): Promise<void>;
}
//# sourceMappingURL=CorePreCommandRun.d.ts.map