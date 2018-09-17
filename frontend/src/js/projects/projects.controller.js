class ProjectsCtrl {
    constructor($scope,projects,$state) {
        'ngInject';
          
        if(projects){
            $scope.infoProj = projects;
        }else{
            $scope.infoProj = "error";
        }

        /*$scope.openCreate = function(){
            $state.go('app.createproj');
        }*/
        
    }
}

export default ProjectsCtrl;
  