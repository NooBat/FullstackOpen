"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class ShowAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.tvmaze.com';
    }
    getShowById(id) {
        return this.get(`${this.baseURL}/shows/${id}`);
    }
    getShowsByPage(pageNumber) {
        return this.get(`${this.baseURL}/shows?page=${pageNumber}`);
    }
    getShowsByName(name) {
        return this.get(`${this.baseURL}/shows?q=${name}`);
    }
}
exports.default = { ShowAPI };
