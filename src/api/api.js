import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  //baseURL: 'http://фиалки-жуковой-елены.рф/api/',
  baseURL: "http://localhost:3000/api/",
  validateStatus: function (status) {
    return status >= 200;
  },
});

export const violetsApi = {
  getAvailabilityVioletsCards(page, searchValue) {
    if (!searchValue) {
      return instance.get(`homePage/${page}`);
    }
    return instance.get(`homePage?page=${page}&q=${searchValue}`);
  },
};
