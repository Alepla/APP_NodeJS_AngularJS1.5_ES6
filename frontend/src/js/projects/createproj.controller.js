class CreateprojCtrl {
    constructor(Projects,Toastr,$timeout,$state,User,$uibModal,$rootScope,Upload) {
        'ngInject';
        let _this = this;
        $rootScope.rewards = [];
        this.infoAids = [];
        this.showSector = false;
        this.disabledForm = false;
        this.projectType = "normal";
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
        
        this.saveAids = function(){
            this.infoAids.push({_id:Math.round(Math.random() * 1000000) * Math.round(Math.random() * 1000000),title:this.aids.inputTitle,percentage:this.aids.inputPercentage,desc:this.aids.inputDesc,state:0})
            this.aids.inputTitle = "";
            this.aids.inputPercentage = "";
            this.aids.inputDesc = "";
            this.showAdvancedSet = false;
        }

        this.messageCreateP = function(){
            if($rootScope.rewards.length < 3){
                Toastr.showToastr(
                    'error',
                    'Must have more than 2 Rewards'
                );
            }else{
                this.disabledForm = true;
                if(this.infoAids.length < 1) this.infoAids = false;
                console.log(this.infoAids);
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
                    type: this.projectType,
                    slug: this.slug,
                    aids: this.infoAids
                }
                Projects.setProjects(data).then(function(response){
                    if(!response.data.err){
                        Toastr.showToastr(
                            'success',
                            'Project saved correctly'
                        );
                        $timeout( function(){
                            $state.go('app.home');
                        }, 2000 );
                    }else{
                        _this.disabledForm = false;
                        Toastr.showToastr(
                            'error',
                            response.data.err
                        );
                    }
                })
            }
        }

        this.submit = function(){ //function to call on form submit
            if (this.createprojForm.file.$valid && this.file) { //check if from is valid
                this.upload(this.file); //call upload function
            }
        }
        
        this.upload = function (file) {
            console.log(file)
            Upload.upload({
                url: 'http://localhost:3000/api/projects/media/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (response) {
                _this.imagesUpload = [];
                _this.videoUpload = [];

                if(response.data.err){
                    Toastr.showToastr('error', response.data.err);
                }
                if(response.data.media){
                    _this.imagesUpload = [];
                    _this.videoUpload = [];
                    response.data.media.forEach(element => {
                        if(element.split('-')[0] === 'image'){
                            _this.imagesUpload.push(element.split('-')[1]);
                        }else if(element.split('-')[0] === "video"){
                            _this.videoUpload.push(element.split('-')[1]);
                        }
                    });
                }
            });
        };

        this.deleteFile = function(file,type){
            file = type + "-" + file; 
            Projects.deleteFile(file).then((response) => {
                _this.imagesUpload = [];
                _this.videoUpload = [];
                
                if(response.data.err){
                    Toastr.showToastr('error', response.data.err);
                }
                response.data.media.forEach(element => {
                    if(element.split('-')[0] === 'image'){
                        _this.imagesUpload.push(element.split('-')[1]);
                    }else if(element.split('-')[0] === "video"){
                        _this.videoUpload.push(element.split('-')[1]);
                    }
                });
            });
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
  