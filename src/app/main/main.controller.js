(function() {
  'use strict';

  angular
    .module('barcode')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, IO_BARCODE_TYPES, $scope, localStorageService, $barcodeServices) {

    $scope.list=[];
    $scope.setting= localStorageService.get("setting");
    if(!$scope.setting){
      $scope.setting={
        option: "EAN13",
        prefix: 1,
        nextnumber: 1,
        increase: 1,
        suffix: null
      };
      localStorageService.set("setting", $scope.setting);
    }
    $scope.count="1";
    $scope.product = {name:"",price: 0};
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
      lineColor: '#000000',
      customLabel: ""
    };   
    $scope.generateBarcode = function(){
      $scope.options.customLabel = $scope.product.name +" - "+ $scope.product.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+' đ';
      $scope.code = $barcodeServices.createBarcode("ean13", $scope.setting.prefix, $scope.setting.nextnumber, $scope.setting.suffix);
      $scope.setting.nextnumber += $scope.setting.increase;
      localStorageService.set("setting", $scope.setting);
      $scope.setting= localStorageService.get("setting");
    };

    $scope.saveImageBarcode = function(){
      var imagesrc = document.getElementById("imageBarcode").src;
      var saveBarcode = document.getElementById("saveBarcode");
      var contentType = 'image/png';
      var imageBase64 = _getBase64Image(imagesrc);
      var blob = b64toBlob(imageBase64, contentType);
     /* var file = new File([blob], 'barcode_'+$scope.code+'.png');*/
      saveBarcode.href = URL.createObjectURL(blob);
      saveBarcode.download = 'barcode_'+$scope.code+'.png';
      $scope.product = {name:"",price: 0};
    };

    var _getBase64Image = function(base64string) {
      return base64string.replace(/^data:image\/(png|jpg);base64,/, "");
    };

    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
  }
})();