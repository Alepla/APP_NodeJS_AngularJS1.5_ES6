function HomeConfig($stateProvider) {
  'ngInject';
 
  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
       sectors: function(Sectors) {
         return Sectors.getSectors().then(
           (sectors) => sectors
         )
       }
     }
  });
 
 };
 
 export default HomeConfig;
 