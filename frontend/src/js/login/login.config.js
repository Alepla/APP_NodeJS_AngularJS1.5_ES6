function LoginConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
    .state('app.signin', {
      url: '/login',
      controller: 'LoginCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'login/login.html',
      title: 'Login'
    })
    
  };

  export default LoginConfig;
  