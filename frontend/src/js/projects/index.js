import aungular from 'angular';

let projectsModule = angular.module('app.projects',[]);

import ProjectsConfig from './projects.config';
projectsModule.config(ProjectsConfig);

import ProjectsCtrl from './projects.controller';
projectsModule.controller('ProjectsCtrl', ProjectsCtrl);

export default projectsModule;