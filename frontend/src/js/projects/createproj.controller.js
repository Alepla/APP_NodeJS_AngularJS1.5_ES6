class CreateprojCtrl {
    constructor(Projects,Toastr,$timeout,$state) {
        'ngInject';
        var rewards = [];
        this.showSector = false;
        this.showButton = true;
        this.selectSector = ["Web app","Mobile app","Desktop app","Videogames"];
        this.nvalidCreateP = function(){
            Toastr.showToastr(
				'error',
				'Rellena todos los campos del formulario'
			);
        };
        this.saveReward = function(){
            rewards.push({_id:Math.round(Math.random() * 1000000) * Math.round(Math.random() * 1000000),title:this.reward.inputTitle,money:this.reward.inputMoney,desc:this.reward.inputRDesc})
        }
        this.messageCreateP = function(){
            if(rewards.length < 3){
                Toastr.showToastr(
                    'error',
                    'Tiene que tener mas de 2 Rewards'
                );
            }else{
                this.showButton = false;
                var data = {
                    name: this.createproj.inputNameproj,
                    company: this.createproj.inputCompany,
                    goal: this.createproj.inputGoal,
                    sector: this.createproj.selectSector,
                    rewards: rewards,
                    desc: this.createproj.inputDesc
                }
                Projects.setProjects(data).then(function(response){
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

export default CreateprojCtrl;
  