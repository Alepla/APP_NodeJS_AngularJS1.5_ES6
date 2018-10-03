class HomeCtrl {
  constructor(AppConstants, $scope, sectors) {
    'ngInject';
    
    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.slides = [ {image:'/images/portada1.jpg',text:"Get funding for your code projects.",id:0},
                    {image:'/images/portada2.jpg',text:"Supports other projects to keep the community growing.",id:1},
                    {image:'/images/portada3.jpg',text:"Other users can do the code you don't know how to do.",id:2}];

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
 
 
 