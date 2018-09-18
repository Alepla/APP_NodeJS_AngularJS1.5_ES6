export default class Projects {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }
  
    getProjects() {
        return this._$http({
            url: `${this._AppConstants.api}/projects`,
            method: 'GET'
        }).then((res) => res.data.projects);
    }

    setProjects(project){
        return this._$http({
            url: `${this._AppConstants.api}/projects`,
            method: 'POST',
            data:project
        })
    }

    getProject(id) {
        return this._$http({
            url: this._AppConstants.api + '/projects/'+ id,
            method: 'GET',
        }).then((res) => res.data.projects);
    }
  
  }
  