/**
 * EventBus.js
 * A Pub/Sub pattern to decouple our modules.
 * Allows components to talk without importing each other directly.
 */
class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param {string} event - The name of the event
     * @param {function} callback - Function to run when event is emitted
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    /**
     * Emit an event
     * @param {string} event - The name of the event
     * @param {object} data - Data to pass to subscribers
     */
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in EventBus for event '${event}':`, error);
                }
            });
        }
    }
}

export const bus = new EventBus();