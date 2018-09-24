class AdminpanelCtrl {
    constructor($scope, projects) {
        'ngInject';
        this._$scope = $scope;
        this.infoProject = projects;

        this.infoPager = this.infoProject;
        this.sdataProj = this.infoProject;

        this.itemsPerPage = 8;
        this.currentPage = 1;

        this.changePage = function(){
            var begin = (this.currentPage - 1) * this.itemsPerPage;
            var end = begin + this.itemsPerPage;
            this.infoProject = this.sdataProj.slice(begin, end);
        }
    }

}

export default AdminpanelCtrl;