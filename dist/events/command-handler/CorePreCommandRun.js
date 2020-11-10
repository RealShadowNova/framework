"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const UserError_1 = require("../../lib/errors/UserError");
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
const Result_1 = require("../../lib/utils/Result");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.PreCommandRun });
    }
    async run({ message, command, parameters, context }) {
        if (!command.enabled) {
            this.client.emit(Events_1.Events.CommandDenied, new UserError_1.UserError('CommandDisabled', 'This command is disabled.'), {
                message,
                command,
                parameters,
                context
            });
        }
        const result = await command.preconditions.run(message, command);
        if (Result_1.isErr(result)) {
            this.client.emit(Events_1.Events.CommandDenied, result.error, { message, command, parameters, context });
        }
        else {
            this.client.emit(Events_1.Events.CommandAccepted, { message, command, parameters, context });
        }
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CorePreCommandRun.js.map