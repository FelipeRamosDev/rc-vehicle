import express from 'express';
import vehicleConnect from './controllers/vehicleConnect.js';

export default class API {
    constructor (app, {
        port,
        onListen
    }) {
        this.server = express();
        this._app = () => app;

        this.server.use(express.static('public'));
        this.server.use(express.json());

        // Declaring the routes
        this.server.post('/vehicle-connect', vehicleConnect.bind(this.app));

        this.server.listen(port || 80, onListen);
    }

    get app() {
        return this._app();
    }
}
