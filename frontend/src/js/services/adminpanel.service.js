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

    getUsers() {
        return this._$http({
            url: `${this._AppConstants.api}/adminpanel/users`,
            method: 'GET'
        }).then((res) => res.data.users);
    }

    deleteProject(slug) {
        console.log(slug);
        return this._$http({
            url: this._AppConstants.api + '/adminpanel/' + slug,
            method: 'DELETE'
        })
    }

    getUseres(id) {
        return this._$http({
            url: this._AppConstants.api + '/adminpanel/' + id,
            method: 'GET',
        }).then((res) => res.data.user);
    }

    updateUser(user){
        return this._$http({
            url: `${this._AppConstants.api}/adminpanel`,
            method: 'PUT',
            data: user
        })
    }

    deleteUsers(id) {
        return this._$http({
            url: this._AppConstants.api + '/adminpanel/' + id,
            method: 'DELETE'
        })
    }

}