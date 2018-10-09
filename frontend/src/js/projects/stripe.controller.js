class StripeCtrl {
    constructor(User, $state, $scope, Toastr, $stateParams) {
      'ngInject';
  
      this._$state = $state;
      this._$scope = $scope;
      this._toaster = Toastr;
      this.title = $state.current.title;
      
      this.stripe = $stateParams.stripe;
      this._toaster.showToastr('success','Successfully your buy with amount: ' + this.stripe + '€');
      this._$state.go('app.home');
    }
  }
  export default StripeCtrl;
  