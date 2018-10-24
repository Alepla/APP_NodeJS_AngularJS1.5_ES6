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
  acceptAid(info){
    return this._$http({
      url: this._AppConstants.api + '/profiles/aids/accept',
      method: 'PUT',
      data: info
    })
  }

  cancelAid(info){
    return this._$http({
      url: this._AppConstants.api + '/profiles/aids/cancel',
      method: 'PUT',
      data: info
    })
  }

  aidspart(id){
    return this._$http({
      url: this._AppConstants.api + '/profiles/aids/aidsparticiped/' + id,
      method: 'GET'
    }).then((res) => res.data.aids);
  }

}
