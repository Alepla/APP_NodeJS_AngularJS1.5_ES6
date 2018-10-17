class UpdateprojCtrl {
    constructor($scope, project, Toastr, Projects, $timeout, $state) {
        'ngInject';
        this._$scope = $scope;
        this.showButton = true;
        this.showButtonCancel = false;
        this.showButtonAdd = true;
        this.newReward = true;
        this.selectSector = ["Web app","Mobile app","Desktop app","Videogames"];
        this.infoProj = project;
        this.rewards = project.rewards;
        //console.log(project);

        this.AddNew = function() {
            this.showButtonCancel = true;
            this.showButtonAdd = false;
            this.newReward = false;
            this.reward = {
                inputNewTitle: '',
                inputNewMoney: '',
                inputNewRDesc: ''
              }
        };

        this.Cancel = function() {
            this.showButtonAdd = true;
            this.showButtonCancel = false;
            this.newReward = true;
        };

        this.nvalidUpdate = function() {
            Toastr.showToastr(
				'error',
				'Rellena todos los campos del formulario'
			);
        };

        this.saveNewReward = function(){
            project.rewards.push({
                _id: Math.round(Math.random() * 1000000) * Math.round(Math.random() * 1000000),
                title: this.reward.inputNewTitle,
                money: this.reward.inputNewMoney,
                desc: this.reward.inputNewRDesc
            })
            this.newReward = true;
        };

        this._$scope.saveOldReward = function() {
            if(this.reward.title != null && this.reward.money != null && this.reward.desc != null) {
                for (var i = 0; i < project.rewards.length; i++) {
                    if (project.rewards[i]._id == this.reward['_id']) {
                        project.rewards.splice(i, 1);
                        break;
                    }
                }
                project.rewards.push({_id: this.reward['_id'], title:this.reward.title, money:this.reward.money, desc:this.reward.desc})
            }else {
                Toastr.showToastr(
                    'error',
                    'Rellena todos los campos del formulario'
                );
            }
        };

        this._$scope.deleteReward = function() {
            for (var i = 0; i < project.rewards.length; i++) {
                if (project.rewards[i]._id == this.reward['_id']) {
                    project.rewards.splice(i, 1);
                    break;
                }
            }
        };

        this.messageUpdate = function() {
            if(project.rewards.length < 3){
                Toastr.showToastr(
                    'error',
                    'Tiene que tener mas de 2 Rewards'
                );
            }else{
                this.showButton = false;
                var data = {
                    name: this.infoProj.name,
                    company: this.infoProj.company,
                    goal: this.infoProj.goal,
                    sector: this.infoProj.sector,
                    rewards: project.rewards,
                    desc: this.infoProj.desc,
                    oldID: this.infoProj._id
                }
                //console.log(data);
                Projects.updateProject(data).then(function(response){
                    if(response.data){
                        Toastr.showToastr(
                            'success',
                            'Projecto guardado correctamente'
                        );
                        $timeout( function(){
                            $state.go('app.home');
                        }, 4000 );
                    }else{
                        Toastr.showToastr(
                            'error',
                            'Error al guardar el projecto'
                        );
                    }
                })
            }
        }

    }

}

export default UpdateprojCtrl;