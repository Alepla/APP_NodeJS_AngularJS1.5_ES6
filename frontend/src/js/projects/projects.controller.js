class ProjectsCtrl {
    constructor(projects,$state) {
        'ngInject';

        console.log(projects);
        if(projects){
            this.infoProj = projects;
        }else{
            this.infoProj = "error";
        }

        this.openDetails = function(ID){
            $state.go('app.detailsproject', { id: ID });
        };
    }
}

export default ProjectsCtrl;
  