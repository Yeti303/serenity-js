import { DomainEvent } from '@serenity-js/core/lib/events';

export class Pick {
    static from = (events: DomainEvent[]) => new Pick(events);

    constructor(private events: DomainEvent[]) {
    }

    next<T extends DomainEvent>(type: { new(...args: any[]): T }, assertion: (event: T) => void) {

        const foundIndex = this.events.findIndex(event => event.constructor === type);

        if (foundIndex < 0) {
            throw new Error(`${ type.name } event not found within ${ this.events.map(e => e.constructor.name).join(', ') }`);
        }

        assertion(this.events[ foundIndex ] as T);

        this.events = this.events.slice(foundIndex + 1);

        return this;
    }
}
