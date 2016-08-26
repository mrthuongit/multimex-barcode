(function() {
  'use strict';

  angular
    .module('barcode')
    .controller('SettingCtrl', SettingCtrl);

  /** @ngInject */
  function SettingCtrl($timeout, webDevTec, toastr, IO_BARCODE_TYPES, $scope, localStorageService) {

    $scope.list=[];
    if(localStorageService.get("setting")){
      $scope.setting = localStorageService.get("setting");
    } else{
      $scope.setting={
        option: "EAN13",
        prefix: 1
      };
    }
    $scope.count="1";
    $scope.save = function(){
      if(_validate()){
        localStorageService.set("setting", $scope.setting);
      }
    };

    var _validate = function(){
      var flag = true;
      if(!$scope.setting.prefix){
        flag = false;
      } else{

      }
      if(!$scope.setting.option || $scope.setting.option.length === 0){
        flag = false;
      }
      if(!$scope.setting.suffix){
        flag = false;
      }
      if(!$scope.setting.nextnumber || $scope.setting.nextnumber <= 0){
        flag = false;
      }
      if(!$scope.setting.increase && $scope.setting.increase <0){
        flag = false;
      }
      return flag;
    }

  }
})();