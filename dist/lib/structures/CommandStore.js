"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const Command_1 = require("./Command");
/**
 * Stores all Command pieces
 * @since 1.0.0
 */
class CommandStore extends pieces_1.AliasStore {
    constructor() {
        super(Command_1.Command, { name: 'commands' });
    }
}
exports.CommandStore = CommandStore;
//# sourceMappingURL=CommandStore.js.map