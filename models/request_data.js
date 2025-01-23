class RequestData {
    #url;
    #data;

    constructor() {
        this.#url = [];
        this.#data = {};
    }

    extractData(req) {
        let url = req.url;
        url = url.split('/');
        (url[0] == '') ? url.shift(1) : None;
        let temp = url[url.length - 1].split('?', 2);
        if (temp.length == 2 && temp[1] != '') {
            url[url.length - 1] = temp[0];
            temp = temp[1].split('&');
            for (let i = 0; i < temp.length; i++) {
                let _temp = temp[i].split('=');
                this.#data[_temp[0]] = _temp[1];
            }
        }
        this.#url = url;
    }

    getUrl() {
        return this.#url.join('/');
    }

    getData() {
        return this.#data;
    }
};

module.exports = RequestData;