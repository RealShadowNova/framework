"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreEvent = void 0;
const Event_1 = require("../../lib/structures/Event");
const Events_1 = require("../../lib/types/Events");
class CoreEvent extends Event_1.Event {
    constructor(context) {
        super(context, { event: Events_1.Events.PrefixedMessage });
    }
    run(message, prefix) {
        // Retrieve the command name and validate:
        const prefixLess = message.content.slice(prefix.length).trim();
        const spaceIndex = prefixLess.indexOf(' ');
        const name = spaceIndex === -1 ? prefixLess : prefixLess.slice(0, spaceIndex);
        if (!name) {
            message.client.emit(Events_1.Events.UnknownCommandName, message, prefix);
            return;
        }
        // Retrieve the command and validate:
        const command = message.client.commands.get(message.client.options.caseInsensitiveCommands ? name.toLowerCase() : name);
        if (!command) {
            message.client.emit(Events_1.Events.UnknownCommand, message, name, prefix);
            return;
        }
        // Run the last stage before running the command:
        const parameters = spaceIndex === -1 ? '' : prefixLess.substr(spaceIndex + 1).trim();
        message.client.emit(Events_1.Events.PreCommandRun, { message, command, parameters, context: { commandName: name, prefix } });
    }
}
exports.CoreEvent = CoreEvent;
//# sourceMappingURL=CorePrefixedMessage.js.map