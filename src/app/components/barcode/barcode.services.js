(function() {
  'use strict';
  angular
    .module('barcode')
    .factory('$barcodeServices', barcodeServices);

  /** @ngInject */
  function barcodeServices() {

    var service = {
      createBarcode: createBarcode
    };
    return service;

    function createBarcode(options, prefix, number, suffix) {
      var barcode = '';
      switch (options) {
        case 'ean13':
          if(!suffix){
            suffix = "";
          }
          var numberA = 0;
          var numberB = 0;
          var missLength = 12 - (prefix.toString().length + suffix.toString().length);
          number = number.toString();
          for (var j = number.length; j < missLength; j++) {
            number = '0' + number;
          }
          barcode = prefix.toString() + number.toString() + suffix.toString();
          for (var i = 0; i < barcode.length; i++) {
            if (i % 2 === 0) {
              numberB += +barcode.charAt(i);
            } else {
              numberA += +barcode.charAt(i);
            }
          }
        var numberX = (numberA * 3 + numberB) % 10 === 0 ? 0 : 10 - (numberA * 3 + numberB) % 10;
        barcode = barcode + numberX;
        break;
      }
    return barcode;
    }
  }
})();
