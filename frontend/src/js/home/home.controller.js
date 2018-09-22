class HomeCtrl {
  constructor(AppConstants, $scope, sectors) {
    'ngInject';
 
    console.log(sectors);
    this.appName = AppConstants.appName;
    this._$scope = $scope;

    if (sectors){
      $scope.infoSect = sectors.slice(0, 3);
    }else{
      $scope.infoSect = "Error";
    }

    $scope.load = function () {
        $scope.infoSect = sectors.slice(0, sectors.length + 3);
    }
  }
 }
 
 export default HomeCtrl;
 
 
 