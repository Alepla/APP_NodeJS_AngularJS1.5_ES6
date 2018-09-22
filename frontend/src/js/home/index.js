import angular from 'angular';
import ngInfiniteScroll from 'ng-infinite-scroll';

// Create the module where our functionality can attach to
let homeModule = angular.module('app.home', [ngInfiniteScroll]);

// Include our UI-Router config settings
import HomeConfig from './home.config';
homeModule.config(HomeConfig);


// Controllers
import HomeCtrl from './home.controller';
homeModule.controller('HomeCtrl', HomeCtrl);


export default homeModule;
