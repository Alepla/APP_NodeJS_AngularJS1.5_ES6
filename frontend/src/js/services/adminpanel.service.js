export default class Adminpanel {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
    }

    getProjects() {
        return this._$http({
            url: `${this._AppConstants.api}/adminpanel`,
            method: 'GET'
        }).then((res) => res.data.projects);
    }

}