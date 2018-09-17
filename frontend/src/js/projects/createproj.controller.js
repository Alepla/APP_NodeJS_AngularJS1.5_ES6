class CreateprojCtrl {
    constructor($scope,Toastr) {
        'ngInject';
        var rewards = [];
        $scope.showSector = false;
        $scope.selectSector = ["Web app","Mobile app","Desktop app","Videogames"];
        $scope.nvalidCreateP = function(){
            Toastr.showToastr(
				'error',
				'Rellena todos los campos del formulario'
			);
        };
        $scope.saveReward = function(){
            rewards.push({_id:Math.round(Math.random() * 1000000) * Math.round(Math.random() * 1000000),title:$scope.reward.inputTitle,money:$scope.reward.inputMoney,desc:$scope.reward.inputRDesc})
            console.log(rewards);
        }
        $scope.messageCreateP = function(){
            console.log($scope.createproj.inputNameproj + "/-/" + $scope.createproj.inputCompany + "/-/" + $scope.createproj.inputGoal + "/-/" + $scope.createproj.selectSector + "/-/" + $scope.createproj.inputDesc)
        }
        
    }
}

export default CreateprojCtrl;
  