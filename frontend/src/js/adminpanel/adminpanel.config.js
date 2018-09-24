function AdminpanelConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
    .state('app.adminpanel', {
      url: '/adminpanel',
      controller: 'AdminpanelCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'adminpanel/adminpanel.html',
      title: 'Admin Panel',
      resolve: {
        projects: function(Adminpanel) {
          return Adminpanel.getProjects().then(
            (Adminpanel) => Adminpanel
          )
        }
      }
    });
    
  };

  export default AdminpanelConfig;
  