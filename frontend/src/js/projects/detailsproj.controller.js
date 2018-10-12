class DetailsProjectCtrl {
    constructor(project, $scope, Projects, User, Toastr, $state, $timeout) {
        'ngInject';
        this.infoProj = project;
        let leftDays = Math.round((new Date() - new Date(project.createdAt) ) / (1000*60*60*24))
        console.log(Math.round((new Date() - new Date(project.createdAt) ) / (1000*60*60*24)));
        if(leftDays > 45 ){
            this.finProject = true;
            this.totalDays = false;
        }else{
            this.finProject = false;
            this.totalDays = 45 - leftDays;
        }
        this.rewardProj = project.rewards;
        this._$scope = $scope;
        this.noWrapSlides = false;
        let idP = this.infoProj._id
        let proj = "";
        this.slides = [];
        let type,file;
        this.infoProj.media.forEach((element,index) => {
            type = element.split('-')[0];
            file = element.split('-')[1];
            if(type === "image"){
                this.slides.push({image: "http://localhost:3000/uploads/" + file,id:index})
            }else{
                this.slides.push({video: "http://localhost:3000/uploads/" + file,id:index})
            }
        });
 
        var handler = StripeCheckout.configure({
            key: 'pk_test_9oFbDIUtBt8iNG9M5fjhdwMP',
            image: './images/crowcode.svg',
            locale: 'auto',
            token: function(token) {
                token.idP = idP;
                token.projM = proj.money;
                token.userID = User.current.id;
                Projects.setPay(token).then(function(response){
                    if(!response.data.err){
                        Toastr.showToastr(
                            'success',
                            'Congratulations for youre invest!'
                        );
                        $timeout( function(){
                            $state.go('app.home');
                        }, 2000 );
                    }else{
                        Toastr.showToastr(
                            'error',
                            'Something wrong was happened try latter'
                        );
                    }
                });
            }
          });

        this._$scope.pay = function(){
            if(User.current){
                let id = this.project['_id'];
                proj = project.rewards.find(function(x) {
                    if(x._id == id){
                        return x._id;
                    }
                });

                handler.open({
                    name: project.name,
                    description: project.company,
                    currency: 'eur',
                    amount: proj.money * 100
                });
            }else {
                $state.go('app.login');
            }

        }
        this.disabledPay = () => {
            Toastr.showToastr(
                'error',
                'The project has been finished'
            );
        }

        window.addEventListener('popstate', function() {
        handler.close();
        });
    }
}
export default DetailsProjectCtrl;