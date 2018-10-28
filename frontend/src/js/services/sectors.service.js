export default class Sectors {
  constructor(JWT, AppConstants, $http, $q) {
    'ngInject';
 
    this._AppConstants = AppConstants;
    this._$http = $http;
 
 
  }
  
  //REST
  /*getSectors() {
    return this._$http({
      url: this._AppConstants.api + '/sectors',
      method: 'GET',
    }).then((res) => res.data.sectors);
  }*/

  //GRAPHQL
  getSectors() {
    return this._$http({
      url: this._AppConstants.api + '/graphql/graphql?query={allSectors{ sector }}',
      method: 'GET',
    }).then((x) => x.data.data.allSectors);
  }
} 