(function() {
  'use strict';

  angular
    .module('barcode')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $state, $scope) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
      $scope.goToSetting = function(){
        $state.go('setting');
      }
      $scope.goToHome = function(){
        $state.go('home');
      }
    }
  }

})();
