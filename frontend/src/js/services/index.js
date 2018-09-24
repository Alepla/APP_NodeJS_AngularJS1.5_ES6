import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import SectorsService from './sectors.service';
servicesModule.service('Sectors', SectorsService);

import ContactService from './contact.service';
servicesModule.service('Contact', ContactService);

import ProjectsService from './projects.service';
servicesModule.service('Projects', ProjectsService);

import AdminpanelService from './adminpanel.service';
servicesModule.service('Adminpanel', AdminpanelService)

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

export default servicesModule;
