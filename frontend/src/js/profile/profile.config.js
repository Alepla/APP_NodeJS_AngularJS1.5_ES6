function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true,
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        console.log($stateParams.username)
        return Profile.get($stateParams.username).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        )
      },
      projects: function(Profile, $state, $stateParams,User) {
        console.log(User.current.id)
        return Profile.projects(User.current.id).then(
          (projects) => projects,
          (err) => $state.go('app.home')
        )
      },
      invested: function(Profile, $state, $stateParams,User) {
        return Profile.invest(User.current.id).then(
          (projects) => projects,
          (err) => $state.go('app.home')
        )
      },
      subscribe: function(Profile, $state, $stateParams,User) {
        return Profile.subscribe(User.current.id).then(
          (projects) => projects,
          (err) => $state.go('app.home')
        )
      }
    }

  })

  .state('app.profile.main', {
    url:'',
    controller: 'ProfileArticlesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Profile'
  })
  .state('app.profile.favorites', {
    url:'/favorites',
    controller: 'ProfileArticlesCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Favorites'
  });

};
export default ProfileConfig;
