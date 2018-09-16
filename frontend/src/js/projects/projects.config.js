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
    
  };

  export default ProjectsConfig;
  