import angular from 'angular';

// Create the module
let loginModule = angular.module('app.signin', []);

// Include our UI-Router config settings
import LoginConfig from './login.config';
loginModule.config(LoginConfig);

// Controllers
import LoginCtrl from './login.controller';
loginModule.controller('LoginCtrl', LoginCtrl);

export default loginModule;
