/// <reference types="node" />
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
import type { Client, ClientEvents } from 'discord.js';
import type { EventEmitter } from 'events';
import { BasePiece } from './base/BasePiece';
/**
 * The base event class. This class is abstract and is to be extended by subclasses, which should implement the methods. In
 * Sapphire's workflow, events are called when the emitter they listen on emits a new message with the same event name.
 *
 * @example
 * ```typescript
 * // TypeScript:
 * import { Event, Events, PieceContext } from 'sapphire/framework';
 *
 * // Define a class extending `CoreEvent`, then export it.
 * // NOTE: You can use `export default` or `export =` too.
 * export class CoreEvent extends Event<Events.Ready> {
 *   public constructor(context: PieceContext) {
 *     super(context, { event: Events.Ready, once: true });
 *   }
 *
 *   public run() {
 *     if (!this.client.id) this.client.id = this.client.user?.id ?? null;
 *   }
 * }
 * ```
 *
 * @example
 * ```javascript
 * // JavaScript:
 * const { Event, Events } = require('sapphire/framework');
 *
 * // Define a class extending `CoreEvent`, then export it.
 * module.exports = class CoreEvent extends Event {
 *   constructor(context) {
 *     super(context, { event: Events.Ready, once: true });
 *   }
 *
 *   run() {
 *     if (!this.client.id) this.client.id = this.client.user?.id ?? null;
 *   }
 * }
 * ```
 */
export declare abstract class Event<E extends keyof ClientEvents | symbol = ''> extends BasePiece {
    #private;
    readonly emitter: EventEmitter | null;
    readonly event: string;
    readonly once: boolean;
    constructor(context: PieceContext, options?: EventOptions);
    abstract run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): unknown;
    onLoad(): void;
    onUnload(): void;
    toJSON(): Record<PropertyKey, unknown>;
    private _run;
    private _runOnce;
}
export interface EventOptions extends PieceOptions {
    readonly emitter?: keyof Client | EventEmitter;
    readonly event?: string;
    readonly once?: boolean;
}
//# sourceMappingURL=Event.d.ts.map