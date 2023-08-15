import express from 'express';

export default class API {
    constructor ({
        port,
        onListen
    }) {
        this.server = express();

        this.server.use(express.static('public'));
        this.server.listen(port || 80, onListen);
    }
}
