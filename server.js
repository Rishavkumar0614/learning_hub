const HTTPServer = require('http');
const RequestData = require("./models/request_data.js");

class Server {
    #requestData
    #prepareResponse() {
        const Server = require("./build/web/server.js");
        return new Server().serve(this.#requestData);
    }

    constructor() {
        this.#requestData = new RequestData();
    }

    serve(req, res) {
        this.#requestData.extractData(req);
        const response = this.#prepareResponse();
        res.writeHead(response.getStatusCode(), { 'Content-Type': response.getContentType() });
        res.end(response.getContent());
    }
};

HTTPServer.createServer((req, res) => { new Server().serve(req, res); }).listen(3000, '127.0.0.1');