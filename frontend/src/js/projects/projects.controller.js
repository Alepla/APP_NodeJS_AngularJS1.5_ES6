class ProjectsCtrl {
    constructor(projects,$state, $scope, $stateParams, $filter) {
        'ngInject';

        this._$scope = $scope;
        $scope.projects = projects;

        if(projects){
            if($stateParams.filter){
                this.filter = $stateParams.filter;
                this.infoProj = $filter('filter')(projects,this.filter);
            }else{
                this.infoProj = projects;
            }
        }else{
            this.infoProj = "error";
        }
 
 

        this._$scope.openDetails = function(){
            $state.go('app.detailsproject', { id: this.project['_id'] });
        };

        
    }
}

export default ProjectsCtrl;
  