class AdminpanelCtrl {
    constructor($rootScope, $scope, projects, $state, users, Adminpanel, Toastr, $uibModal) {
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

        this._$scope.open = function(val){
            if(val == 'list'){
                $rootScope.list = true;
            }else {
                $rootScope.list = false;
            }
            var id = this.user['_id'];
            $uibModal.open({
                animation: true,
                templateUrl: 'adminpanel/listUserModal.html',
                controller: 'ModalInstanceAPCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    user: function(Adminpanel) {
                        return Adminpanel.getUseres(id).then(
                          (Adminpanel) => Adminpanel
                        )
                    }
                }
            });
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
            var slug = this.project['slug'];
            Adminpanel.deleteProject(slug).then(
                (success) => {
                    Toastr.showToastr('success', 'Project deleted');
                    //$rootScope.chargeUser = true;
                    $state.reload();
                },
                (err) => Toastr.showToastr('error', 'Somthing wrong was happened')
            )
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

class ModalInstanceAPCtrl{
    constructor(Toastr, $uibModalInstance, $rootScope, user, Adminpanel, $state) {
        'ngInject';

        this.user = user;
        this.selectType = ["admin", "client"];

        if($rootScope.list){
            this.modalList = true;
        }else {
            this.modalUpdate = true;
        }

        this.nvalidUser = function(){
            Toastr.showToastr(
				'error',
				'Fill in all the fields of the form'
			);
        };

        this.saveUser = function(){
            var data = {
                id: this.user._id,
                username: this.user.username,
                email: this.user.email,
                type: this.user.type
            }
            Adminpanel.updateUser(data).then(function(response){
                if(response.data){
                    Toastr.showToastr(
                        'success',
                        'User saved correctly'
                    );
                }else{
                    Toastr.showToastr(
                        'error',
                        'Something wrong was happened'
                    );
                }
            })
            $rootScope.chargeUser = true;
            $state.reload();
            $uibModalInstance.close();
        }

        this.cancel = function () {
            $uibModalInstance.close();
        };
    };
}

export default {AdminpanelCtrl, ModalInstanceAPCtrl};