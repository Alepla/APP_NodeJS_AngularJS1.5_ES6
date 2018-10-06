import aungular from 'angular';

let adminpanelModule = angular.module('app.adminpanel',[]);

import AdminpanelConfig from './adminpanel.config';
adminpanelModule.config(AdminpanelConfig);

import Adminpanel from './adminpanel.controller';
adminpanelModule.controller('AdminpanelCtrl', Adminpanel.AdminpanelCtrl);
adminpanelModule.controller('ModalInstanceAPCtrl', Adminpanel.ModalInstanceAPCtrl);

export default adminpanelModule;