function ProjectsConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
    .state('app.projects', {
      url: '/projects',
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
    
  };

  export default ProjectsConfig;
  