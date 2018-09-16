export default class Projects {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }
  
    getProjects() {
        let deferred = this._$q.defer();
        return this._$http({
            url: `${this._AppConstants.api}/projects`,
            method: 'GET'
        }).then((res) => res.data.projects);
    }
  
  }
  