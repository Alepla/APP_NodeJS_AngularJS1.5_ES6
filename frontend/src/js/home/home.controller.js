class HomeCtrl {
  constructor(AppConstants, $scope,sectors) {
    'ngInject';
 
    console.log(sectors);
    this.appName = AppConstants.appName;
    this._$scope = $scope;
 
    if (sectors){
      this.infoSect = sectors;
    }else{
      this.infoSect = "Error";
    }
   
  }
 
 
 }
 
 export default HomeCtrl;
 
 
 