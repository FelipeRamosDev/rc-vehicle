export default class SocketConnection {
    constructor (connection) {
        this.connection = connection;
        this.listeners = [];
    }

    get id() {
        if (this.connection) {
            return this.connection.id;
        } else {
            return null;
        }
    }

    addListener(eventName, callback) {
        const listener = this.connection.on(eventName, callback);
        this.listeners.push(listener);

        return listener;
    }

    triggerEvent(eventName, ...args) {
        this.connection.emit(eventName, ...args);
    }
}
