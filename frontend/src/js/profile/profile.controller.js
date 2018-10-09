class ProfileCtrl {
  constructor(profile, User, projects, invested, $scope, $state) {
    'ngInject';

    this._$scope = $scope;
    this.profile = profile;
    this.myProjects = projects;
    this.investedProj = invested;

    this.personalProjects = true;
    this.invertedProjects = false;

    if (User.current) {
      console.log(this.profile)
      this.isUser = (User.current.username === this.profile.username);
    } else {
      this.isUser = false;
    }

    this.seePersonalProjects = function() {
      this.invertedProjects = false;
      this.personalProjects = true;
    }
 
    this.seeInvertedProjects = function() {
      this.invertedProjects = true;
      this.personalProjects = false;
    }

    this.logOut = User.logout.bind(User);

    this._$scope.seeProj = function() {
      $state.go('app.detailsproject', {slug: this.invest['slug'] });
    }

    this._$scope.updateProj = function() {
      $state.go('app.updateproj', { slug: this.invest['slug'] });
    }
  }
}


export default ProfileCtrl;


/*
class ProfileCtrl {
 constructor(profile, User, projects) {
   'ngInject';

   this.profile = profile;
   this.myProjects = projects;

   this.personalProjects = true;
   this.invertedProjects = false;

   this.seePersonalProjects = function() {
     this.invertedProjects = false;
     this.personalProjects = true;
   }

   this.seeInvertedProjects = function() {
     this.invertedProjects = true;
     this.personalProjects = false;
   }

   if (User.current) {
     this.isUser = (User.current.username === this.profile.username);
   } else {
     this.isUser = false;
   }

 }
}


export default ProfileCtrl;


*/
