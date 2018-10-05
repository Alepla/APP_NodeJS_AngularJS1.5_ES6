class AdminpanelCtrl {
    constructor($rootScope, $scope, projects, $state, users, Adminpanel, Toastr) {
        'ngInject';
        this._$scope = $scope;
        this.infoProject = projects;
        this.infoUsers = users;

        if($rootScope.chargeUser){
            $rootScope.chargeUser = false;
            this.showUseres = true;
            this.showProjects = false; 
        }else {
            this.showUseres = false;
            this.showProjects = true;
        }

        /*Pager For Projects*/
        this.infoPager = this.infoProject;
        this.sdataProj = this.infoProject;

        this.itemsPerPage = 8;
        this.currentPage = 1;

        this.changePage = function(){
            var begin = (this.currentPage - 1) * this.itemsPerPage;
            var end = begin + this.itemsPerPage;
            this.infoProject = this.sdataProj.slice(begin, end);
        }

        /*Pager For Users*/
        this.infoPagerUser = this.infoUsers;
        this.sdataUser = this.infoUsers;

        this.itemsPerPageUser = 8;
        this.currentPageUser = 1;

        this.changePageUser = function(){
            var begin = (this.currentPageUser - 1) * this.itemsPerPageUser;
            var end = begin + this.itemsPerPageUser;
            this.infoUsers = this.sdataUser.slice(begin, end);            this.showUseres = true;
            this.showProjects = false;
        }

        this.seeProjects = function() {
            this.showUseres = false;
            this.showProjects = true;
        }
    
        this.seeUsers = function() {
            this.showUseres = true;
            this.showProjects = false;
        }

        this._$scope.showListProject = function(){
            $state.go('app.detailsproject', {slug: this.project['slug'] });
        };

        this._$scope.showEditProject = function(){
            $state.go('app.updateproj', { slug: this.project['slug'] });
        };

        this._$scope.showDeleteProject = function(){
            $state.go('app.deleteproj', { slug: this.project['slug'] });
        };

        this._$scope.deleteUser = function(){
            Adminpanel.deleteUsers(this.user['_id']).then(
                (success) => {
                    Toastr.showToastr('success', 'User deleted');
                    $rootScope.chargeUser = true;
                    $state.reload();
                },
                (err) => Toastr.showToastr('error', 'Somthing wrong was happened')
            )
        };
    }

}

export default AdminpanelCtrl;