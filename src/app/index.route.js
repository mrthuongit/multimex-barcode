(function() {
  'use strict';

  angular
    .module('barcode')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('setting', {
        url: '/setting',
        templateUrl: 'app/setting/setting.html',
        controller: 'SettingCtrl',
         controllerAs: ''
      });

    $urlRouterProvider.otherwise('/');
  }

})();
