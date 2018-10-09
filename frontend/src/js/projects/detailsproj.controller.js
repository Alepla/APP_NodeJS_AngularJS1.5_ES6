class DetailsProjectCtrl {
    constructor(project, $scope, Projects, User, Toastr, $state) {
        'ngInject';
        this.infoProj = project;
        this.rewardProj = project.rewards;
        this._$scope = $scope;
        let idP = this.infoProj._id
        let proj = "";
 
        var handler = StripeCheckout.configure({
            key: 'pk_test_9oFbDIUtBt8iNG9M5fjhdwMP',
            image: './images/crowcode.svg',
            locale: 'auto',
            token: function(token) {
                token.idP = idP;
                token.projM = proj.money;
                token.userID = User.current.id;
                Projects.setPay(token);
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

          window.addEventListener('popstate', function() {
            handler.close();
          });
    }
}
export default DetailsProjectCtrl;