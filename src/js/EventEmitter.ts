export class EventEmitter {
    events: { [key: string]: Function[] };

    constructor() {
        this.events = {};
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     */
    subscribe(eventName: string, callback: Function): void {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     */
    unsubscribe(eventName: string, callback: Function): void {
        this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);
    }

    /**
     * @param {string} eventName
     * @param {any} args
     */
    emit(eventName: string, args: any): void {
        const event = this.events[eventName];
        event && event.forEach(callback => callback.call(null, args));
    }
}
