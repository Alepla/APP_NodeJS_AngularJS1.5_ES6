class DetailsProjectCtrl {
    constructor(project, $scope, Projects, User, Toastr, $state, $timeout,Upload) {
        'ngInject';
        this.infoProj = project;
        console.log(project)
        let leftDays = Math.round((new Date() - new Date(project.createdAt) ) / (1000*60*60*24));
        if(leftDays >= 45 ){
            this.finProject = true;
            this.totalDays = false;
        }else{
            this.finProject = false;
            this.totalDays = 45 - leftDays;
        }
        this.rewardProj = project.rewards;
        this.aidsProj = project.aids;
        this._$scope = $scope;
        this.noWrapSlides = false;
        this.showRewards = true; 
        this.showAids = false;
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
                token.projType = project.type;
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
        this.saveLink = (aids,link) => {
            if(User.current){
                if(aids && link){
                    let data = {link:link,project:project._id,user:User.current.id,aids:aids};
                    Projects.saveLink(data).then( (response) => {
                        console.log(response.data)
                        if (!response.data.error){
                            Toastr.showToastr(
                                'success',
                                'You have participated in the project, wait for the response of the creator'
                            );
                            $timeout( function(){
                                $state.go('app.home');
                            }, 2000 );
                        }else{
                            console.log(response.data.error)
                            Toastr.showToastr(
                                'error',
                                'Error to participated in the project'
                            );
                        }
                    })
                }else{
                    Toastr.showToastr(
                        'error',
                        'Add the git link'
                    );
                }
            }else{
                $state.go('app.login');
            }
        }

        window.addEventListener('popstate', function() {
            handler.close();
        });
    }
}
export default DetailsProjectCtrl;