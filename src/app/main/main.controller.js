(function() {
  'use strict';

  angular
    .module('barcode')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, IO_BARCODE_TYPES, $scope, localStorageService, $barcodeServices) {

    $scope.list=[];
    $scope.setting= localStorageService.get("setting");
    $scope.count="1";
    $scope.addItem = function () {
      $scope.list.push(JSON.parse(JSON.stringify($scope.person)));
       $scope.person.numberpadding++;
       
    }
    $scope.removeItem = function (x) {
      $scope.list.splice(x, 1);
      // $scope.person.nextnumber--;
    }

    $scope.code = '';
    $scope.type = 'EAN';
    $scope.options = {
      width: 3,
      height: 50,
      displayValue: true,
      font: 'monospace',
      textAlign: 'center',
      fontSize: 15,
      backgroundColor: '#ffffff',
      lineColor: '#000000'
    };   
    $scope.generateBarcode = function(){
      $scope.code = $barcodeServices.createBarcode("ean13", $scope.setting.prefix, $scope.setting.increase, $scope.setting.suffix);
      $scope.setting.increase += $scope.setting.nextnumber;
      localStorageService.set("setting", $scope.setting);
      $scope.setting= localStorageService.get("setting");
    }  
  }
})();