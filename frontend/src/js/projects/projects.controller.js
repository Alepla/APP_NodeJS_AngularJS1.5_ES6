class ProjectsCtrl {
    constructor(projects,$state, $scope, $stateParams, $filter) {
        'ngInject';

        this._$scope = $scope;
        this.itemsPerPage = 3;
        this.currentPage = 1;

        if(projects){
            projects.forEach((element,index) => {
                if(element.media[0]){
                    if(element.media[0].split('-')[0] === 'image')
                        projects[index].image = element.media[0].split('-')[1];
                    else
                        projects[index].video = element.media[0].split('-')[1];
                }
                projects[index].resdesc = projects[index].desc.substr(0,201) + "...";
            });
            if($stateParams.filter){
                this.showFilter = true;
                this.filter = $stateParams.filter;
                this.infoProj = $filter('filter')(projects,this.filter);
            }else{
                this.infoProj = projects;
                this.showFilter = false;
            }
            this.infoPager = this.infoProj;
            this.sdataProj = this.infoProj;
        }else{
            this.infoProj = "error";
        }

        this._$scope.openDetails = function(){
            $state.go('app.detailsproject', {slug: this.project['slug'] });
        };

        this.changePage = function(){
            var begin = (this.currentPage - 1) * this.itemsPerPage;
            var end = begin + this.itemsPerPage;
            this.infoProj = this.sdataProj.slice(begin, end);
        }
        this.changeSearch = function(){
            this.infoPager = $filter('filter')(this.sdataProj,{name:this.search.name});
        }

        this._$scope.updateInfo = function(){
            $state.go('app.updateproj', { slug: this.project['slug'] });
        };

        this.clearFilter = function(){
            this.showFilter = false;
            this.infoProj = projects;
            this.infoPager = projects;
            this.sdataProj = projects;
        }

        
    }
}

export default ProjectsCtrl;
  