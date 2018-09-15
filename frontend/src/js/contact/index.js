import angular from 'angular';

// Create the module
let contactModule = angular.module('app.contact', []);

// Include our UI-Router config settings
import ContactConfig from './contact.config';
contactModule.config(ContactConfig);

// Controllers
import ContactCtrl from './contact.controller';
contactModule.controller('ContactCtrl', ContactCtrl);

export default contactModule;
