"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const pieces_1 = require("@sapphire/pieces");
const Event_1 = require("./Event");
class EventStore extends pieces_1.Store {
    constructor() {
        super(Event_1.Event, { name: 'events' });
    }
}
exports.EventStore = EventStore;
//# sourceMappingURL=EventStore.js.map