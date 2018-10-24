import angular from 'angular';
import 'angular-sanitize';

// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', ['ngSanitize']);


// Components
import AppHeader from './header.component';
layoutModule.component('appHeader', AppHeader);

import AppFooter from './footer.component';
layoutModule.component('appFooter', AppFooter);


export default layoutModule;
