import aungular from 'angular';

let adminpanelModule = angular.module('app.adminpanel',[]);

import AdminpanelConfig from './adminpanel.config';
adminpanelModule.config(AdminpanelConfig);

import AdminpanelCtrl from './adminpanel.controller';
adminpanelModule.controller('AdminpanelCtrl', AdminpanelCtrl);

export default adminpanelModule;