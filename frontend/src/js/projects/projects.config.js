function ProjectsConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
    .state('app.projects', {
      url: '/projects-:filter',
      controller: 'ProjectsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'projects/projects.html',
      title: 'Projects',
      resolve: {
        projects: function(Projects) {
          return Projects.getProjects().then(
            (projects) => projects
          )
        }
      }
    })
    .state('app.createproj', {
      url: '/createproj',
      controller: 'CreateprojCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'projects/createproj.html',
      title: 'Createproj'
    })
    .state('app.updateproj', {
      url: '/updateproj/:id',
      controller: 'UpdateprojCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'projects/updateproj.html',
      title: 'Updateproj',   
      resolve: {
        project: function(Projects, $stateParams) {
          return Projects.getProject($stateParams.id).then(
            (Projects) => Projects
          )
        }
      }
    })
    .state('app.detailsproject', {
      url: '/projects/:id',
      controller: 'DetailsProjectCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'projects/detailsproj.html',
      title: 'Details Project',
      resolve: {
        project: function(Projects, $stateParams) {
          return Projects.getProject($stateParams.id).then(
            (Projects) => Projects
          )
        }
      }
    });
    
  };

  export default ProjectsConfig;
  