class AppHeaderCtrl {
  constructor(AppConstants, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;

    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
      if(this.currentUser != null) {
        if(this.currentUser.type == "admin"){
          $scope.adminPanel = '<a class="nav-link" href="http://localhost:4000/#!/adminpanel"> Admin Panel</a>';
        }
      }
    })
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
