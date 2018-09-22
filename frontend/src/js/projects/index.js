import aungular from 'angular';

let projectsModule = angular.module('app.projects',[]);

import ProjectsConfig from './projects.config';
projectsModule.config(ProjectsConfig);

import ProjectsCtrl from './projects.controller';
projectsModule.controller('ProjectsCtrl', ProjectsCtrl);

import CreateprojCtrl from './createproj.controller';
projectsModule.controller('CreateprojCtrl', CreateprojCtrl);

import UpdateprojCtrl from './updateproj.controller';
projectsModule.controller('UpdateprojCtrl', UpdateprojCtrl);

import DetailsProjectCtrl from './detailsproj.controller';
projectsModule.controller('DetailsProjectCtrl', DetailsProjectCtrl);

export default projectsModule;