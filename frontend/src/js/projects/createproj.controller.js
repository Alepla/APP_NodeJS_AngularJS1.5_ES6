class CreateprojCtrl {
    constructor(Projects,Toastr,$timeout,$state,User,$uibModal,$rootScope) {
        'ngInject';
        
        $rootScope.rewards = [];
        this.showSector = false;
        this.disabledForm = false;
        this.selectSector = ["Web app","Mobile app","Desktop app","Videogames","Artificial intelligence","Operative system","Arduino project"];
        $rootScope.missingNumber = 3 - $rootScope.rewards.length;
        this.nvalidCreateP = function(){
            Toastr.showToastr(
				'error',
				'Fill in all the fields of the form'
			);
        };
        
        this.open = function(){
            $uibModal.open({
                animation: true,
                templateUrl: 'projects/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
            });
        }
        
        this.messageCreateP = function(){
            if($rootScope.rewards.length < 3){
                Toastr.showToastr(
                    'error',
                    'Must have more than 2 Rewards'
                );
            }else{
                this.disabledForm = true;
                this.slug = this.createproj.inputNameproj.toLowerCase();
                this.slug = this.slug.replace(" ","-");
                var data = {
                    name: this.createproj.inputNameproj,
                    company: this.createproj.inputCompany,
                    goal: this.createproj.inputGoal,
                    sector: this.createproj.selectSector,
                    rewards: $rootScope.rewards,
                    desc: this.createproj.inputDesc,
                    author: User.current.id,
                    slug: this.slug
                }
                Projects.setProjects(data).then(function(response){
                    if(response.data){
                        Toastr.showToastr(
                            'success',
                            'Project saved correctly'
                        );
                        $timeout( function(){
                            $state.go('app.home');
                        }, 2000 );
                    }else{
                        this.disabledForm = false;
                        Toastr.showToastr(
                            'error',
                            'Error when saving the project'
                        );
                    }
                })
            }
        }
        
    }
}
class ModalInstanceCtrl{
    constructor(Toastr,$uibModalInstance,$rootScope) {
        'ngInject';

        this.nvalidCreateP = function(){
            Toastr.showToastr(
				'error',
				'Fill in all the fields of the form'
			);
        };

        this.saveReward = function(){
            $rootScope.rewards.push({_id:Math.round(Math.random() * 1000000) * Math.round(Math.random() * 1000000),title:this.reward.inputTitle,money:this.reward.inputMoney,quantity:this.reward.inputQuantity,desc:this.reward.inputRDesc})
            $rootScope.missingNumber = 3 - $rootScope.rewards.length;
            $uibModalInstance.close();
        }
        
        this.cancel = function () {
            $uibModalInstance.close();
        };
    };
}

export default {CreateprojCtrl,ModalInstanceCtrl};
  