import { RESTDataSource } from 'apollo-datasource-rest';

class ShowAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.tvmaze.com';
  }

  getShowById(id: number) {
    return this.get(`${this.baseURL}/shows/${id}`);
  }

  getShowsByPage(pageNumber: number) {
    return this.get(`${this.baseURL}/shows?page=${pageNumber}`);
  }

  getShowsByName(name: string) {
    return this.get(`${this.baseURL}/shows?q=${name}`);
  }
}

export default { ShowAPI };
