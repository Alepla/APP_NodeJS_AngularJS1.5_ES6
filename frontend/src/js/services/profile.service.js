export default class Profile {
  constructor (AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;

  }

  get(username) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username,
      method: 'GET'
    }).then((res) => res.data.profile);
  }

  projects(username) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + username + '/projects',
      method: 'GET'
    }).then((res) => res.data.projects);
  }

  invest(id) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + id + '/projects/invested',
      method: 'GET'
    }).then((res) => res.data.projects);
  }
 
  subscribe(id) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/' + id + '/projects/subscribe',
      method: 'GET'
    }).then((res) => res.data.projects);
  }

  unsubscribe(info) {
    return this._$http({
      url: this._AppConstants.api + '/profiles/projects/unsubscribe',
      method: 'PUT',
      data: info
    })
  }

}
